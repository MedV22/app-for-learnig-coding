(() => {
  const esc = (value) => String(value ?? "").replace(/[&<>"']/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[char]);
  const modalId = "concept-modal";
  let previousFocus = null;

  function close() {
    document.querySelector(".modal-backdrop")?.remove();
    document.removeEventListener("keydown", onKeydown);
    previousFocus?.focus();
  }
  function onKeydown(event) { if (event.key === "Escape") close(); }
  function open(item, category, learned, onToggle) {
    close();
    previousFocus = document.activeElement;
    const backdrop = document.createElement("div");
    backdrop.className = "modal-backdrop";
    backdrop.innerHTML = `<section class="detail-modal" id="${modalId}" role="dialog" aria-modal="true" aria-labelledby="modal-title" tabindex="-1">
      <button class="modal-close" type="button" aria-label="Fermer la fenêtre">×</button>
      <span class="modal-kicker">${esc(category)}</span><h2 class="modal-title" id="modal-title">${esc(item.nom)}</h2>
      <div class="modal-meta"><span class="level-badge">${esc(item.niveau)}</span></div>
      <h3 class="modal-subtitle">À quoi ça sert ?</h3><p class="modal-copy">${esc(item.utilite)}</p>
      <h3 class="modal-subtitle">Syntaxe et exemple</h3><div class="code-block"><pre><code>${esc(item.syntaxe)}</code></pre><button class="copy-button" type="button">Copier</button></div>
      <p class="modal-copy"><strong>Ce qui se passe :</strong> ${esc(item.exemple)}</p>
      <aside class="modal-note"><strong>À savoir</strong><br>${esc(item.attention)}</aside>
      <button class="learn-toggle${learned ? " done" : ""}" type="button">${learned ? "✓ Notion apprise" : "Marquer comme apprise"}</button>
    </section>`;
    backdrop.addEventListener("click", (event) => { if (event.target === backdrop) close(); });
    backdrop.querySelector(".modal-close").addEventListener("click", close);
    backdrop.querySelector(".copy-button").addEventListener("click", async (event) => {
      const button = event.currentTarget;
      try {
        await navigator.clipboard.writeText(item.syntaxe);
        button.textContent = "Copié !";
      } catch {
        const field = document.createElement("textarea");
        field.value = item.syntaxe; field.style.position = "fixed"; field.style.opacity = "0";
        document.body.append(field); field.select();
        const copied = document.execCommand("copy"); field.remove();
        button.textContent = copied ? "Copié !" : "Copie impossible";
      }
      window.setTimeout(() => { if (button.isConnected) button.textContent = "Copier"; }, 1800);
    });
    backdrop.querySelector(".learn-toggle").addEventListener("click", () => {
      const nowLearned = onToggle();
      const button = backdrop.querySelector(".learn-toggle");
      button.classList.toggle("done", nowLearned);
      button.textContent = nowLearned ? "✓ Notion apprise" : "Marquer comme apprise";
    });
    document.body.append(backdrop);
    document.addEventListener("keydown", onKeydown);
    backdrop.querySelector(".detail-modal").focus();
  }
  window.LearnHubModal = { open, close };
})();
