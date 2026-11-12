(() => {
  const esc = (value) => String(value ?? "").replace(/[&<>"']/g, (char) => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
  })[char]);

  const modalId = "concept-modal";
  let previousFocus = null;
  let previousFocusId = null;
  const storage = window.LearnHubStorage || {
    get: (key) => { try { return localStorage.getItem(key); } catch { return null; } },
    set: (key, value) => { try { localStorage.setItem(key, value); return true; } catch { return false; } }
  };
  const legacySlug = window.LearnHubUtils?.legacySlug || ((value) => String(value || "").normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, ""));

  function close() {
    const backdrop = document.querySelector(".modal-backdrop");
    if (!backdrop) return;
    backdrop.classList.add("modal-leaving");
    window.setTimeout(() => {
      backdrop.remove();
    }, 150);

    document.removeEventListener("keydown", onKeydown);
    const restoredFocus = previousFocus?.isConnected ? previousFocus : (previousFocusId ? document.querySelector(`.concept-open[data-id="${previousFocusId}"]`) : null);
    restoredFocus?.focus();
    previousFocusId = null;
  }

  function onKeydown(event) {
    const backdrop = document.querySelector(".modal-backdrop");
    if (window.LearnHubUtils?.isTopLayer && !window.LearnHubUtils.isTopLayer(backdrop)) return;
    if (event.key === "Escape") {
      event.preventDefault();
      event.stopImmediatePropagation();
      close();
      return;
    }
    if (event.key === "Tab") {
      const dialog = document.querySelector(".detail-modal");
      if (!dialog) return;
      const focusable = [...dialog.querySelectorAll("button:not(:disabled), a[href], input, textarea, select, [tabindex]:not([tabindex='-1'])")];
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
  }

  function open(item, category, learned, onToggle, key, id) {
    // Close existing modal if open
    document.querySelector(".modal-backdrop")?.remove();
    previousFocus = document.activeElement;
    previousFocusId = id || null;

    const language = window.LearnHubI18n?.language?.() || "fr";
    const arabic = language === "ar";
    const label = (key2, fallback) => window.LearnHubI18n?.get?.(key2) || fallback;

    let isFav = false;
    if (key && id) {
      try {
        const value = JSON.parse(storage.get(`learnhub-favorites-${key}`) || "[]");
        const legacyId = `${key}-${legacySlug(category)}-${legacySlug(item.originalName || item.nom)}`;
        isFav = Array.isArray(value) && (value.includes(id) || value.includes(legacyId));
      } catch {
        isFav = false;
      }
    }

    const favLabelRemove = arabic ? "إزالة من المفضلات" : language === "en" ? "Remove from favorites" : "Retirer des favoris";
    const favLabelAdd = arabic ? "إضافة للمفضلات" : language === "en" ? "Add to favorites" : "Ajouter aux favoris";

    // Detect language badge for code snippet
    const codeLang = key === "python" ? "Python" : key === "kali" ? "Bash / Terminal" : key === "css" ? "CSS" : key === "javascript" ? "JavaScript" : "HTML";

    const displaySyntaxe = item.syntaxe;

    // Navigation (prev / next) across items
    let prevItem = null;
    let nextItem = null;
    if (key && typeof window.data !== "undefined" && window.data[key]) {
      const allItems = window.data[key].flatMap((s) => s.items.map((it) => ({ ...it, sectionCategory: s.categorie })));
      const currentIndex = allItems.findIndex((it) => it.nom === (item.originalName || item.nom) && it.sectionCategory === category);
      if (currentIndex > 0) prevItem = allItems[currentIndex - 1];
      if (currentIndex >= 0 && currentIndex < allItems.length - 1) nextItem = allItems[currentIndex + 1];
    }

    const prevLabel = arabic ? "السابق" : language === "en" ? "Previous" : "Précédent";
    const nextLabel = arabic ? "التالي" : language === "en" ? "Next" : "Suivant";

    const backdrop = document.createElement("div");
    backdrop.className = "modal-backdrop";
    backdrop.innerHTML = `
      <section class="detail-modal" id="${modalId}" role="dialog" aria-modal="true" aria-labelledby="modal-title" tabindex="-1">
        <div class="modal-header-bar">
          <div class="modal-breadcrumbs">
            <span class="modal-badge-course">${esc(codeLang)}</span>
            <span class="modal-badge-category">${esc(window.LearnHubI18n?.category?.(category) || category)}</span>
          </div>
          <div class="modal-header-actions">
            <button class="favorite-btn modal-fav-btn${isFav ? " is-favorite" : ""}" type="button" aria-label="${isFav ? favLabelRemove : favLabelAdd}">
              ${isFav ? "★" : "☆"}
            </button>
            <button class="modal-close" type="button" aria-label="${label("close", "Fermer la fenêtre")}">×</button>
          </div>
        </div>

        <div class="modal-title-wrap">
          <h2 class="modal-title" id="modal-title"><code>${esc(item.nom)}</code></h2>
          <span class="level-badge level-${esc(String(item.niveau || '').toLowerCase())}">${esc(window.LearnHubI18n?.level?.(item.niveau) || item.niveau)}</span>
        </div>

        <div class="modal-card-section modal-purpose-card">
          <div class="modal-section-title"><span class="modal-icon">💡</span> ${label("modalPurpose", "À quoi ça sert ?")}</div>
          <p class="modal-copy">${esc(item.utilite)}</p>
        </div>

        <div class="modal-card-section modal-code-card">
          <div class="code-window-header">
            <div class="window-dots" aria-hidden="true">
              <span class="dot dot-red"></span>
              <span class="dot dot-yellow"></span>
              <span class="dot dot-green"></span>
            </div>
            <span class="window-lang-tag">${esc(codeLang)}</span>
            <button class="copy-button" type="button" aria-label="${label("copy", "Copier le code")}">
              <span class="copy-icon">📋</span> <span class="copy-text">${label("copy", "Copier")}</span>
            </button>
          </div>
          <div class="code-block"><pre><code>${esc(displaySyntaxe)}</code></pre></div>
        </div>

        <div class="modal-card-section modal-expl-card">
          <div class="modal-section-title"><span class="modal-icon">⚙️</span> ${label("modalExplanation", "Ce qui se passe :")}</div>
          <p class="modal-copy">${esc(item.exemple)}</p>
        </div>

        <aside class="modal-note">
          <div class="modal-note-title"><span class="modal-icon">⚠️</span> ${label("modalKnow", "À savoir & Bonnes pratiques")}</div>
          <p>${esc(item.attention)}</p>
        </aside>

        <div class="modal-actions-footer">
          <button class="learn-toggle${learned ? " done" : ""}" type="button">
            <span class="learn-toggle-icon">${learned ? "✓" : "○"}</span>
            <span class="learn-toggle-text">${learned ? label("learned", "✓ Notion apprise") : label("markLearned", "Marquer comme apprise")}</span>
          </button>
        </div>

        ${(prevItem || nextItem) ? `
          <div class="modal-nav-row">
            ${prevItem ? `<button class="modal-nav-btn modal-prev-btn" type="button" aria-label="${prevLabel}: ${esc(prevItem.nom)}">← ${prevLabel} <code>${esc(prevItem.nom)}</code></button>` : `<span class="modal-nav-placeholder"></span>`}
            ${nextItem ? `<button class="modal-nav-btn modal-next-btn" type="button" aria-label="${nextLabel}: ${esc(nextItem.nom)}">${nextLabel} <code>${esc(nextItem.nom)}</code> →</button>` : `<span class="modal-nav-placeholder"></span>`}
          </div>
        ` : ""}
      </section>`;

    backdrop.addEventListener("click", (event) => {
      if (event.target === backdrop) close();
    });
    backdrop.querySelector(".modal-close").addEventListener("click", close);

    // Copy button
    const copyButton = backdrop.querySelector(".copy-button");
    const copyText = copyButton.querySelector(".copy-text");
    copyButton.addEventListener("click", async () => {
      try {
        await navigator.clipboard.writeText(displaySyntaxe);
        copyText.textContent = label("copied", "Copié !");
        copyButton.classList.add("copied");
      } catch {
        const field = document.createElement("textarea");
          field.value = displaySyntaxe;
        field.style.position = "fixed";
        field.style.opacity = "0";
        document.body.append(field);
        field.select();
        const success = document.execCommand("copy");
        field.remove();
        copyText.textContent = success ? label("copied", "Copié !") : label("copyFailed", "Copie impossible");
      }
      window.setTimeout(() => {
        if (copyButton.isConnected) {
          copyText.textContent = label("copy", "Copier");
          copyButton.classList.remove("copied");
        }
      }, 1800);
    });

    // Learn toggle
    const learnBtn = backdrop.querySelector(".learn-toggle");
    const learnIcon = learnBtn.querySelector(".learn-toggle-icon");
    const learnText = learnBtn.querySelector(".learn-toggle-text");
    learnBtn.addEventListener("click", () => {
      if (typeof onToggle === "function") {
        const nowLearned = onToggle();
        learnBtn.classList.toggle("done", nowLearned);
        learnIcon.textContent = nowLearned ? "✓" : "○";
        learnText.textContent = nowLearned ? label("learned", "✓ Notion apprise") : label("markLearned", "Marquer comme apprise");
      }
    });

    // Favorite button inside modal
    const favBtn = backdrop.querySelector(".modal-fav-btn");
    favBtn.addEventListener("click", (event) => {
      event.stopPropagation();
      if (!key || !id) return;
      try {
        const value = JSON.parse(storage.get(`learnhub-favorites-${key}`) || "[]");
        const stored = new Set(Array.isArray(value) ? value : []);
        const legacyId = `${key}-${legacySlug(category)}-${legacySlug(item.originalName || item.nom)}`;
        const currentlyFav = stored.has(id) || stored.has(legacyId);
        if (currentlyFav) {
          stored.delete(id);
          stored.delete(legacyId);
        }
        else stored.add(id);
        storage.set(`learnhub-favorites-${key}`, JSON.stringify([...stored]));

        const isNowFav = stored.has(id);
        favBtn.classList.toggle("is-favorite", isNowFav);
        favBtn.textContent = isNowFav ? "★" : "☆";
        favBtn.setAttribute("aria-label", isNowFav ? favLabelRemove : favLabelAdd);

        // Sync with card on page
        const cardFavBtn = document.querySelector(`.concept-card .favorite-btn[data-id="${id}"]`);
        if (cardFavBtn) {
          cardFavBtn.classList.toggle("is-favorite", isNowFav);
          cardFavBtn.textContent = isNowFav ? "★" : "☆";
          cardFavBtn.setAttribute("aria-label", isNowFav ? favLabelRemove : favLabelAdd);
        }

        window.dispatchEvent(new CustomEvent("learnhubfavoritetoggle", { detail: { key, id, isFavorite: isNowFav } }));
      } catch {}
    });

    // Previous and Next notion handlers
    const prevBtn = backdrop.querySelector(".modal-prev-btn");
    const nextBtn = backdrop.querySelector(".modal-next-btn");

    const navigateToItem = (targetItem) => {
      const card = [...document.querySelectorAll(".concept-open")].find((candidate) => (
        candidate.dataset.name === targetItem.nom && candidate.dataset.category === targetItem.sectionCategory
      ));
      if (card) {
        card.click();
      } else {
        window.dispatchEvent(new CustomEvent("learnhubopenconcept", {
          detail: { key, category: targetItem.sectionCategory, name: targetItem.nom }
        }));
      }
    };

    if (prevBtn && prevItem) {
      prevBtn.addEventListener("click", () => navigateToItem(prevItem));
    }
    if (nextBtn && nextItem) {
      nextBtn.addEventListener("click", () => navigateToItem(nextItem));
    }

    document.body.append(backdrop);
    document.addEventListener("keydown", onKeydown);
    backdrop.querySelector(".detail-modal").focus();
  }

  window.LearnHubModal = { open, close };
})();
