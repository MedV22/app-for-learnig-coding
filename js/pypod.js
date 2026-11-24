/* Éditeur Python en ligne (Pyodide) — CodeVally */
(() => {
  let pythonWorker = null;
  let activePythonJob = null;
  let nextPythonJobId = 1;
  let previousFocus = null;
  let keydownHandler = null;

  const pythonMessage = (key) => {
    const language = window.LearnHubI18n?.language?.() || "fr";
    const messages = {
      loadingTimeout: {
        fr: "Le moteur Python met trop de temps à se charger. Vérifie ta connexion puis réessaie.",
        en: "The Python runtime took too long to load. Check your connection and try again.",
        ar: "استغرق تحميل بيئة Python وقتاً طويلاً. تحقق من اتصالك ثم حاول مجدداً."
      },
      executionTimeout: {
        fr: "Temps d’exécution dépassé. Vérifie qu’il n’y a pas de boucle infinie.",
        en: "Execution timed out. Check for an infinite loop.",
        ar: "انتهت مهلة التنفيذ. تحقق من عدم وجود حلقة لا نهائية."
      }
    };
    return messages[key]?.[language] || messages[key].fr;
  };

  const clearPythonJobTimers = (job) => {
    window.clearTimeout(job.loadTimer);
    window.clearTimeout(job.executionTimer);
  };

  const terminatePythonWorker = (error) => {
    const job = activePythonJob;
    activePythonJob = null;
    if (pythonWorker) {
      pythonWorker.terminate();
      pythonWorker = null;
    }
    if (job) {
      clearPythonJobTimers(job);
      if (error) job.reject(error);
    }
  };

  const finishPythonJob = (message) => {
    const job = activePythonJob;
    if (!job || message?.id !== job.id) return;
    clearPythonJobTimers(job);
    activePythonJob = null;
    if (message.error) job.reject(new Error(String(message.error).slice(0, 1200)));
    else job.resolve(message);
  };

  const handlePythonWorkerMessage = (event) => {
    const job = activePythonJob;
    const message = event.data;
    if (!job || message?.id !== job.id) return;
    if (message.status === "loading") {
      job.onLoading?.();
      return;
    }
    if (message.status === "ready") {
      window.clearTimeout(job.loadTimer);
      if (job.timeoutMs) {
        job.executionTimer = window.setTimeout(() => {
          terminatePythonWorker(new Error(pythonMessage("executionTimeout")));
        }, job.timeoutMs);
      }
      job.onReady?.();
      return;
    }
    if (message.status === "result") finishPythonJob(message);
  };

  const ensurePythonWorker = () => {
    if (pythonWorker) return Promise.resolve(pythonWorker);
    try {
      pythonWorker = new Worker(new URL("./js/python-worker.js", window.location.href));
      pythonWorker.addEventListener("message", handlePythonWorkerMessage);
      pythonWorker.addEventListener("error", (event) => {
        event.preventDefault();
        terminatePythonWorker(new Error(event.message || "Le moteur Python s’est arrêté."));
      });
      pythonWorker.addEventListener("messageerror", () => {
        terminatePythonWorker(new Error("La réponse du moteur Python est illisible."));
      });
      return Promise.resolve(pythonWorker);
    } catch (error) {
      pythonWorker = null;
      return Promise.reject(error);
    }
  };

  const runPythonTask = (task, source, { onLoading, onReady, timeoutMs = 8000 } = {}) => new Promise((resolve, reject) => {
    if (activePythonJob) {
      reject(new Error("Une exécution Python est déjà en cours."));
      return;
    }
    const id = nextPythonJobId++;
    const job = { id, resolve, reject, onLoading, onReady, timeoutMs, loadTimer: null, executionTimer: null };
    activePythonJob = job;
    job.loadTimer = window.setTimeout(() => {
      terminatePythonWorker(new Error(pythonMessage("loadingTimeout")));
    }, 90000);
    ensurePythonWorker().then((worker) => {
      if (activePythonJob !== job) return;
      worker.postMessage({ id, task, source: String(source ?? "") });
    }).catch((error) => {
      if (activePythonJob === job) terminatePythonWorker(error instanceof Error ? error : new Error(String(error)));
    });
  });

  const codeSnippets = {
    hello: `# Premier programme Python
nom = "Apprenant"
print(f"Bonjour {nom} ! Bienvenue sur CodeVally.")
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
print("Langages disponibles sur CodeVally :")
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
    return runPythonTask("warmup", "", { timeoutMs: 0 }).then(() => undefined);
  }

  function open(initialCode) {
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
          <textarea class="pyodide-editor" maxlength="20000" spellcheck="false" placeholder="# Écris ton code Python ici...
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
    editor.value = typeof initialCode === "string" ? initialCode : codeSnippets.hello;

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

    keydownHandler = (event) => {
      if (window.LearnHubUtils?.isTopLayer && !window.LearnHubUtils.isTopLayer(backdrop)) return;
      if (event.key === "Escape") {
        event.stopImmediatePropagation();
        close();
      } else if (event.key === "Tab") {
        const dialog = backdrop.querySelector(".pyodide-dialog");
        const focusable = [...dialog.querySelectorAll("button:not(:disabled), input:not(:disabled), textarea:not(:disabled), select:not(:disabled), [tabindex]:not([tabindex='-1'])")];
        if (!focusable.length) return;
        const first = focusable[0];
        const last = focusable.at(-1);
        if (event.shiftKey && (document.activeElement === first || document.activeElement === dialog)) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && (document.activeElement === last || document.activeElement === dialog)) {
          event.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener("keydown", keydownHandler);

    // Run action
    runButton.addEventListener("click", async () => {
      runButton.disabled = true;
      runButton.classList.add("is-running");
      status.textContent = text.loading;
      output.textContent = "⟳ Chargement du moteur Python...";

      try {
        const result = await runPythonTask("run", editor.value, {
          onLoading: () => { output.textContent = "⟳ Chargement du moteur Python..."; },
          onReady: () => { output.textContent = "▶ Exécution en cours..."; },
          timeoutMs: 8000
        });
        output.textContent = result.output || text.empty;

        if (result.truncated) {
          const truncationMessage = language === "en"
            ? "Output truncated (limit: 45 lines / 24,000 characters)."
            : language === "ar"
            ? "تم اقتطاع المخرجات (الحد: 45 سطراً / 24,000 حرفاً)."
            : "Sortie tronquée (limite : 45 lignes / 24 000 caractères).";
          output.textContent += `\n\n… ${truncationMessage}`;
        }

        status.textContent = "✓ Terminé";
        status.className = "pyodide-status is-ok";
      } catch (error) {
        const isOffline = typeof navigator !== "undefined" && !navigator.onLine;
        const rawMessage = String(isOffline ? text.offline : (error?.message || error)).slice(0, 1200);
        const errLines = rawMessage.split("\n");
        const truncErr = errLines.length > 45;
        const dispErr = (truncErr ? errLines.slice(0, 45) : errLines).join("\n");
        output.textContent = `Traceback (most recent call last):\n${dispErr}${truncErr ? "\n… traceback tronqué" : ""}`;
        status.textContent = "✗ Erreur";
        status.className = "pyodide-status is-error";
      } finally {
        runButton.disabled = false;
        runButton.classList.remove("is-running");
        window.setTimeout(() => {
          if (status.isConnected) {
            status.textContent = "";
            status.className = "pyodide-status";
          }
        }, 3000);
      }
    });

    document.body.append(backdrop);
    editor.focus();
  }

  function close() {
    const backdrop = document.querySelector(".pyodide-backdrop");
    if (activePythonJob) terminatePythonWorker(new Error("Exécution annulée."));
    if (keydownHandler) {
      document.removeEventListener("keydown", keydownHandler);
      keydownHandler = null;
    }
    if (backdrop) backdrop.remove();
    if (previousFocus?.isConnected) previousFocus.focus();
    previousFocus = null;
  }

  async function validateSyntax(source) {
    const result = await runPythonTask("validate", String(source ?? ""), { timeoutMs: 8000 });
    return result.syntaxError || null;
  }

  window.LearnHubPyodide = { open, close, loadPyodide, validateSyntax };
})();
