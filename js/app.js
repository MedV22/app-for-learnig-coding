(() => {
  const page = document.body.dataset.page;
  if (page === "home") {
    const globalSearch = document.querySelector("#global-search");
    const results = document.querySelector(".search-results");
    if (globalSearch && results) {
      const showResults = () => {
        const query = globalSearch.value.trim().toLocaleLowerCase("fr");
        if (!query) { results.innerHTML = ""; return; }
        const matches = ["python", "kali", "html", "css", "javascript"].flatMap((key) => data[key].flatMap((section) => section.items
          .filter((item) => `${item.nom} ${item.utilite} ${item.exemple} ${section.categorie}`.toLocaleLowerCase("fr").includes(query))
          .map((item) => ({ ...item, categorie: section.categorie, key })))).slice(0, 8);
        results.innerHTML = matches.length ? matches.map((item) => {
          const isWeb = ["html", "css", "javascript"].includes(item.key);
          const courseName = { python: "Python", kali: "Kali Linux", html: "HTML", css: "CSS", javascript: "JavaScript" }[item.key];
          const href = isWeb ? `web.html?lang=${item.key}&q=${encodeURIComponent(item.nom)}` : `${item.key}.html?q=${encodeURIComponent(item.nom)}`;
          return `<a class="result-link" href="${href}"><strong>${item.nom}</strong><span>${courseName} · ${item.categorie} — ${item.utilite}</span></a>`;
        }).join("") : '<p class="search-empty">Aucune notion trouvée. Essaie un autre mot.</p>';
      };
      globalSearch.addEventListener("input", showResults);
      globalSearch.form.addEventListener("submit", (event) => {
        event.preventDefault();
        showResults();
        results.querySelector("a")?.click();
      });
    }
    return;
  }
  const languageKeys = page === "web" ? ["html", "css", "javascript"] : [page];
  let activeKey = page === "web" ? new URLSearchParams(location.search).get("lang") : page;
  if (!languageKeys.includes(activeKey)) activeKey = languageKeys[0];
  if (!data?.[activeKey]) return;
  const search = document.querySelector(".item-search");
  const level = document.querySelector(".level-filter");
  const nav = document.querySelector(".category-nav");
  const sections = document.querySelector(".card-sections");
  const tabs = document.querySelectorAll("[data-language]");
  const slug = (value) => value.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
  const idFor = (key, category, item) => `${key}-${slug(category)}-${slug(item.nom)}`;
  const readLearned = (key) => {
    try { return new Set(JSON.parse(localStorage.getItem(`learnhub-learned-${key}`) || "[]")); }
    catch { return new Set(); }
  };
  const setActiveTab = () => tabs.forEach((tab) => {
    const active = tab.dataset.language === activeKey;
    tab.classList.toggle("active", active);
    tab.setAttribute("aria-selected", String(active));
    tab.tabIndex = active ? 0 : -1;
  });

  function render() {
    const course = data[activeKey];
    const learned = readLearned(activeKey);
    const allItems = course.flatMap((section) => section.items.map((item) => ({ ...item, categorie: section.categorie })));
    const query = search.value.trim().toLocaleLowerCase("fr");
    const selectedLevel = level.value;
    nav.innerHTML = course.map((section) => `<a href="#${activeKey}-${slug(section.categorie)}">${section.categorie}</a>`).join("");
    const sectionsVisible = course.map((section) => {
      const items = section.items.filter((item) => {
        const searchable = `${item.nom} ${item.utilite} ${item.exemple} ${section.categorie}`.toLocaleLowerCase("fr");
        return (!query || searchable.includes(query)) && (selectedLevel === "all" || item.niveau === selectedLevel);
      });
      return { ...section, items };
    }).filter((section) => section.items.length);
    sections.innerHTML = sectionsVisible.length ? sectionsVisible.map((section) => {
      const cards = section.items.map((item) => {
        const id = idFor(activeKey, section.categorie, item);
        return `<button class="concept-card${learned.has(id) ? " is-learned" : ""}" type="button" data-id="${id}" data-category="${section.categorie}" data-name="${item.nom}" aria-label="Ouvrir la fiche ${item.nom}${learned.has(id) ? ", notion apprise" : ""}"><span class="concept-name">${item.nom}</span><span class="concept-bottom"><span class="level-badge">${item.niveau}</span>${learned.has(id) ? '<span class="learned-mark" aria-label="Apprise">✓</span>' : ""}</span></button>`;
      }).join("");
      return `<section class="category-section" id="${activeKey}-${slug(section.categorie)}"><div class="section-heading"><h2>${section.categorie}</h2><span>${section.items.length} notion${section.items.length > 1 ? "s" : ""}</span></div><div class="cards-grid">${cards}</div></section>`;
    }).join("") : '<p class="empty-state">Aucune notion ne correspond à ta recherche.</p>';
    nav.querySelectorAll("a").forEach((link) => {
      link.hidden = !sectionsVisible.some((section) => `#${activeKey}-${slug(section.categorie)}` === link.getAttribute("href"));
    });
    sections.querySelectorAll(".concept-card").forEach((card) => {
      card.addEventListener("click", () => {
        const item = allItems.find((entry) => entry.nom === card.dataset.name && entry.categorie === card.dataset.category);
        const id = card.dataset.id;
        window.LearnHubModal.open(item, item.categorie, learned.has(id), () => {
          const updated = readLearned(activeKey);
          if (updated.has(id)) updated.delete(id); else updated.add(id);
          localStorage.setItem(`learnhub-learned-${activeKey}`, JSON.stringify([...updated]));
          render();
          return updated.has(id);
        });
      });
    });
    updateProgress(allItems, learned, activeKey);
    setActiveTab();
  }

  function updateProgress(items, learned, key) {
    const count = items.filter((item) => learned.has(idFor(key, item.categorie, item))).length;
    const percent = items.length ? Math.round(count / items.length * 100) : 0;
    document.querySelectorAll(".progress-label").forEach((label) => { label.textContent = `${count} / ${items.length} notions apprises`; });
    document.querySelectorAll(".progress-track").forEach((track) => {
      track.setAttribute("aria-valuenow", String(percent));
      track.querySelector("span").style.width = `${percent}%`;
    });
  }

  tabs.forEach((tab) => tab.addEventListener("click", () => {
    activeKey = tab.dataset.language;
    const url = new URL(location.href);
    url.searchParams.set("lang", activeKey);
    history.replaceState(null, "", url);
    render();
  }));
  search.addEventListener("input", render);
  level.addEventListener("change", render);
  const params = new URLSearchParams(location.search);
  if (params.has("q")) search.value = params.get("q");
  render();

})();
