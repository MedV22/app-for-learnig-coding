/* Exécuteur Python isolé : aucun DOM, stockage local ou réseau pendant le code utilisateur. */
(() => {
  const VERSION = "0.27.0";
  const BASE = `https://cdn.jsdelivr.net/pyodide/v${VERSION}/full/`;
  let pyodidePromise = null;

  const loadRuntime = () => {
    if (!pyodidePromise) {
      pyodidePromise = (async () => {
        importScripts(`${BASE}pyodide.js`);
        return self.loadPyodide({ indexURL: BASE });
      })().catch((error) => {
        pyodidePromise = null;
        throw error;
      });
    }
    return pyodidePromise;
  };

  const block = () => {
    throw new Error("L’accès au réseau et au stockage du site est désactivé dans cet exercice.");
  };

  const restrictWorkerAPIs = () => {
    for (const key of ["fetch", "XMLHttpRequest", "WebSocket", "EventSource", "Worker", "SharedWorker", "BroadcastChannel", "importScripts", "indexedDB", "caches"]) {
      try {
        Object.defineProperty(globalThis, key, { value: block, configurable: false, writable: false });
      } catch {}
    }
  };

  self.addEventListener("message", async ({ data }) => {
    if (!data || !Number.isInteger(data.id) || typeof data.task !== "string") return;
    const { id, task } = data;
    const source = typeof data.source === "string" ? data.source.slice(0, 20000) : "";
    self.postMessage({ id, status: "loading" });

    try {
      const pyodide = await loadRuntime();
      restrictWorkerAPIs();
      self.postMessage({ id, status: "ready" });

      if (task === "warmup") {
        self.postMessage({ id, status: "result" });
        return;
      }

      if (task === "validate") {
        const name = "_codevally_validation_source";
        pyodide.globals.set(name, source);
        let syntaxError = null;
        try {
          const compiled = pyodide.runPython(`compile(${name}, "<parcours>", "exec")`);
          compiled?.destroy?.();
        } catch (error) {
          const message = String(error?.message || error);
          const syntaxLine = message.split(/\r?\n/).reverse().find((line) => /\b(?:SyntaxError|IndentationError|TabError)\s*:/.test(line));
          syntaxError = (syntaxLine || message).trim().slice(0, 240);
        } finally {
          pyodide.globals.delete(name);
        }
        self.postMessage({ id, status: "result", syntaxError });
        return;
      }

      if (task !== "run") throw new Error("Type de tâche Python non reconnu.");

      const stdout = [];
      const stderr = [];
      const limit = { lines: 45, characters: 24000, usedLines: 0, usedCharacters: 0, truncated: false };
      const capture = (target, line) => {
        const value = String(line ?? "");
        if (limit.usedLines >= limit.lines || limit.usedCharacters >= limit.characters) {
          limit.truncated = true;
          return;
        }
        const chunk = value.slice(0, limit.characters - limit.usedCharacters);
        target.push(chunk);
        limit.usedLines += 1;
        limit.usedCharacters += chunk.length;
        if (chunk.length < value.length) limit.truncated = true;
      };

      pyodide.setStdout({ batched: (line) => capture(stdout, line) });
      pyodide.setStderr({ batched: (line) => capture(stderr, line) });
      pyodide.setStdin({ error: true });

      const result = await pyodide.runPythonAsync(source);
      if (result !== undefined && result !== null) capture(stdout, result);
      const output = [...stdout, ...(stderr.length ? ["--- stderr ---", ...stderr] : [])].join("\n").slice(0, limit.characters + 100);
      self.postMessage({ id, status: "result", output, truncated: limit.truncated });
    } catch (error) {
      self.postMessage({ id, status: "result", error: String(error?.message || error).slice(0, 1200) });
    }
  });
})();
