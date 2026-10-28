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
          .filter((item) => `${item.nom} ${window.LearnHubI18n.itemName(item.nom)} ${window.LearnHubI18n.content(item, "utilite", key, section.categorie)} ${section.categorie} ${window.LearnHubI18n.category(section.categorie)}`.toLocaleLowerCase().includes(query))
          .map((item) => ({ ...item, categorie: section.categorie, key })))).slice(0, 8);
        results.innerHTML = matches.length ? matches.map((item) => {
          const isWeb = ["html", "css", "javascript"].includes(item.key);
          const courseName = { python: "Python", kali: "Kali Linux", html: "HTML", css: "CSS", javascript: "JavaScript" }[item.key];
          const href = isWeb ? `web.html?lang=${item.key}&q=${encodeURIComponent(item.nom)}` : `${item.key}.html?q=${encodeURIComponent(item.nom)}`;
          const language = window.LearnHubI18n.language();
          const courseLabel = language === "ar" ? "دورة" : language === "en" ? "Course" : "Cours";
          return `<a class="result-link" href="${href}"><strong>${window.LearnHubI18n.itemName(item.nom)}</strong><span>${courseLabel} ${courseName} · ${window.LearnHubI18n.category(item.categorie)} — ${window.LearnHubI18n.content(item, "utilite", item.key, item.categorie)}</span></a>`;
        }).join("") : `<p class="search-empty">${window.LearnHubI18n.get("noResults")}</p>`;
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
  const readFavorites = (key) => {
    try { return new Set(JSON.parse(localStorage.getItem(`learnhub-favorites-${key}`) || "[]")); }
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
    const favorites = readFavorites(activeKey);
    const allItems = course.flatMap((section) => section.items.map((item) => ({ ...item, categorie: section.categorie })));
    const query = search.value.trim().toLocaleLowerCase();
    const selectedLevel = level.value;
    nav.innerHTML = course.map((section) => `<a href="#${activeKey}-${slug(section.categorie)}">${window.LearnHubI18n.category(section.categorie)}</a>`).join("");
    const sectionsVisible = course.map((section) => {
      const items = section.items.filter((item) => {
        const searchable = `${item.nom} ${window.LearnHubI18n.itemName(item.nom)} ${window.LearnHubI18n.content(item, "utilite", activeKey, section.categorie)} ${window.LearnHubI18n.content(item, "exemple", activeKey, section.categorie)} ${section.categorie} ${window.LearnHubI18n.category(section.categorie)}`.toLocaleLowerCase();
        return (!query || searchable.includes(query)) && (selectedLevel === "all" || item.niveau === selectedLevel);
      });
      return { ...section, items };
    }).filter((section) => section.items.length);
    sections.innerHTML = sectionsVisible.length ? sectionsVisible.map((section) => {
      const cards = section.items.map((item) => {
        const id = idFor(activeKey, section.categorie, item);
        const language = window.LearnHubI18n.language();
        const openLabel = language === "ar" ? "افتح شرح" : language === "en" ? "Open lesson for" : "Ouvrir la fiche";
        const learnedLabel = language === "ar" ? ", تم تعلمه" : language === "en" ? ", learned" : ", notion apprise";
        const checkLabel = language === "ar" ? "تم تعلمه" : language === "en" ? "Learned" : "Apprise";
        const favLabel = language === "ar" ? "إضافة للمفضلات" : language === "en" ? "Add to favorites" : "Ajouter aux favoris";
        const favLabelRemove = language === "ar" ? "إزالة من المفضلات" : language === "en" ? "Remove from favorites" : "Retirer des favoris";
        const displayName = window.LearnHubI18n.itemName(item.nom);
        const isFav = favorites.has(id);
        return `<button class="concept-card${learned.has(id) ? " is-learned" : ""}" type="button" data-id="${id}" data-category="${section.categorie}" data-name="${item.nom}" aria-label="${openLabel} ${displayName}${learned.has(id) ? learnedLabel : ""}"><span class="concept-name">${displayName}</span><span class="concept-bottom"><span class="level-badge">${window.LearnHubI18n.level(item.niveau)}</span>${learned.has(id) ? `<span class="learned-mark" aria-label="${checkLabel}">✓</span>` : ""}</span><span class="favorite-btn${isFav ? " is-favorite" : ""}" data-id="${id}" aria-label="${isFav ? favLabelRemove : favLabel}">${isFav ? "★" : "☆"}</span></button>`;
      }).join("");
      const language = window.LearnHubI18n.language();
      const countLabel = language === "ar" ? "مفهوم" : language === "en" ? "concepts" : `notion${section.items.length > 1 ? "s" : ""}`;
      const sectionIds = section.items.map((item) => idFor(activeKey, section.categorie, item));
      const sectionComplete = sectionIds.length > 0 && sectionIds.every((id) => learned.has(id));
      const completeLabel = language === "ar" ? "مكتمل" : language === "en" ? "Completed" : "Complété";
      const quizLabel = language === "ar" ? "اختبار" : language === "en" ? "Quiz" : "Quiz";
      return `<section class="category-section" id="${activeKey}-${slug(section.categorie)}"><div class="section-heading"><h2>${window.LearnHubI18n.category(section.categorie)}</h2><span>${section.items.length} ${countLabel}</span>${sectionComplete ? `<span class="badge badge-gold fade-in"><span class="badge-icon">🏆</span>${completeLabel}</span>` : ""}<button class="quiz-btn" type="button" data-category="${section.categorie}" aria-label="${quizLabel}">${quizLabel}</button></div><div class="cards-grid">${cards}</div></section>`;
    }).join("") : `<p class="empty-state">${window.LearnHubI18n.get("noResults")}</p>`;
    nav.querySelectorAll("a").forEach((link) => {
      link.hidden = !sectionsVisible.some((section) => `#${activeKey}-${slug(section.categorie)}` === link.getAttribute("href"));
    });
    sections.querySelectorAll(".concept-card").forEach((card) => {
      card.addEventListener("click", () => {
        const item = allItems.find((entry) => entry.nom === card.dataset.name && entry.categorie === card.dataset.category);
        const id = card.dataset.id;
        const localizedItem = { ...item, nom: window.LearnHubI18n.itemName(item.nom), utilite: window.LearnHubI18n.content(item, "utilite", activeKey, item.categorie), exemple: window.LearnHubI18n.content(item, "exemple", activeKey, item.categorie), attention: window.LearnHubI18n.content(item, "attention", activeKey, item.categorie) };
        window.LearnHubModal.open(localizedItem, item.categorie, learned.has(id), () => {
          const updated = readLearned(activeKey);
          if (updated.has(id)) updated.delete(id); else updated.add(id);
          localStorage.setItem(`learnhub-learned-${activeKey}`, JSON.stringify([...updated]));
          render();
          return updated.has(id);
        }, activeKey, id);
      });
    });
    sections.querySelectorAll(".favorite-btn").forEach((btn) => {
      btn.addEventListener("click", (event) => {
        event.stopPropagation();
        const id = btn.dataset.id;
        const updated = new Set(favorites);
        if (updated.has(id)) updated.delete(id); else updated.add(id);
        localStorage.setItem(`learnhub-favorites-${activeKey}`, JSON.stringify([...updated]));
        btn.classList.toggle("is-favorite", updated.has(id));
        btn.textContent = updated.has(id) ? "★" : "☆";
      });
    });
    sections.querySelectorAll(".quiz-btn").forEach((btn) => {
      btn.addEventListener("click", (event) => {
        event.stopPropagation();
        if (window.LearnHubQuiz) {
          window.LearnHubQuiz.open(page === "web" ? "web" : activeKey, null, window.LearnHubI18n.language());
        } else {
          alert("Le module Quiz est encore en chargement. Rafraîchis la page et réessaie.");
        }
      });
    });
    updateProgress(allItems, learned, activeKey);
    setActiveTab();
  }

  function updateProgress(items, learned, key) {
    const count = items.filter((item) => learned.has(idFor(key, item.categorie, item))).length;
    const percent = items.length ? Math.round(count / items.length * 100) : 0;
    document.querySelectorAll(".progress-label").forEach((label) => {
      const language = window.LearnHubI18n.language();
      label.textContent = language === "ar" ? `${count} من ${items.length} مفهوم تم تعلمه` : language === "en" ? `${count} of ${items.length} concepts learned` : `${count} / ${items.length} notions apprises`;
    });
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
  window.addEventListener("learnhublanguagechange", render);
  const params = new URLSearchParams(location.search);
  if (params.has("q")) search.value = params.get("q");
  render();

})();
