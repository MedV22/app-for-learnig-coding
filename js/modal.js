(() => {
  const esc = (value) => String(value ?? "").replace(/[&<>"']/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[char]);
  const modalId = "concept-modal";
  let previousFocus = null;
  let previousFocusId = null;

  function close() {
    document.querySelector(".modal-backdrop")?.remove();
    document.removeEventListener("keydown", onKeydown);
    const restoredFocus = previousFocus?.isConnected ? previousFocus : previousFocusId ? document.querySelector(`.concept-open[data-id="${previousFocusId}"]`) : null;
    restoredFocus?.focus();
    previousFocusId = null;
  }
  function onKeydown(event) {
    if (event.key === "Escape") { close(); return; }
    if (event.key !== "Tab") return;
    const dialog = document.querySelector(".detail-modal");
    if (!dialog) return;
    const focusable = [...dialog.querySelectorAll("button:not(:disabled), a[href], input, textarea, select, [tabindex]:not([tabindex='-1'])")];
    const first = focusable[0];
    const last = focusable.at(-1);
    if (event.shiftKey && (document.activeElement === first || document.activeElement === dialog)) { event.preventDefault(); last.focus(); }
    else if (!event.shiftKey && (document.activeElement === last || document.activeElement === dialog)) { event.preventDefault(); first.focus(); }
  }
  function open(item, category, learned, onToggle, key, id) {
    close();
    previousFocus = document.activeElement;
    previousFocusId = id || null;
    const language = window.LearnHubI18n.language();
    const arabic = language === "ar";
    const english = language === "en";
    const label = (key2, fallback) => window.LearnHubI18n.get(key2) || fallback;
    let isFav = false;
    if (key && id) {
      try { isFav = new Set(JSON.parse(localStorage.getItem(`learnhub-favorites-${key}`) || "[]")).has(id); }
      catch { isFav = false; }
    }
    const favLabel = language === "ar" ? "إزالة من المفضلات" : language === "en" ? "Remove from favorites" : "Retirer des favoris";
    const favLabelAdd = language === "ar" ? "إضافة للمفضلات" : language === "en" ? "Add to favorites" : "Ajouter aux favoris";
    const backdrop = document.createElement("div");
    backdrop.className = "modal-backdrop";
    backdrop.innerHTML = `<section class="detail-modal" id="${modalId}" role="dialog" aria-modal="true" aria-labelledby="modal-title" tabindex="-1">
      <button class="modal-close" type="button" aria-label="${label("close", "Fermer la fenêtre")}">×</button>
      <span class="modal-kicker">${esc(window.LearnHubI18n.category(category))}</span><h2 class="modal-title" id="modal-title">${esc(item.nom)}</h2>
      <div class="modal-meta"><span class="level-badge">${esc(window.LearnHubI18n.level(item.niveau))}</span><button class="favorite-btn${isFav ? " is-favorite" : ""}" type="button" data-id="${id || ""}" data-key="${key || ""}" aria-label="${isFav ? favLabel : favLabelAdd}">${isFav ? "★" : "☆"}</button></div>
      <h3 class="modal-subtitle">${label("modalPurpose", "À quoi ça sert ?")}</h3><p class="modal-copy">${esc(item.utilite)}</p>
      <h3 class="modal-subtitle">${label("modalSyntax", "Syntaxe et exemple")}</h3><div class="code-block"><pre><code>${esc(item.syntaxe)}</code></pre><button class="copy-button" type="button">${label("copy", "Copier")}</button></div>
      <p class="modal-copy"><strong>${label("modalExplanation", "Ce qui se passe :")}</strong> ${esc(item.exemple)}</p>
      <aside class="modal-note"><strong>${label("modalKnow", "À savoir")}</strong><br>${esc(item.attention)}</aside>
      <button class="learn-toggle${learned ? " done" : ""}" type="button">${learned ? label("learned", "✓ Notion apprise") : label("markLearned", "Marquer comme apprise")}</button>
    </section>`;
    backdrop.addEventListener("click", (event) => { if (event.target === backdrop) close(); });
    backdrop.querySelector(".modal-close").addEventListener("click", close);
    backdrop.querySelector(".copy-button").addEventListener("click", async (event) => {
      const button = event.currentTarget;
      try {
        await navigator.clipboard.writeText(item.syntaxe);
        button.textContent = label("copied", "Copié !");
      } catch {
        const field = document.createElement("textarea");
        field.value = item.syntaxe; field.style.position = "fixed"; field.style.opacity = "0";
        document.body.append(field); field.select();
        const copied = document.execCommand("copy"); field.remove();
        button.textContent = copied ? label("copied", "Copié !") : label("copyFailed", "Copie impossible");
      }
      window.setTimeout(() => { if (button.isConnected) button.textContent = label("copy", "Copier"); }, 1800);
    });
    backdrop.querySelector(".learn-toggle").addEventListener("click", () => {
      const nowLearned = onToggle();
      const button = backdrop.querySelector(".learn-toggle");
      button.classList.toggle("done", nowLearned);
      button.textContent = nowLearned ? label("learned", "✓ Notion apprise") : label("markLearned", "Marquer comme apprise");
    });
    const favBtn = backdrop.querySelector(".favorite-btn");
    favBtn.addEventListener("click", (event) => {
      event.stopPropagation();
      const key = favBtn.dataset.key;
      const id = favBtn.dataset.id;
      if (!key || !id) return;
      try {
        const stored = new Set(JSON.parse(localStorage.getItem(`learnhub-favorites-${key}`) || "[]"));
        const now = stored.has(id) ? [...stored].filter((x) => x !== id) : [...stored, id];
        localStorage.setItem(`learnhub-favorites-${key}`, JSON.stringify(now));
        favBtn.classList.toggle("is-favorite", !stored.has(id));
        favBtn.textContent = stored.has(id) ? "☆" : "★";
        favBtn.setAttribute("aria-label", stored.has(id) ? favLabelAdd : favLabel);
      } catch {}
    });
    document.body.append(backdrop);
    document.addEventListener("keydown", onKeydown);
    backdrop.querySelector(".detail-modal").focus();
  }
  window.LearnHubModal = { open, close };
})();
