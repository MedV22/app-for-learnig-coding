(() => {
  const root = document.documentElement;
  const savedTheme = localStorage.getItem("learnhub-theme");
  const savedLanguage = localStorage.getItem("learnhub-language") || "fr";
  if (savedTheme === "dark") root.classList.add("dark");
  document.querySelectorAll(".theme-toggle").forEach((button) => {
    const update = () => {
      const dark = root.classList.contains("dark");
      button.textContent = dark ? "☀" : "☾";
      const language = window.LearnHubI18n?.language() || "fr";
      const labels = {
        ar: dark ? "تفعيل الوضع الفاتح" : "تفعيل الوضع الداكن",
        en: dark ? "Switch to light mode" : "Switch to dark mode",
        fr: dark ? "Activer le thème clair" : "Activer le thème sombre"
      };
      button.setAttribute("aria-label", labels[language]);
    };
    update();
    button.addEventListener("click", () => {
      root.classList.toggle("dark");
      localStorage.setItem("learnhub-theme", root.classList.contains("dark") ? "dark" : "light");
      update();
    });
  });
  document.querySelectorAll(".language-switch").forEach((select) => {
    select.value = savedLanguage;
    select.addEventListener("change", () => {
      localStorage.setItem("learnhub-language", select.value);
      if (select.value === "fr") location.reload();
      else window.LearnHubI18n.apply(select.value);
    });
  });
  if (savedLanguage !== "fr") window.LearnHubI18n?.apply(savedLanguage);
})();
