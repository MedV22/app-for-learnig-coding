/* Éditeur Python en ligne (Pyodide) — Learn Hub */
(() => {
  const PYODIDE_VERSION = "0.27.0";
  const PYODIDE_BASE = `https://cdn.jsdelivr.net/pyodide/v${PYODIDE_VERSION}/full/`;
  let pyodidePromise = null;
  let previousFocus = null;

  const codeSnippets = {
    hello: `# Premier programme Python
nom = "Apprenant"
print(f"Bonjour {nom} ! Bienvenue sur Learn Hub.")
print("Python est prêt à exécuter tes idées.")
`,
    calc: `# Mini-calculatrice
def calculer(a, b, operation):
    if operation == "+":
        return a + b
    elif operation == "-":
        return a - b
    elif operation == "*":
        return a * b
    elif operation == "/":
        return a / b if b != 0 else "Erreur : division par zéro"
    return "Opération inconnue"

print("12 + 8 =", calculer(12, 8, "+"))
print("15 * 3 =", calculer(15, 3, "*"))
print("100 / 4 =", calculer(100, 4, "/"))
`,
    loop: `# Boucle et liste
langages = ["Python", "JavaScript", "HTML", "CSS", "Bash"]
print("Langages disponibles sur Learn Hub :")
for index, lang in enumerate(langages, start=1):
    print(f"  {index}. {lang}")
`,
    password: `# Générateur de mot de passe simple
import random

caracteres = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*"
longueur = 14
mot_de_passe = "".join(random.choice(caracteres) for _ in range(longueur))
print("Mot de passe sécurisé généré :")
print("->", mot_de_passe)
`,
    security: `# Simulation d'analyse réseau (lab)
ports_usuels = {
    21: "FTP",
    22: "SSH",
    80: "HTTP",
    443: "HTTPS",
    3306: "MySQL"
}

print("Ports de test détectés sur la cible 192.168.1.1 :")
for port, service in ports_usuels.items():
    print(f"[+] Port {port:<5} | Service : {service} (SIMULÉ)")
`
  };

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
        reject(new Error("Impossible de charger Pyodide depuis le CDN."));
      };
      document.head.append(script);
    });

    return pyodidePromise;
  }

  function open() {
    close();
    previousFocus = document.activeElement;

    const language = window.LearnHubI18n?.language?.() || "fr";
    const labels = {
      ar: {
        title: "محرر بايثون التفاعلي (Pyodide)",
        run: "تشغيل (Ctrl+Enter)",
        clear: "مسح",
        close: "إغلاق",
        output: "المخرجات والنتائج",
        empty: "(لا توجد مخرجات)",
        loading: "جارٍ تحميل بيئة Python...",
        offline: "اتصل بالإنترنت لتحميل محرر Python لأول مرة.",
        error: "تعذر تشغيل الكود. تحقق من اتصالك ثم حاول مجدداً.",
        presets: "أمثلة جاهزة..."
      },
      en: {
        title: "Interactive Python Playground (Pyodide)",
        run: "Run Code (Ctrl+Enter)",
        clear: "Clear",
        close: "Close",
        output: "Console Output",
        empty: "(No output produced)",
        loading: "Initializing Python runtime...",
        offline: "Please connect to the internet to load Pyodide on the first run.",
        error: "Could not execute code. Please verify your connection.",
        presets: "Code presets..."
      },
      fr: {
        title: "Éditeur Python en ligne (Pyodide)",
        run: "Exécuter (Ctrl+Entrée)",
        clear: "Effacer",
        close: "Fermer",
        output: "Console de sortie",
        empty: "(Aucune sortie produite)",
        loading: "Chargement du moteur Python...",
        offline: "Connecte-toi à Internet pour charger l'interpréteur Python la première fois.",
        error: "Erreur lors de l'exécution du code.",
        presets: "Exemples de code..."
      }
    };
    const text = labels[language] || labels.fr;

    const backdrop = document.createElement("div");
    backdrop.className = "pyodide-backdrop";
    backdrop.innerHTML = `
      <section class="pyodide-dialog" role="dialog" aria-modal="true" aria-labelledby="pyodide-title" tabindex="-1">
        <div class="pyodide-titlebar">
          <div class="window-dots" aria-hidden="true">
            <span class="dot dot-red"></span>
            <span class="dot dot-yellow"></span>
            <span class="dot dot-green"></span>
          </div>
          <div class="pyodide-tab" id="pyodide-title">
            <span class="py-icon">🐍</span> ${text.title}
          </div>
          <button class="pyodide-close" type="button" aria-label="${text.close}">×</button>
        </div>

        <div class="pyodide-toolbar">
          <button class="pyodide-btn pyodide-run" type="button">
            <span>▶</span> ${text.run}
          </button>
          <select class="pyodide-presets" aria-label="Choisir un exemple">
            <option value="">${text.presets}</option>
            <option value="hello">👋 Bonjour le monde</option>
            <option value="calc">🔢 Calculatrice & Fonctions</option>
            <option value="loop">🔁 Boucle & Liste</option>
            <option value="password">🔐 Mot de passe aléatoire</option>
            <option value="security">🛡️ Simulation réseau</option>
          </select>
          <button class="pyodide-btn pyodide-clear" type="button">${text.clear}</button>
          <span class="pyodide-status" aria-live="polite"></span>
        </div>

        <div class="pyodide-body">
          <div class="pyodide-editor-wrap">
            <textarea class="pyodide-editor" spellcheck="false" placeholder="# Écris ton code Python ici...
print('Hello from Python!')" aria-label="Éditeur de code Python"></textarea>
          </div>
          <div class="pyodide-output-wrap">
            <div class="pyodide-output-header">
              <span>🖥️ ${text.output}</span>
            </div>
            <pre class="pyodide-output" aria-live="polite"># Cliquez sur 'Exécuter' pour tester votre code.</pre>
          </div>
        </div>
      </section>`;

    const editor = backdrop.querySelector(".pyodide-editor");
    const output = backdrop.querySelector(".pyodide-output");
    const status = backdrop.querySelector(".pyodide-status");
    const runButton = backdrop.querySelector(".pyodide-run");
    const presetsSelect = backdrop.querySelector(".pyodide-presets");

    // Set default starter code
    editor.value = codeSnippets.hello;

    // Presets change
    presetsSelect.addEventListener("change", () => {
      const chosen = presetsSelect.value;
      if (chosen && codeSnippets[chosen]) {
        editor.value = codeSnippets[chosen];
        editor.focus();
      }
    });

    // Indent with tab key
    editor.addEventListener("keydown", (e) => {
      if (e.key === "Tab") {
        e.preventDefault();
        const start = editor.selectionStart;
        const end = editor.selectionEnd;
        editor.value = editor.value.substring(0, start) + "    " + editor.value.substring(end);
        editor.selectionStart = editor.selectionEnd = start + 4;
      } else if (e.key === "Enter" && (e.ctrlKey || e.metaKey)) {
        e.preventDefault();
        runButton.click();
      }
    });

    backdrop.querySelector(".pyodide-close").addEventListener("click", close);
    backdrop.querySelector(".pyodide-clear").addEventListener("click", () => {
      editor.value = "";
      output.textContent = `# ${text.output} effacée.`;
      editor.focus();
    });

    backdrop.addEventListener("click", (event) => {
      if (event.target === backdrop) close();
    });

    const onKeyDown = (event) => {
      if (event.key === "Escape") {
        event.stopPropagation();
        close();
      }
    };
    document.addEventListener("keydown", onKeyDown);

    // Run action
    runButton.addEventListener("click", async () => {
      runButton.disabled = true;
      runButton.classList.add("is-running");
      status.textContent = text.loading;
      output.textContent = "Exécution en cours...";

      try {
        const pyodide = await loadPyodide();
        const stdout = [];
        const stderr = [];

        pyodide.setStdout({ batched: (line) => stdout.push(line) });
        pyodide.setStderr({ batched: (line) => stderr.push(line) });
        pyodide.setStdin({ error: true });

        const result = await pyodide.runPythonAsync(editor.value);
        if (result !== undefined && result !== null) {
          stdout.push(String(result));
        }

        const outText = [...stdout, ...stderr].join("\n").trim();
        output.textContent = outText || text.empty;
        status.textContent = "✓ Terminé";
      } catch (error) {
        const message = !navigator.onLine ? text.offline : (error?.message || String(error));
        output.textContent = `Traceback / Erreur :\n${message}`;
        status.textContent = "⚠ Erreur";
      } finally {
        runButton.disabled = false;
        runButton.classList.remove("is-running");
        window.setTimeout(() => {
          if (status.isConnected) status.textContent = "";
        }, 2500);
      }
    });

    document.body.append(backdrop);
    editor.focus();
  }

  function close() {
    const backdrop = document.querySelector(".pyodide-backdrop");
    if (!backdrop) return;
    backdrop.remove();
    previousFocus?.focus();
  }

  window.LearnHubPyodide = { open, close, loadPyodide };
})();
