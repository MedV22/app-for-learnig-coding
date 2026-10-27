(() => {
  const root = document.documentElement;
  const savedTheme = localStorage.getItem("learnhub-theme");
  if (savedTheme === "dark") root.classList.add("dark");
  document.querySelectorAll(".theme-toggle").forEach((button) => {
    const update = () => {
      const dark = root.classList.contains("dark");
      button.textContent = dark ? "☀" : "☾";
      button.setAttribute("aria-label", dark ? "Activer le thème clair" : "Activer le thème sombre");
    };
    update();
    button.addEventListener("click", () => {
      root.classList.toggle("dark");
      localStorage.setItem("learnhub-theme", root.classList.contains("dark") ? "dark" : "light");
      update();
    });
  });
})();
