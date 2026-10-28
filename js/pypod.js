/* Éditeur Python en ligne (Pyodide) – Learn Hub */
(() => {
  let pyodideReady = false;
  let pyodidePromise = null;

  function loadPyodide() {
    if (pyodidePromise) return pyodidePromise;
    pyodidePromise = new Promise((resolve, reject) => {
      const script = document.createElement("script");
      script.src = "https://cdn.jsdelivr.net/pyodide/v0.27.0/full/pyodide.mjs";
      script.type = "module";
      script.onload = async () => {
        try {
          const { loadPyodide } = window.pyodide || await import("https://cdn.jsdelivr.net/pyodide/v0.27.0/full/pyodide.mjs");
          window.pyodideInstance = await loadPyodide();
          pyodideReady = true;
          resolve(window.pyodideInstance);
        } catch (e) { reject(e); }
      };
      script.onerror = () => reject(new Error("Impossible de charger Pyodide"));
      document.head.appendChild(script);
    });
    return pyodidePromise;
  }

  function esc(value) { return String(value ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]); }

  function open() {
    const existing = document.querySelector(".pyodide-backdrop");
    if (existing) existing.remove();

    const language = window.LearnHubI18n ? window.LearnHubI18n.language() : "fr";
    const labels = {
      ar: { title: "محرر بايثون", run: "تشغيل", clear: "مسح", close: "إغلاق", output: "المخرجات", loading: "جارٍ التحميل..." },
      en: { title: "Python Editor", run: "Run", clear: "Clear", close: "Close", output: "Output", loading: "Loading…" },
      fr: { title: "Éditeur Python", run: "Exécuter", clear: "Effacer", close: "Fermer", output: "Sortie", loading: "Chargement…" }
    };
    const l = labels[language] || labels.fr;

    const backdrop = document.createElement("div");
    backdrop.className = "pyodide-backdrop";
    backdrop.innerHTML = `<section class="pyodide-dialog" role="dialog" aria-modal="true" aria-labelledby="pyodide-title">
      <button class="pyodide-close" type="button" aria-label="${l.close}">×</button>
      <h3 id="pyodide-title">${l.title}</h3>
      <div class="pyodide-toolbar">
        <button class="pyodide-btn pyodide-run" type="button">${l.run}</button>
        <button class="pyodide-btn pyodide-clear" type="button">${l.clear}</button>
        <button class="pyodide-btn pyodide-close-btn" type="button">${l.close}</button>
        <span class="pyodide-status" id="pyodide-status"></span>
      </div>
      <textarea class="pyodide-editor" placeholder="print('Bonjour depuis Python !')"></textarea>
      <div class="pyodide-output" id="pyodide-output">${l.output} :</div>
    </section>`;
    backdrop.querySelector(".pyodide-close").addEventListener("click", close);
    backdrop.querySelector(".pyodide-close-btn").addEventListener("click", close);
    backdrop.querySelector(".pyodide-backdrop").addEventListener("click", (e) => { if (e.target === backdrop) close(); });
    backdrop.querySelector(".pyodide-clear").addEventListener("click", () => {
      backdrop.querySelector(".pyodide-editor").value = "";
      backdrop.querySelector(".pyodide-output").textContent = `${l.output} :`;
    });
    backdrop.querySelector(".pyodide-run").addEventListener("click", async () => {
      const editor = backdrop.querySelector(".pyodide-editor");
      const output = backdrop.querySelector(".pyodide-output");
      const status = backdrop.querySelector("#pyodide-status");
      if (!pyodideReady) {
        status.textContent = l.loading;
        try {
          await loadPyodide();
          status.textContent = "";
        } catch {
          output.textContent = "Erreur : impossible de charger Pyodide. Vérifiez votre connexion.";
          return;
        }
      }
      try {
        const oldWrite = window.pyodideInstance?.setStdout?.bind ? null : null;
        let captured = "";
        const originalLog = console.log;
        const result = window.pyodideInstance.runPythonAsync ? await window.pyodideInstance.runPythonAsync(editor.value) : window.pyodideInstance.runPython(editor.value);
        output.textContent = `${l.output} :\n${esc(String(result ?? ""))}`;
        status.textContent = "";
      } catch (e) {
        output.textContent = `Erreur :\n${esc(String(e.message || e))}`;
      }
    });
    document.body.append(backdrop);
    backdrop.querySelector(".pyodide-editor").focus();
  }

  function close() {
    document.querySelector(".pyodide-backdrop")?.remove();
  }

  window.LearnHubPyodide = { open, close, loadPyodide };
})();
