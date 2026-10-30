(() => {
  const root = document.documentElement;
  const savedTheme = localStorage.getItem("learnhub-theme");
  const savedLanguage = localStorage.getItem("learnhub-language") || "fr";
  const page = document.body?.dataset?.page;

  if (savedTheme === "dark") root.classList.add("dark");

  const getLanguage = () => window.LearnHubI18n?.language?.() || savedLanguage || "fr";

  const insertInstallButton = () => {
    const header = document.querySelector(".topbar");
    if (!header || header.querySelector(".install-button")) return;
    const installButton = document.createElement("button");
    installButton.type = "button";
    installButton.className = "install-button";
    installButton.hidden = true;
    installButton.textContent = "Installer";
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
      en: "Install app",
      fr: "Installer l'application"
    };
    installButton.textContent = labels[language] || labels.fr;
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

  const slug = (value) => String(value || "").normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

  const getCourseKey = () => {
    if (page === "web") return document.querySelector(".language-tab.active")?.dataset.language || "html";
    if (page && page !== "home") return page;
    return null;
  };

  const continueLesson = () => {
    const courseKey = getCourseKey();
    // data.js declares `data` as a global lexical binding, not window.data.
    const course = typeof data === "undefined" ? null : data[courseKey];
    if (!courseKey || !course || !window.LearnHubModal || !window.LearnHubI18n) return;

    const learned = new Set(JSON.parse(localStorage.getItem(`learnhub-learned-${courseKey}`) || "[]"));
    for (const section of course) {
      for (const item of section.items) {
        const id = `${courseKey}-${slug(section.categorie)}-${slug(item.nom)}`;
        if (learned.has(id)) continue;

        const localizedItem = {
          ...item,
          nom: window.LearnHubI18n.itemName(item.nom),
          utilite: window.LearnHubI18n.content(item, "utilite", courseKey, section.categorie),
          exemple: window.LearnHubI18n.content(item, "exemple", courseKey, section.categorie),
          attention: window.LearnHubI18n.content(item, "attention", courseKey, section.categorie)
        };

        window.LearnHubModal.open(localizedItem, section.categorie, false, () => {
          const updated = new Set(JSON.parse(localStorage.getItem(`learnhub-learned-${courseKey}`) || "[]"));
          const isLearned = updated.has(id);
          if (isLearned) updated.delete(id); else updated.add(id);
          localStorage.setItem(`learnhub-learned-${courseKey}`, JSON.stringify([...updated]));
          window.dispatchEvent(new Event("learnhublanguagechange"));
          return !isLearned;
        }, courseKey, id);
        return;
      }
    }
  };

  const resetCourseProgress = () => {
    const courseKey = getCourseKey();
    if (!courseKey) return;
    localStorage.removeItem(`learnhub-learned-${courseKey}`);
    window.dispatchEvent(new Event("learnhublanguagechange"));
  };

  const attachProgressActions = () => {
    const progressWrap = document.querySelector(".progress-wrap");
    if (!progressWrap) return;

    const language = getLanguage();
    const labels = {
      ar: { reset: "إعادة تعيين التقدم", continue: "استمرار" },
      en: { reset: "Reset progress", continue: "Continue" },
      fr: { reset: "Réinitialiser ma progression", continue: "Continuer" }
    };
    const currentLabels = labels[language] || labels.fr;

    if (!progressWrap.querySelector(".reset-progress")) {
      const resetButton = document.createElement("button");
      resetButton.type = "button";
      resetButton.className = "reset-progress";
      resetButton.textContent = currentLabels.reset;
      resetButton.addEventListener("click", resetCourseProgress);
      progressWrap.appendChild(resetButton);
    } else {
      progressWrap.querySelector(".reset-progress").textContent = currentLabels.reset;
    }

    if (!progressWrap.querySelector(".continue-btn")) {
      const continueButton = document.createElement("button");
      continueButton.type = "button";
      continueButton.className = "continue-btn";
      continueButton.textContent = currentLabels.continue;
      continueButton.addEventListener("click", continueLesson);
      progressWrap.appendChild(continueButton);
    } else {
      progressWrap.querySelector(".continue-btn").textContent = currentLabels.continue;
    }
  };

  document.querySelectorAll(".theme-toggle").forEach((button) => {
    const update = () => {
      const dark = root.classList.contains("dark");
      button.textContent = dark ? "☀" : "☾";
      const language = getLanguage();
      const labels = {
        ar: dark ? "تفعيل الوضع الفاتح" : "تفعيل الوضع الداكن",
        en: dark ? "Switch to light mode" : "Switch to dark mode",
        fr: dark ? "Activer le thème clair" : "Activer le thème sombre"
      };
      button.setAttribute("aria-label", labels[language] || labels.fr);
    };
    update();
    button.addEventListener("click", () => {
      root.classList.toggle("dark");
      localStorage.setItem("learnhub-theme", root.classList.contains("dark") ? "dark" : "light");
      update();
    });
  });

  document.querySelectorAll(".terminal-toggle").forEach((button) => {
    button.addEventListener("click", () => { window.LearnHubTerminal?.open(); });
  });

  document.querySelectorAll(".python-toggle").forEach((button) => {
    button.addEventListener("click", () => { window.LearnHubPyodide?.open(); });
  });

  document.querySelectorAll(".language-switch").forEach((select) => {
    select.value = savedLanguage;
    select.addEventListener("change", () => {
      localStorage.setItem("learnhub-language", select.value);
      if (select.value === "fr") location.reload();
      else window.LearnHubI18n?.apply(select.value);
    });
  });

  if (savedLanguage !== "fr") window.LearnHubI18n?.apply(savedLanguage);

  attachProgressActions();
  updateInstallButton();
  window.addEventListener("learnhublanguagechange", () => {
    attachProgressActions();
    updateInstallButton();
  });
})();
