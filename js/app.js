(() => {
  const page = document.body?.dataset?.page;
  const slug = window.LearnHubUtils?.slug || ((v) => String(v || "").normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, ""));
  const legacySlug = window.LearnHubUtils?.legacySlug || slug;
  const esc = window.LearnHubUtils?.escapeHTML || ((value) => String(value ?? "").replace(/[&<>"']/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[char]));
  const fold = (value) => String(value ?? "").normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLocaleLowerCase();
  const storage = window.LearnHubStorage || {
    get: (key) => { try { return localStorage.getItem(key); } catch { return null; } },
    set: (key, value) => { try { localStorage.setItem(key, value); return true; } catch { return false; } }
  };

  const idFor = (key, category, item) => `${key}-${slug(category)}-${slug(item.nom)}`;
  const legacyIdFor = (key, category, item) => `${key}-${legacySlug(category)}-${legacySlug(item.nom)}`;

  const readLearned = (key) => {
    try {
      const value = JSON.parse(storage.get(`learnhub-learned-${key}`) || "[]");
      return new Set(Array.isArray(value) ? value.filter((id) => typeof id === "string") : []);
    } catch {
      return new Set();
    }
  };

  const readFavorites = (key) => {
    try {
      const value = JSON.parse(storage.get(`learnhub-favorites-${key}`) || "[]");
      return new Set(Array.isArray(value) ? value.filter((id) => typeof id === "string") : []);
    } catch {
      return new Set();
    }
  };

  const isItemLearned = (learnedSet, key, category, item) => {
    return learnedSet.has(idFor(key, category, item)) || learnedSet.has(legacyIdFor(key, category, item));
  };

  const isItemFavorite = (favSet, key, category, item) => {
    return favSet.has(idFor(key, category, item)) || favSet.has(legacyIdFor(key, category, item));
  };

  // ==========================================
  // HOME PAGE LOGIC
  // ==========================================
  if (page === "home") {
    const globalSearch = document.querySelector("#global-search");
    const results = document.querySelector(".search-results");

    const updateHomeHighlights = () => {
      const dataSrc = window.data || (typeof data !== "undefined" ? data : null);
      if (!dataSrc) return;
      const countFor = (keys) => keys.reduce((sum, key) => sum + (dataSrc[key] || []).reduce((n, section) => n + section.items.length, 0), 0);
      const language = window.LearnHubI18n?.language() || "fr";
      const labels = {
        fr: { concepts: "notions", kali: "outils & commandes", lessons: "fiches interactives", features: [
          ["Explications, syntaxe & exemples", "Fiches courtes pour apprendre une notion à la fois"],
          ["Pratique en ligne sans installation", "Un terminal simulé pour explorer les commandes"],
          ["Exécute du code dans le navigateur", "Un éditeur Python avec le moteur Pyodide"],
          ["Pages mises en cache après la visite", "PWA et progression enregistrée localement"]
        ] },
        en: { concepts: "concepts", kali: "tools & commands", lessons: "interactive lessons", features: [
          ["Explanations, syntax and examples", "Short lessons to learn one concept at a time"],
          ["Practice online without installing tools", "A simulated terminal for Linux commands"],
          ["Run code in your browser", "A Python playground powered by Pyodide"],
          ["Pages cached after your first visit", "PWA support and locally saved progress"]
        ] },
        ar: { concepts: "مفاهيم", kali: "أدوات وأوامر", lessons: "دروس تفاعلية", features: [
          ["شرح وصياغة وأمثلة", "دروس قصيرة لتعلّم مفهوم واحد في كل مرة"],
          ["تدرّب عبر الإنترنت دون تثبيت أدوات", "طرفية محاكاة لاستكشاف أوامر لينكس"],
          ["شغّل التعليمات البرمجية في المتصفح", "محرر بايثون يعمل بواسطة Pyodide"],
          ["تُخزّن الصفحات بعد الزيارة الأولى", "دعم PWA وتقدم محفوظ محلياً"]
        ] }
      };
      const copy = labels[language] || labels.fr;
      const countLabels = {
        "web-path": `${countFor(["html", "css", "javascript"])} ${copy.concepts}`,
        "python-path": `${countFor(["python"])} ${copy.concepts}`,
        "kali-path": `${countFor(["kali"])} ${copy.kali}`
      };
      Object.entries(countLabels).forEach(([className, label]) => {
        const badge = document.querySelector(`.${className} .path-level-tag`);
        if (badge) badge.textContent = label;
      });
      const total = countFor(["python", "kali", "html", "css", "javascript"]);
      const featurePills = document.querySelectorAll(".feature-pill");
      if (featurePills[0]) featurePills[0].querySelector("strong").textContent = `${total} ${copy.lessons}`;
      featurePills.forEach((pill, index) => {
        const content = copy.features[index];
        if (!content) return;
        const [title, description] = pill.querySelectorAll("strong, span:not(.feature-pill-icon)");
        if (title) title.textContent = index === 0 ? `${total} ${copy.lessons}` : content[0];
        if (description) description.textContent = content[1];
      });
    };

    updateHomeHighlights();
    window.addEventListener("learnhublanguagechange", updateHomeHighlights);

    if (globalSearch && results) {
      const showResults = () => {
        const query = fold(globalSearch.value.trim());
        if (!query) {
          results.innerHTML = "";
          return;
        }

        const dataSrc = window.data || (typeof data !== "undefined" ? data : null);
        if (!dataSrc) return;

        const matches = ["python", "kali", "html", "css", "javascript"].flatMap((key) => {
          const course = dataSrc[key] || [];
          return course.flatMap((section) => {
            return section.items
              .filter((item) => {
                const localizedName = window.LearnHubI18n?.itemName(item.nom) || item.nom;
                const localizedUtilite = window.LearnHubI18n?.content(item, "utilite", key, section.categorie) || item.utilite;
                const localizedCat = window.LearnHubI18n?.category(section.categorie) || section.categorie;
                const localizedExample = window.LearnHubI18n?.content(item, "exemple", key, section.categorie) || item.exemple;
                const searchable = fold(`${item.nom} ${localizedName} ${localizedUtilite} ${localizedExample} ${item.syntaxe || ""} ${section.categorie} ${localizedCat}`);
                return searchable.includes(query);
              })
              .map((item) => ({ ...item, categorie: section.categorie, key }));
          });
        }).slice(0, 8);

        const language = window.LearnHubI18n?.language() || "fr";
        const courseLabels = {
          python: { label: "Python", badgeClass: "badge-python" },
          kali: { label: "Kali Linux", badgeClass: "badge-kali" },
          html: { label: "HTML", badgeClass: "badge-web" },
          css: { label: "CSS", badgeClass: "badge-web" },
          javascript: { label: "JavaScript", badgeClass: "badge-web" }
        };

        if (matches.length) {
          results.innerHTML = matches.map((item) => {
            const isWeb = ["html", "css", "javascript"].includes(item.key);
            const courseInfo = courseLabels[item.key] || { label: item.key, badgeClass: "" };
            const href = isWeb
              ? `web.html?lang=${item.key}&q=${encodeURIComponent(item.nom)}`
              : `${item.key}.html?q=${encodeURIComponent(item.nom)}`;

            const displayName = window.LearnHubI18n?.itemName(item.nom) || item.nom;
            const displayCat = window.LearnHubI18n?.category(item.categorie) || item.categorie;
            const displayDesc = window.LearnHubI18n?.content(item, "utilite", item.key, item.categorie) || item.utilite;

            return `
              <a class="result-link" href="${esc(href)}">
                <div class="result-header">
                  <span class="result-course-badge ${courseInfo.badgeClass}">${esc(courseInfo.label)}</span>
                  <span class="result-cat">${esc(displayCat)}</span>
                  <span class="level-badge">${esc(window.LearnHubI18n?.level(item.niveau) || item.niveau)}</span>
                </div>
                <strong class="result-title"><code>${esc(displayName)}</code></strong>
                <p class="result-desc">${esc(displayDesc)}</p>
              </a>`;
          }).join("");
        } else {
          results.innerHTML = `<p class="search-empty">${window.LearnHubI18n?.get("noResults") || "Aucun résultat trouvé."}</p>`;
        }
      };

      globalSearch.addEventListener("input", showResults);
      window.addEventListener("learnhublanguagechange", showResults);
      document.querySelectorAll(".search-tag").forEach((button) => {
        button.addEventListener("click", () => {
          globalSearch.value = button.dataset.searchTerm || "";
          globalSearch.dispatchEvent(new Event("input", { bubbles: true }));
          globalSearch.focus();
        });
      });
      globalSearch.form?.addEventListener("submit", (event) => {
        event.preventDefault();
        showResults();
        results.querySelector("a")?.click();
      });
    }
    return;
  }

  // ==========================================
  // COURSE PAGES LOGIC (python, kali, web)
  // ==========================================
  const languageKeys = page === "web" ? ["html", "css", "javascript"] : [page];
  let activeKey = page === "web" ? (new URLSearchParams(location.search).get("lang") || "html") : page;
  if (!languageKeys.includes(activeKey)) activeKey = languageKeys[0];

  const dataSrc = window.data || (typeof data !== "undefined" ? data : null);
  if (!dataSrc || !dataSrc[activeKey]) return;

  const search = document.querySelector(".item-search");
  const level = document.querySelector(".level-filter");
  const nav = document.querySelector(".category-nav");
  const sections = document.querySelector(".card-sections");
  const tabs = document.querySelectorAll("[data-language]");

  let onlyFavoritesFilter = false;

  const setActiveTab = () => {
    tabs.forEach((tab) => {
      const active = tab.dataset.language === activeKey;
      tab.classList.toggle("active", active);
      tab.setAttribute("aria-selected", String(active));
      tab.tabIndex = active ? 0 : -1;
    });
    const panel = document.querySelector("#course-content");
    if (panel) panel.setAttribute("aria-labelledby", `tab-${activeKey}`);
  };

  const syncActiveCategory = () => {
    nav?.querySelectorAll(".cat-nav-link").forEach((link) => {
      const active = link.getAttribute("href") === location.hash;
      link.classList.toggle("active", active);
      if (active) link.setAttribute("aria-current", "location");
      else link.removeAttribute("aria-current");
    });
  };

  nav?.addEventListener("click", (event) => {
    const link = event.target.closest(".cat-nav-link");
    if (!link) return;
    nav.querySelectorAll(".cat-nav-link").forEach((candidate) => candidate.classList.toggle("active", candidate === link));
  });
  window.addEventListener("hashchange", syncActiveCategory);

  // Add a "Favorites only" filter toggle button into toolbar if not present
  const setupToolbarExtras = () => {
    const toolbar = document.querySelector(".toolbar");
    if (!toolbar || toolbar.querySelector(".fav-filter-toggle")) return;

    const favToggle = document.createElement("button");
    favToggle.type = "button";
    favToggle.className = "fav-filter-toggle";
    favToggle.innerHTML = `<span class="fav-icon">★</span> <span class="fav-filter-text">Favoris</span>`;
    favToggle.setAttribute("aria-pressed", "false");
    favToggle.setAttribute("title", "Afficher uniquement mes notions favorites");

    favToggle.addEventListener("click", () => {
      onlyFavoritesFilter = !onlyFavoritesFilter;
      favToggle.classList.toggle("active", onlyFavoritesFilter);
      favToggle.setAttribute("aria-pressed", String(onlyFavoritesFilter));
      render();
    });

    toolbar.appendChild(favToggle);
  };

  const resetFilters = () => {
    if (search) search.value = "";
    if (level) level.value = "all";
    onlyFavoritesFilter = false;
    const favoriteToggle = document.querySelector(".fav-filter-toggle");
    favoriteToggle?.classList.remove("active");
    favoriteToggle?.setAttribute("aria-pressed", "false");
  };

  setupToolbarExtras();

  function render() {
    const course = dataSrc[activeKey];
    if (!course) return;

    const learned = readLearned(activeKey);
    const favorites = readFavorites(activeKey);
    const allItems = course.flatMap((section) => section.items.map((item) => ({ ...item, categorie: section.categorie })));
    const query = search ? fold(search.value.trim()) : "";
    const selectedLevel = level ? level.value : "all";

    // Category navigation links
    if (nav) {
      nav.innerHTML = course.map((section) => {
        const catSlug = slug(section.categorie);
        const sectionItems = section.items;
        const complete = sectionItems.length > 0 && sectionItems.every((it) => isItemLearned(learned, activeKey, section.categorie, it));
        const activeClass = location.hash === `#${activeKey}-${catSlug}` ? " active" : "";
        return `
          <a class="cat-nav-link${activeClass}" href="#${activeKey}-${catSlug}">
            <span class="cat-nav-text">${esc(window.LearnHubI18n?.category(section.categorie) || section.categorie)}</span>
            <span class="cat-nav-badge">${complete ? "✓" : sectionItems.length}</span>
          </a>`;
      }).join("");
    }

    // Filtered sections
    const sectionsVisible = course.map((section) => {
      const items = section.items.filter((item) => {
        const locName = window.LearnHubI18n?.itemName(item.nom) || item.nom;
        const locUtil = window.LearnHubI18n?.content(item, "utilite", activeKey, section.categorie) || item.utilite;
        const locEx = window.LearnHubI18n?.content(item, "exemple", activeKey, section.categorie) || item.exemple;
        const locCat = window.LearnHubI18n?.category(section.categorie) || section.categorie;

        const locAttention = window.LearnHubI18n?.content(item, "attention", activeKey, section.categorie) || item.attention;
        const searchable = fold(`${item.nom} ${locName} ${locUtil} ${locEx} ${locAttention} ${item.syntaxe || ""} ${section.categorie} ${locCat}`);
        const matchesQuery = !query || searchable.includes(query);
        const matchesLevel = selectedLevel === "all" || item.niveau === selectedLevel;
        const matchesFav = !onlyFavoritesFilter || isItemFavorite(favorites, activeKey, section.categorie, item);

        return matchesQuery && matchesLevel && matchesFav;
      });
      return { ...section, items };
    }).filter((section) => section.items.length > 0);

    const language = window.LearnHubI18n?.language() || "fr";
    const favoriteLabels = {
      ar: { label: "المفضلة", title: "عرض المفاهيم المفضلة فقط" },
      en: { label: "Favorites", title: "Show only favorite concepts" },
      fr: { label: "Favoris", title: "Afficher uniquement mes notions favorites" }
    };
    const favoriteText = favoriteLabels[language] || favoriteLabels.fr;
    const favoriteToggle = document.querySelector(".fav-filter-toggle");
    if (favoriteToggle) {
      const label = favoriteToggle.querySelector(".fav-filter-text");
      if (label) label.textContent = favoriteText.label;
      favoriteToggle.title = favoriteText.title;
      favoriteToggle.setAttribute("aria-label", favoriteText.title);
    }

    if (sections) {
      sections.innerHTML = sectionsVisible.length ? sectionsVisible.map((section) => {
        const catSlug = slug(section.categorie);
        const fullSection = course.find((candidate) => candidate.categorie === section.categorie) || section;
        const sectionComplete = fullSection.items.length > 0 && fullSection.items.every((item) => isItemLearned(learned, activeKey, section.categorie, item));

        const cards = section.items.map((item) => {
          const id = idFor(activeKey, section.categorie, item);
          const isLearned = isItemLearned(learned, activeKey, section.categorie, item);
          const isFav = isItemFavorite(favorites, activeKey, section.categorie, item);
          const displayName = window.LearnHubI18n?.itemName(item.nom) || item.nom;
          const displayUtil = window.LearnHubI18n?.content(item, "utilite", activeKey, section.categorie) || item.utilite;

          const openLabel = language === "ar" ? "افتح شرح" : language === "en" ? "Open lesson for" : "Ouvrir la fiche";
          const checkLabel = language === "ar" ? "تم تعلمه" : language === "en" ? "Learned" : "Apprise";
          const favLabel = language === "ar" ? "إضافة للمفضلات" : language === "en" ? "Add to favorites" : "Ajouter aux favoris";
          const favLabelRemove = language === "ar" ? "إزالة من المفضلات" : language === "en" ? "Remove from favorites" : "Retirer des favoris";

          return `
            <article class="concept-card${isLearned ? " is-learned" : ""}${isFav ? " is-favorited" : ""}" data-card-id="${id}">
              <div class="card-top-row">
              <span class="card-cat-tag">${esc(window.LearnHubI18n?.category(section.categorie) || section.categorie)}</span>
                <button class="favorite-btn${isFav ? " is-favorite" : ""}" type="button" data-id="${esc(id)}" aria-pressed="${isFav}" aria-label="${isFav ? favLabelRemove : favLabel}">
                  ${isFav ? "★" : "☆"}
                </button>
              </div>
              <button class="concept-open" type="button" data-id="${esc(id)}" data-category="${esc(section.categorie)}" data-name="${esc(item.nom)}" aria-label="${openLabel} ${esc(displayName)}">
                <div class="concept-title-row">
                  <span class="concept-name"><code>${esc(displayName)}</code></span>
                </div>
                <p class="concept-snippet">${esc(displayUtil)}</p>
                <div class="concept-bottom">
                  <span class="level-badge level-${slug(item.niveau)}">${esc(window.LearnHubI18n?.level(item.niveau) || item.niveau)}</span>
                  ${isLearned ? `<span class="learned-mark" aria-label="${checkLabel}"><span class="check-icon">✓</span> ${checkLabel}</span>` : `<span class="learn-cue">Découvrir →</span>`}
                </div>
              </button>
            </article>`;
        }).join("");

        const countLabel = language === "ar" ? "مفهوم" : language === "en" ? "concepts" : `notion${section.items.length > 1 ? "s" : ""}`;
        const completeLabel = language === "ar" ? "مكتمل" : language === "en" ? "Completed" : "Complété";
        const quizLabel = language === "ar" ? "اختبار القسم" : language === "en" ? "Section Quiz" : "Quiz";

        return `
          <section class="category-section" id="${activeKey}-${catSlug}">
            <div class="section-heading">
              <div class="heading-left">
                <h2>${esc(window.LearnHubI18n?.category(section.categorie) || section.categorie)}</h2>
                <span class="section-count-badge">${section.items.length} ${countLabel}</span>
                ${sectionComplete ? `<span class="badge badge-gold fade-in"><span class="badge-icon">🏆</span> ${completeLabel}</span>` : ""}
              </div>
              <button class="quiz-btn" type="button" data-category="${esc(section.categorie)}" aria-label="${quizLabel}">
                <span class="quiz-btn-icon">⚡</span> ${quizLabel}
              </button>
            </div>
            <div class="cards-grid">${cards}</div>
          </section>`;
      }).join("") : `
        <div class="empty-state">
          <div class="empty-icon">🔍</div>
          <h3>${esc(window.LearnHubI18n?.get("noResults") || "Aucune notion trouvée")}</h3>
          <p>${language === "ar" ? "حاول تغيير البحث أو الفلاتر." : language === "en" ? "Try changing your search or filters." : "Essaie de modifier tes critères de recherche ou réinitialise les filtres."}</p>
          <button class="clear-filters-btn" type="button">${language === "ar" ? "إعادة تعيين الفلاتر" : language === "en" ? "Clear filters" : "Réinitialiser les filtres"}</button>
        </div>`;
    }

    // Nav active link states
    if (nav) {
      nav.querySelectorAll("a").forEach((link) => {
        link.hidden = !sectionsVisible.some((section) => `#${activeKey}-${slug(section.categorie)}` === link.getAttribute("href"));
      });
      syncActiveCategory();
    }

    // Modal open listeners
    sections?.querySelectorAll(".concept-open").forEach((card) => {
      card.addEventListener("click", () => {
        const item = allItems.find((entry) => entry.nom === card.dataset.name && entry.categorie === card.dataset.category);
        if (!item) return;

        const id = card.dataset.id;
        const currentLearned = readLearned(activeKey);
        const isLearnedNow = currentLearned.has(id) || currentLearned.has(legacyIdFor(activeKey, item.categorie, item));

        const localizedItem = {
          ...item,
          originalName: item.nom,
          nom: window.LearnHubI18n?.itemName(item.nom) || item.nom,
          utilite: window.LearnHubI18n?.content(item, "utilite", activeKey, item.categorie) || item.utilite,
          exemple: window.LearnHubI18n?.content(item, "exemple", activeKey, item.categorie) || item.exemple,
          attention: window.LearnHubI18n?.content(item, "attention", activeKey, item.categorie) || item.attention
        };

        window.LearnHubModal?.open(localizedItem, item.categorie, isLearnedNow, () => {
          const freshLearned = readLearned(activeKey);
          const legacyId = legacyIdFor(activeKey, item.categorie, item);
          const wasLearned = isItemLearned(freshLearned, activeKey, item.categorie, item);
          if (wasLearned) {
            freshLearned.delete(id);
            freshLearned.delete(legacyId);
          } else {
            freshLearned.add(id);
          }
          storage.set(`learnhub-learned-${activeKey}`, JSON.stringify([...freshLearned]));
          render();
          return !wasLearned;
        }, activeKey, id);
      });
    });

    // Favorite click listeners (FIXED: reads fresh every click)
    sections?.querySelectorAll(".favorite-btn").forEach((btn) => {
      btn.addEventListener("click", (event) => {
        event.stopPropagation();
        const id = btn.dataset.id;
        if (!id) return;

        const freshFavorites = readFavorites(activeKey);
        const favoriteItem = allItems.find((item) => idFor(activeKey, item.categorie, item) === id);
        const legacyFavoriteId = favoriteItem ? legacyIdFor(activeKey, favoriteItem.categorie, favoriteItem) : null;
        const currentlyFavorite = freshFavorites.has(id) || (legacyFavoriteId && freshFavorites.has(legacyFavoriteId));

        if (currentlyFavorite) {
          freshFavorites.delete(id);
          if (legacyFavoriteId) freshFavorites.delete(legacyFavoriteId);
        } else {
          freshFavorites.add(id);
        }

        storage.set(`learnhub-favorites-${activeKey}`, JSON.stringify([...freshFavorites]));

        const isFav = freshFavorites.has(id);
        btn.classList.toggle("is-favorite", isFav);
        btn.textContent = isFav ? "★" : "☆";

        const favLabel = language === "ar" ? "إضافة للمفضلات" : language === "en" ? "Add to favorites" : "Ajouter aux favoris";
        const favLabelRemove = language === "ar" ? "إزالة من المفضلات" : language === "en" ? "Remove from favorites" : "Retirer des favoris";
        btn.setAttribute("aria-label", isFav ? favLabelRemove : favLabel);
        btn.setAttribute("aria-pressed", String(isFav));

        const cardArticle = btn.closest(".concept-card");
        cardArticle?.classList.toggle("is-favorited", isFav);

        if (onlyFavoritesFilter) {
          render();
        }
      });
    });

    // Quiz button listeners (Category Quiz)
    sections?.querySelectorAll(".quiz-btn").forEach((btn) => {
      btn.addEventListener("click", (event) => {
        event.stopPropagation();
        const cat = btn.dataset.category;
        if (window.LearnHubQuiz) {
          window.LearnHubQuiz.open(activeKey, cat, window.LearnHubI18n?.language() || "fr");
        } else {
          alert("Le module Quiz est en cours de chargement. Merci de patienter un instant.");
        }
      });
    });

    // Clear filters button in empty state
    sections?.querySelector(".clear-filters-btn")?.addEventListener("click", () => {
      resetFilters();
      render();
    });

    updateProgress(allItems, learned, activeKey);
    setActiveTab();
  }

  function updateProgress(items, learned, key) {
    const learnedCount = items.filter((item) => isItemLearned(learned, key, item.categorie, item)).length;
    const totalCount = items.length;
    const percent = totalCount ? Math.round((learnedCount / totalCount) * 100) : 0;
    const language = window.LearnHubI18n?.language() || "fr";

    document.querySelectorAll(".progress-label").forEach((label) => {
      label.textContent = language === "ar"
        ? `${learnedCount} من ${totalCount} مفهوم تم تعلمه`
        : language === "en"
        ? `${learnedCount} of ${totalCount} concepts learned`
        : `${learnedCount} / ${totalCount} notions apprises (${percent}%)`;
    });

    document.querySelectorAll(".progress-track").forEach((track) => {
      track.setAttribute("aria-valuenow", String(percent));
      track.setAttribute("aria-label", language === "ar" ? "التقدم في التعلم" : language === "en" ? "Learning progress" : "Progression d’apprentissage");
      track.setAttribute("aria-valuetext", `${learnedCount} sur ${totalCount}`);
      const fillSpan = track.querySelector("span");
      if (fillSpan) fillSpan.style.width = `${percent}%`;
    });
  }

  const activateTab = (tab) => {
    activeKey = tab.dataset.language;
    const url = new URL(location.href);
    url.searchParams.set("lang", activeKey);
    history.replaceState(null, "", url);
    render();
  };

  tabs.forEach((tab, index) => {
    tab.addEventListener("click", () => activateTab(tab));
    tab.addEventListener("keydown", (event) => {
      if (!["ArrowLeft", "ArrowRight", "Home", "End"].includes(event.key)) return;
      event.preventDefault();
      const direction = window.LearnHubI18n?.isArabic?.() ? -1 : 1;
      const nextIndex = event.key === "Home" ? 0 : event.key === "End" ? tabs.length - 1 : (index + (event.key === "ArrowRight" ? direction : -direction) + tabs.length) % tabs.length;
      tabs[nextIndex].focus();
      activateTab(tabs[nextIndex]);
    });
  });

  search?.addEventListener("input", render);
  level?.addEventListener("change", render);

  window.addEventListener("learnhublanguagechange", render);
  window.addEventListener("learnhubstatechange", render);
  window.addEventListener("learnhubfavoritetoggle", (event) => {
    if (event.detail?.key === activeKey && onlyFavoritesFilter) render();
  });
  window.addEventListener("storage", (event) => {
    if (event.key?.startsWith("learnhub-learned-") || event.key?.startsWith("learnhub-favorites-")) render();
  });

  window.addEventListener("learnhubopenconcept", (event) => {
    const { key, category, name } = event.detail || {};
    if (key !== activeKey || !category || !name || !sections) return;

    const findCard = () => [...sections.querySelectorAll(".concept-open")].find((card) => (
      card.dataset.name === name && card.dataset.category === category
    ));
    let card = findCard();
    if (!card) {
      resetFilters();
      const url = new URL(location.href);
      url.searchParams.delete("q");
      url.searchParams.delete("open");
      history.replaceState(null, "", url);
      render();
      card = findCard();
    }

    if (card) {
      card.scrollIntoView({ behavior: "smooth", block: "center" });
      card.click();
    }
  });

  // Read URL query parameter
  const params = new URLSearchParams(location.search);
  if (params.has("q") && search) {
    search.value = params.get("q");
  }

  render();

  // If search query matched an exact notion, automatically highlight & open it
  if (params.has("q")) {
    const qTerm = params.get("q").toLowerCase();
    window.setTimeout(() => {
      const matchCard = document.querySelector(`.concept-open[data-name="${CSS.escape(params.get("q"))}"]`);
      if (matchCard) {
        matchCard.scrollIntoView({ behavior: "smooth", block: "center" });
        matchCard.classList.add("highlight-pulse");
        if (params.get("open") === "1" || params.has("q")) {
          matchCard.click();
        }
      }
    }, 250);
  }
})();
