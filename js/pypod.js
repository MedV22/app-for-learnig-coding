/* Éditeur Python en ligne (Pyodide) — Learn Hub */
(() => {
  const PYODIDE_VERSION = "0.27.0";
  const PYODIDE_BASE = `https://cdn.jsdelivr.net/pyodide/v${PYODIDE_VERSION}/full/`;
  let pyodidePromise = null;
  let previousFocus = null;

  function loadPyodide() {
    if (pyodidePromise) return pyodidePromise;

    pyodidePromise = new Promise((resolve, reject) => {
      const script = document.createElement("script");
      script.src = `${PYODIDE_BASE}pyodide.js`;
      script.onload = async () => {
        try {
          if (typeof window.loadPyodide !== "function") throw new Error("Pyodide n'a pas été initialisé.");
          resolve(await window.loadPyodide({ indexURL: PYODIDE_BASE }));
        } catch (error) {
          pyodidePromise = null;
          reject(error);
        }
      };
      script.onerror = () => {
        pyodidePromise = null;
        script.remove();
        reject(new Error("Impossible de charger Pyodide"));
      };
      document.head.append(script);
    });

    return pyodidePromise;
  }

  function open() {
    close();
    previousFocus = document.activeElement;

    const language = window.LearnHubI18n?.language() || "fr";
    const labels = {
      ar: { title: "محرر بايثون", run: "تشغيل", clear: "مسح", close: "إغلاق", output: "المخرجات", empty: "لا توجد مخرجات", loading: "جارٍ التحميل…", offline: "اتصل بالإنترنت لتحميل محرر Python لأول مرة.", error: "تعذر تحميل Pyodide. تحقق من اتصالك بالإنترنت ثم أعد المحاولة.", editor: "محرر Python", status: "حالة المحرر" },
      en: { title: "Python editor", run: "Run", clear: "Clear", close: "Close", output: "Output", empty: "No output", loading: "Loading…", offline: "Connect to the internet to load the Python editor for the first time.", error: "Could not load Pyodide. Check your connection and try again.", editor: "Python editor", status: "Editor status" },
      fr: { title: "Éditeur Python", run: "Exécuter", clear: "Effacer", close: "Fermer", output: "Résultat", empty: "Aucune sortie", loading: "Chargement…", offline: "Connecte-toi à Internet pour charger l’éditeur Python la première fois.", error: "Impossible de charger Pyodide. Vérifie ta connexion puis réessaie.", editor: "Éditeur Python", status: "État de l’éditeur" }
    };
    const text = labels[language] || labels.fr;

    const backdrop = document.createElement("div");
    backdrop.className = "pyodide-backdrop";
    backdrop.innerHTML = `<section class="pyodide-dialog" role="dialog" aria-modal="true" aria-labelledby="pyodide-title" tabindex="-1">
      <button class="pyodide-close" type="button" aria-label="${text.close}">×</button>
      <h3 id="pyodide-title">${text.title}</h3>
      <div class="pyodide-toolbar">
        <button class="pyodide-btn pyodide-run" type="button">${text.run}</button>
        <button class="pyodide-btn pyodide-clear" type="button">${text.clear}</button>
        <button class="pyodide-btn pyodide-close-btn" type="button">${text.close}</button>
        <span class="pyodide-status" aria-live="polite" aria-label="${text.status}"></span>
      </div>
      <textarea class="pyodide-editor" aria-label="${text.editor}" spellcheck="false" placeholder="print('Bonjour depuis Python !')"></textarea>
      <pre class="pyodide-output" aria-live="polite">${text.output} :</pre>
    </section>`;

    const dialog = backdrop.querySelector(".pyodide-dialog");
    const editor = backdrop.querySelector(".pyodide-editor");
    const output = backdrop.querySelector(".pyodide-output");
    const status = backdrop.querySelector(".pyodide-status");
    const runButton = backdrop.querySelector(".pyodide-run");

    backdrop.querySelector(".pyodide-close").addEventListener("click", close);
    backdrop.querySelector(".pyodide-close-btn").addEventListener("click", close);
    backdrop.querySelector(".pyodide-clear").addEventListener("click", () => {
      editor.value = "";
      output.textContent = `${text.output} :`;
      editor.focus();
    });
    backdrop.addEventListener("click", (event) => { if (event.target === backdrop) close(); });
    backdrop.addEventListener("keydown", (event) => {
      if (event.key === "Escape") {
        event.stopPropagation();
        close();
      } else if (event.key === "Tab") {
        const focusable = [...dialog.querySelectorAll("button:not(:disabled), textarea")];
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (event.shiftKey && (document.activeElement === first || document.activeElement === dialog)) { event.preventDefault(); last.focus(); }
        else if (!event.shiftKey && (document.activeElement === last || document.activeElement === dialog)) { event.preventDefault(); first.focus(); }
      }
    });

    runButton.addEventListener("click", async () => {
      runButton.disabled = true;
      status.textContent = text.loading;
      output.textContent = `${text.output} :`;
      try {
        const pyodide = await loadPyodide();
        const stdout = [];
        const stderr = [];
        pyodide.setStdout({ batched: (line) => stdout.push(line) });
        pyodide.setStderr({ batched: (line) => stderr.push(line) });
        pyodide.setStdin({ error: true });
        const result = await pyodide.runPythonAsync(editor.value);
        if (result !== undefined && result !== null) stdout.push(String(result));
        output.textContent = `${text.output} :\n${[...stdout, ...stderr].join("\n") || text.empty}`;
        status.textContent = "";
      } catch (error) {
        const message = !navigator.onLine ? text.offline : pyodidePromise ? String(error?.message || error) : text.error;
        output.textContent = `${text.output} :\n${message}`;
        status.textContent = "";
      } finally {
        runButton.disabled = false;
        editor.focus();
      }
    });

    document.addEventListener("keydown", onEscape);
    document.body.append(backdrop);
    dialog.focus();
  }

  function onEscape(event) {
    if (event.key === "Escape") close();
  }

  function close() {
    const backdrop = document.querySelector(".pyodide-backdrop");
    if (!backdrop) return;
    backdrop.remove();
    document.removeEventListener("keydown", onEscape);
    previousFocus?.focus();
  }

  window.LearnHubPyodide = { open, close, loadPyodide };
})();
