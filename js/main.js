(() => {
  const root = document.documentElement;
  const savedTheme = localStorage.getItem("learnhub-theme");
  const savedLanguage = localStorage.getItem("learnhub-language") || "fr";
  const page = document.body?.dataset?.page;

  if (savedTheme === "dark") root.classList.add("dark");

  const slug = (value) => {
    if (!value) return "notion";
    const map = {
      "+": "plus",
      "-": "minus",
      "*": "mult",
      "/": "div",
      "%": "mod",
      "=": "eq",
      "<": "lt",
      ">": "gt",
      "&": "and",
      "|": "pipe",
      "#": "hash",
      ":": "colon",
      ".": "dot",
      "$": "dollar",
      "@": "at"
    };
    let s = String(value);
    for (const [char, rep] of Object.entries(map)) {
      s = s.split(char).join("-" + rep + "-");
    }
    s = s.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
    return s || "notion";
  };

  const legacySlug = (value) => String(value || "").normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

  window.LearnHubUtils = { slug, legacySlug };

  const getLanguage = () => window.LearnHubI18n?.language?.() || savedLanguage || "fr";

  const insertInstallButton = () => {
    const header = document.querySelector(".topbar");
    if (!header || header.querySelector(".install-button")) return;
    const installButton = document.createElement("button");
    installButton.type = "button";
    installButton.className = "install-button";
    installButton.hidden = true;
    installButton.innerHTML = `<span class="install-icon">📥</span> <span class="install-text">Installer</span>`;
    installButton.setAttribute("aria-label", "Installer l'application");
    header.appendChild(installButton);
    return installButton;
  };

  const updateInstallButton = () => {
    const installButton = document.querySelector(".install-button");
    if (!installButton) return;
    const language = getLanguage();
    const labels = {
      ar: "تثبيت التطبيق",
      en: "Install App",
      fr: "Installer l'application"
    };
    const textEl = installButton.querySelector(".install-text");
    if (textEl) textEl.textContent = labels[language] || labels.fr;
    installButton.setAttribute("aria-label", labels[language] || labels.fr);
  };

  const installButton = insertInstallButton();
  let deferredPrompt = null;

  if ("serviceWorker" in navigator) {
    window.addEventListener("load", () => {
      navigator.serviceWorker.register("./sw.js").catch(() => {});
    });
  }

  window.addEventListener("beforeinstallprompt", (event) => {
    event.preventDefault();
    deferredPrompt = event;
    if (installButton) {
      installButton.hidden = false;
      updateInstallButton();
    }
  });

  installButton?.addEventListener("click", async () => {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    await deferredPrompt.userChoice;
    deferredPrompt = null;
    if (installButton) installButton.hidden = true;
  });

  const getCourseKey = () => {
    if (page === "web") return document.querySelector(".language-tab.active")?.dataset.language || "html";
    if (page && page !== "home") return page;
    return null;
  };

  const continueLesson = () => {
    const courseKey = getCourseKey();
    const course = typeof window.data !== "undefined" ? window.data[courseKey] : (typeof data !== "undefined" ? data[courseKey] : null);
    if (!courseKey || !course || !window.LearnHubModal || !window.LearnHubI18n) return;

    const learned = new Set(JSON.parse(localStorage.getItem(`learnhub-learned-${courseKey}`) || "[]"));

    // Find first unlearned item
    for (const section of course) {
      for (const item of section.items) {
        const id = `${courseKey}-${slug(section.categorie)}-${slug(item.nom)}`;
        const legId = `${courseKey}-${legacySlug(section.categorie)}-${legacySlug(item.nom)}`;
        if (learned.has(id) || learned.has(legId)) continue;

        // Found unlearned item!
        const cardBtn = document.querySelector(`.concept-open[data-name="${CSS.escape(item.nom)}"][data-category="${CSS.escape(section.categorie)}"]`);
        if (cardBtn) {
          cardBtn.scrollIntoView({ behavior: "smooth", block: "center" });
          cardBtn.click();
        }
        return;
      }
    }

    // All items learned! Celebrate and offer quiz!
    const lang = getLanguage();
    const messages = {
      ar: "🎉 مبروك! لقد أكملت جميع المفاهيم في هذا المسار بنجاح. هل ترغب في خوض الاختبار الشامل لاختبار معلوماتك؟",
      en: "🎉 Congratulations! You have mastered all concepts in this course. Would you like to take the Challenge Quiz?",
      fr: "🎉 Bravo ! Tu as validé toutes les notions de ce parcours. Veux-tu passer le Grand Quiz de validation pour tester tes acquis ?"
    };
    if (confirm(messages[lang] || messages.fr)) {
      window.LearnHubQuiz?.open(page === "web" ? "web" : courseKey, null, lang);
    }
  };

  const resetCourseProgress = () => {
    const courseKey = getCourseKey();
    if (!courseKey) return;

    const lang = getLanguage();
    const confirmations = {
      ar: "هل أنت متأكد من رغبتك في إعادة تعيين تقدمك في هذا المسار؟ سيتم مسح المفاهيم المكتملة.",
      en: "Are you sure you want to reset your progress for this course? This action cannot be undone.",
      fr: "Es-tu sûr de vouloir réinitialiser ta progression pour ce parcours ? Cette action est irréversible."
    };

    if (confirm(confirmations[lang] || confirmations.fr)) {
      localStorage.removeItem(`learnhub-learned-${courseKey}`);
      window.dispatchEvent(new Event("learnhubstatechange"));
      window.dispatchEvent(new Event("learnhublanguagechange"));
    }
  };

  const attachProgressActions = () => {
    const progressWrap = document.querySelector(".progress-wrap");
    if (!progressWrap) return;

    const language = getLanguage();
    const labels = {
      ar: { reset: "إعادة التعيين", continue: "استمرار التعلم →" },
      en: { reset: "Reset Progress", continue: "Continue Lesson →" },
      fr: { reset: "Réinitialiser", continue: "Continuer →" }
    };
    const currentLabels = labels[language] || labels.fr;

    let actionsGroup = progressWrap.querySelector(".progress-actions-group");
    if (!actionsGroup) {
      actionsGroup = document.createElement("div");
      actionsGroup.className = "progress-actions-group";
      progressWrap.appendChild(actionsGroup);
    }

    if (!actionsGroup.querySelector(".continue-btn")) {
      const continueButton = document.createElement("button");
      continueButton.type = "button";
      continueButton.className = "continue-btn";
      continueButton.textContent = currentLabels.continue;
      continueButton.addEventListener("click", continueLesson);
      actionsGroup.appendChild(continueButton);
    } else {
      actionsGroup.querySelector(".continue-btn").textContent = currentLabels.continue;
    }

    if (!actionsGroup.querySelector(".reset-progress")) {
      const resetButton = document.createElement("button");
      resetButton.type = "button";
      resetButton.className = "reset-progress";
      resetButton.textContent = currentLabels.reset;
      resetButton.addEventListener("click", resetCourseProgress);
      actionsGroup.appendChild(resetButton);
    } else {
      actionsGroup.querySelector(".reset-progress").textContent = currentLabels.reset;
    }
  };

  // Theme toggle
  document.querySelectorAll(".theme-toggle").forEach((button) => {
    const update = () => {
      const dark = root.classList.contains("dark");
      button.innerHTML = dark ? `<span class="theme-icon">☀</span>` : `<span class="theme-icon">☾</span>`;
      const language = getLanguage();
      const labels = {
        ar: dark ? "تفعيل الوضع الفاتح" : "تفعيل الوضع الداكن",
        en: dark ? "Switch to light mode" : "Switch to dark mode",
        fr: dark ? "Activer le thème clair" : "Activer le thème sombre"
      };
      button.setAttribute("aria-label", labels[language] || labels.fr);
      button.setAttribute("title", labels[language] || labels.fr);
    };
    update();
    button.addEventListener("click", () => {
      root.classList.toggle("dark");
      localStorage.setItem("learnhub-theme", root.classList.contains("dark") ? "dark" : "light");
      update();
    });
  });

  // Terminal buttons
  document.querySelectorAll(".terminal-toggle").forEach((button) => {
    button.addEventListener("click", () => {
      window.LearnHubTerminal?.open();
    });
  });

  // Python playground buttons
  document.querySelectorAll(".python-toggle").forEach((button) => {
    button.addEventListener("click", () => {
      window.LearnHubPyodide?.open();
    });
  });

  // Language switch
  document.querySelectorAll(".language-switch").forEach((select) => {
    select.value = savedLanguage;
    select.addEventListener("change", () => {
      localStorage.setItem("learnhub-language", select.value);
      window.LearnHubI18n?.apply(select.value);
    });
  });

  // Keyboard global shortcuts
  document.addEventListener("keydown", (event) => {
    // Ignore when typing inside input / textarea
    const tag = event.target.tagName;
    if (tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT") return;

    if (event.key === "/" && !event.ctrlKey && !event.metaKey) {
      event.preventDefault();
      const searchInput = document.querySelector("#global-search, .item-search");
      searchInput?.focus();
    } else if (event.altKey && (event.key === "t" || event.key === "T")) {
      event.preventDefault();
      window.LearnHubTerminal?.open();
    } else if (event.altKey && (event.key === "p" || event.key === "P")) {
      event.preventDefault();
      window.LearnHubPyodide?.open();
    }
  });

  if (savedLanguage !== "fr") {
    window.LearnHubI18n?.apply(savedLanguage);
  }

  attachProgressActions();
  updateInstallButton();

  window.addEventListener("learnhublanguagechange", () => {
    attachProgressActions();
    updateInstallButton();
  });
})();
