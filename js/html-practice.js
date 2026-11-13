(() => {
  const steps = [
    {
      id: "heading-and-paragraph",
      title: "Un titre et un paragraphe",
      lesson: "Les balises indiquent le rôle d’un contenu. <h1> est le titre principal de la page et <p> contient un paragraphe.",
      exercise: "Écris un titre principal avec <h1> et une phrase dans un paragraphe <p>.",
      hint: "Une balise s’ouvre avec <h1> et se ferme avec </h1>. Fais de même avec <p>.",
      solution: "<h1>Mon premier site</h1>\n<p>Bienvenue sur ma page !</p>",
      explanation: "<h1> annonce le titre le plus important de la page. <p> regroupe une phrase ou un paragraphe.",
      validate(document) {
        if (!hasText(document.querySelector("h1"))) return "Ajoute un titre principal <h1> avec du texte à l’intérieur.";
        if (!hasText(document.querySelector("p"))) return "Ajoute un paragraphe <p> avec une phrase à l’intérieur.";
        return null;
      }
    },
    {
      id: "page-sections",
      title: "Organiser la page",
      lesson: "<main> contient le contenu principal. À l’intérieur, <section> regroupe des éléments liés, que l’on peut introduire par un titre <h2>.",
      exercise: "Crée un <main> contenant une <section>, puis ajoute un titre <h2> dans cette section.",
      hint: "Imbrique les balises : le <h2> va dans <section>, et <section> va dans <main>.",
      solution: "<main>\n  <section>\n    <h2>À propos de moi</h2>\n  </section>\n</main>",
      explanation: "<main> délimite le contenu principal. <section> et son <h2> donnent une structure claire à la page.",
      validate(document) {
        const main = document.querySelector("main");
        if (!main) return "Ajoute une balise <main> pour le contenu principal.";
        const section = main.querySelector("section");
        if (!section) return "Place une balise <section> à l’intérieur de <main>.";
        if (!hasText(section.querySelector("h2"))) return "Ajoute un titre <h2> avec du texte dans la section.";
        return null;
      }
    },
    {
      id: "lists",
      title: "Créer une liste",
      lesson: "<ul> crée une liste à puces. Chaque élément de la liste est placé dans une balise <li>.",
      exercise: "Écris une liste <ul> qui contient au moins deux éléments <li>.",
      hint: "Les deux balises <li> doivent être placées entre <ul> et </ul>.",
      solution: "<ul>\n  <li>Le dessin</li>\n  <li>La musique</li>\n</ul>",
      explanation: "<ul> ouvre la liste et chaque <li> représente un de ses éléments.",
      validate(document) {
        const list = document.querySelector("ul");
        if (!list) return "Ajoute une liste à puces avec la balise <ul>.";
        if ([...list.querySelectorAll("li")].filter(hasText).length < 2) return "Ajoute au moins deux éléments <li> contenant du texte dans la liste.";
        return null;
      }
    },
    {
      id: "links",
      title: "Ajouter un lien",
      lesson: "La balise <a> crée un lien. Son attribut href indique où le lien mène et son texte explique ce que l’on peut ouvrir.",
      exercise: "Ajoute un lien <a> avec un attribut href et un texte visible.",
      hint: "Écris par exemple href=\"https://example.com\" entre les balises <a ...> et un texte avant </a>.",
      solution: '<a href="https://example.com">Visiter mon site préféré</a>',
      explanation: "L’attribut href contient la destination et le texte entre les balises est ce que l’on peut cliquer.",
      validate(document) {
        const link = [...document.querySelectorAll("a")].find((item) => hasText(item) && item.getAttribute("href")?.trim());
        if (!link) return "Ajoute un lien <a> avec un texte visible et un attribut href non vide.";
        return null;
      }
    },
    {
      id: "images",
      title: "Afficher une image",
      lesson: "<img> affiche une image. L’attribut src indique son adresse et alt fournit une description utile, notamment si l’image ne s’affiche pas.",
      exercise: "Insère une image <img> avec une adresse src et une description alt.",
      hint: "Écris les deux attributs sur la même balise, par exemple src=\"image.jpg\" alt=\"Un paysage\".",
      solution: '<img src="https://placehold.co/600x300" alt="Un paysage de montagne">',
      explanation: "src indique au navigateur où trouver l’image. alt décrit l’image aux personnes qui ne peuvent pas la voir.",
      validate(document) {
        const image = [...document.querySelectorAll("img")].find((item) => item.getAttribute("src")?.trim() && item.getAttribute("alt")?.trim());
        if (!image) return "Ajoute une image <img> avec un attribut src et un texte alt non vides.";
        return null;
      }
    },
    {
      id: "personal-page",
      title: "Ma page personnelle",
      lesson: "À toi de jouer : combine les balises apprises pour créer une petite page à ton image. L’aperçu se met à jour pendant que tu écris.",
      exercise: "Crée une page avec un titre <h1>, un texte <p>, une image <img> avec src et alt, puis au moins un lien <a> avec href et un texte visible.",
      hint: "Pars de <main>, ajoute chaque type d’élément, puis vérifie que l’image a src et alt et que le lien a href.",
      solution: '<main>\n  <h1>Bonjour, je m’appelle Sam</h1>\n  <p>J’aime la randonnée et la photographie.</p>\n  <img src="https://placehold.co/600x300" alt="Un sentier en montagne">\n  <p><a href="https://example.com">Découvrir mon site préféré</a></p>\n</main>',
      explanation: "Le titre et le paragraphe présentent ta page. L’image inclut une description alt et le lien possède une destination href.",
      isProject: true,
      validate(document) {
        if (!hasText(document.querySelector("h1"))) return "Ajoute un titre <h1> avec du texte pour présenter ta page.";
        if (!hasText(document.querySelector("p"))) return "Ajoute un paragraphe <p> pour écrire quelques mots sur toi.";
        if (![...document.querySelectorAll("img")].some((image) => image.getAttribute("src")?.trim() && image.getAttribute("alt")?.trim())) {
          return "Ajoute une image <img> avec une adresse src et une description alt.";
        }
        if (![...document.querySelectorAll("a")].some((link) => hasText(link) && link.getAttribute("href")?.trim())) {
          return "Ajoute un lien <a> avec un texte visible et une destination href.";
        }
        return null;
      }
    }
  ];

  const storageKey = "learnhub-html-practice";
  const storage = window.LearnHubStorage || {
    get(key) { try { return window.localStorage.getItem(key); } catch { return null; } },
    set(key, value) { try { window.localStorage.setItem(key, value); return true; } catch { return false; } }
  };
  const escapeHTML = window.LearnHubUtils?.escapeHTML || ((value) => String(value ?? "").replace(/[&<>"']/g, (char) => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
  })[char]));
  const hasText = (element) => Boolean(element?.textContent?.trim());
  const listElement = document.querySelector("#step-list");
  const content = document.querySelector("#lesson-content");
  const progressCount = document.querySelector("#progress-count");
  const progressResume = document.querySelector("#progress-resume");
  const progressPercent = document.querySelector("#progress-percent");
  const progressTrack = document.querySelector(".guided-progress-track");
  const i18n = window.LearnHubGuidedI18n;
  const text = (key, values) => i18n?.common(key, values) || key;
  const localizedStep = (step, key) => i18n?.step("html", step.id, key, step[key]) || step[key];

  const readState = () => {
    try {
      const saved = JSON.parse(storage.get(storageKey) || "{}");
      const completed = Array.isArray(saved.completed)
        ? [...new Set(saved.completed.filter((id) => steps.some((step) => step.id === id)))]
        : [];
      const drafts = saved.drafts && typeof saved.drafts === "object" && !Array.isArray(saved.drafts) ? saved.drafts : {};
      const index = Number.isInteger(saved.index) ? Math.min(Math.max(saved.index, 0), steps.length) : 0;
      const finished = saved.finished === true && index === steps.length;
      return { index: finished ? steps.length : Math.min(index, steps.length - 1), completed, drafts, finished };
    } catch {
      return { index: 0, completed: [], drafts: {}, finished: false };
    }
  };

  const state = readState();

  const persist = () => {
    storage.set(storageKey, JSON.stringify(state));
    updateProgress();
  };

  const updateProgress = () => {
    const done = state.completed.length;
    const percent = Math.round(done / steps.length * 100);
    progressCount.textContent = text("stepCount", { done, total: steps.length });
    progressPercent.textContent = `${percent} %`;
    progressTrack.setAttribute("aria-valuenow", String(percent));
    progressTrack.setAttribute("aria-label", `${text("stepsHeading")}: HTML`);
    progressTrack.querySelector("span").style.width = `${percent}%`;
    progressResume.textContent = state.finished
      ? text("finishedProgress")
      : text("savedProgress");
  };

  const renderNavigation = () => {
    listElement.innerHTML = steps.map((step, index) => {
      const completed = state.completed.includes(step.id);
      const available = index <= state.index || completed;
      const current = index === state.index && !state.finished;
      const label = completed ? text("completed") : current ? text("current") : text("upcoming");
      return `<li><button class="guided-step-button${current ? " is-current" : ""}${completed ? " is-complete" : ""}" type="button" data-step-index="${index}"${available ? "" : " disabled"}${current ? ' aria-current="step"' : ""}><span class="guided-step-number">${completed ? "✓" : index + 1}</span><span class="guided-step-label"><strong>${escapeHTML(localizedStep(step, "title"))}</strong><small>${label}</small></span></button></li>`;
    }).join("");
  };

  const parsedHTML = (source) => new DOMParser().parseFromString(source, "text/html");

  const renderFinished = () => {
    const project = steps[steps.length - 1];
    const projectCode = state.drafts[project.id] || "";
    content.innerHTML = `<section class="guided-finish"><p class="eyebrow">${text("pathFinished")}</p><h2>${text("finishedTitle", { course: "HTML" })}</h2><p>${text("finishedCopy")}</p><button class="guided-secondary-button" type="button" data-review-project>${text("reviewProject")}</button><div class="guided-preview-wrap"><h3>${text("pagePreview")}</h3><iframe class="guided-preview" title="${text("pagePreview")}" sandbox="" srcdoc="${escapeHTML(projectCode)}"></iframe></div></section>`;
    content.querySelector("[data-review-project]").addEventListener("click", () => {
      state.finished = false;
      state.index = steps.length - 1;
      persist();
      render();
    });
  };

  const renderStep = () => {
    const step = steps[state.index];
    const completed = state.completed.includes(step.id);
    const savedCode = state.drafts[step.id] || "";
    const stepNumber = text("stepMeta", { current: state.index + 1, total: steps.length });
    content.innerHTML = `<article class="guided-lesson">
      <div class="guided-lesson-meta"><span>${stepNumber}</span><span class="guided-level">${text("beginner")}</span></div>
      <h2>${escapeHTML(localizedStep(step, "title"))}</h2>
      <section class="guided-explanation"><h3>${text("lesson")}</h3><p>${escapeHTML(localizedStep(step, "lesson"))}</p></section>
      <section class="guided-task"><h3>${text("exercise")}</h3><p>${escapeHTML(localizedStep(step, "exercise"))}</p></section>
      <label class="guided-editor-label" for="html-answer">${text("htmlCodeLabel")}</label>
      <textarea class="guided-editor" id="html-answer" rows="${step.isProject ? 12 : 7}" spellcheck="false" autocapitalize="off" autocomplete="off" autocorrect="off" aria-describedby="editor-help">${escapeHTML(savedCode)}</textarea>
      <p class="guided-editor-help" id="editor-help">${text("htmlEditorHelp")}</p>
      ${step.isProject ? `<div class="guided-preview-wrap"><div class="guided-preview-heading"><h3>${text("livePreviewHeading")}</h3><span>${text("livePreviewHelp")}</span></div><iframe class="guided-preview" title="${text("pagePreview")}" sandbox="" srcdoc="${escapeHTML(savedCode)}"></iframe></div>` : ""}
      <div class="guided-actions">
        <button class="guided-primary-button" type="button" data-check>${text("check")}</button>
        <button class="guided-secondary-button" type="button" data-hint aria-expanded="false">${text("hint")}</button>
        <button class="guided-secondary-button" type="button" data-solution aria-expanded="false">${text("solution")}</button>
      </div>
      <p class="guided-hint" data-hint-content hidden>${escapeHTML(localizedStep(step, "hint"))}</p>
      <section class="guided-solution" data-solution-content hidden><h3>${text("possibleSolution")}</h3><pre><code>${escapeHTML(step.solution)}</code></pre><p>${escapeHTML(localizedStep(step, "explanation"))}</p></section>
      <div class="guided-feedback" data-feedback role="status" aria-live="polite" hidden></div>
      <div class="guided-continue-row"><button class="guided-primary-button" type="button" data-next${completed ? "" : " disabled"}>${state.index === steps.length - 1 ? text("finish") : text("next")} <span aria-hidden="true">→</span></button></div>
    </article>`;

    const editor = content.querySelector("#html-answer");
    const feedback = content.querySelector("[data-feedback]");
    const nextButton = content.querySelector("[data-next]");
    const hintButton = content.querySelector("[data-hint]");
    const solutionButton = content.querySelector("[data-solution]");
    let validatedSource = completed ? savedCode : null;

    editor.addEventListener("input", () => {
      state.drafts[step.id] = editor.value;
      persist();
      if (step.isProject) content.querySelector(".guided-preview").srcdoc = editor.value;
      if (editor.value !== validatedSource) {
        nextButton.disabled = true;
        feedback.hidden = true;
      }
    });

    hintButton.addEventListener("click", () => {
      const hint = content.querySelector("[data-hint-content]");
      hint.hidden = !hint.hidden;
      hintButton.setAttribute("aria-expanded", String(!hint.hidden));
      hintButton.textContent = hint.hidden ? text("hint") : text("hideHint");
    });

    solutionButton.addEventListener("click", () => {
      const solution = content.querySelector("[data-solution-content]");
      solution.hidden = !solution.hidden;
      solutionButton.setAttribute("aria-expanded", String(!solution.hidden));
      solutionButton.textContent = solution.hidden ? text("solution") : text("hideSolution");
    });

    content.querySelector("[data-check]").addEventListener("click", () => {
      const error = step.validate(parsedHTML(editor.value));
      feedback.hidden = false;
      if (error) {
        feedback.className = "guided-feedback is-error";
        const explanation = i18n?.validationError("html", step.id, error) || error;
        feedback.innerHTML = `<strong>${text("notYet")}</strong> ${escapeHTML(explanation)} ${text("retry")}`;
        return;
      }

      state.completed = [...new Set([...state.completed, step.id])];
      state.drafts[step.id] = editor.value;
      validatedSource = editor.value;
      persist();
      renderNavigation();
      feedback.className = "guided-feedback is-success";
      feedback.innerHTML = `<strong>${text("correct")}</strong> ${escapeHTML(localizedStep(step, "explanation"))}${completed ? "" : text("stepValidated")}`;
      nextButton.disabled = false;
    });

    nextButton.addEventListener("click", () => {
      if (!state.completed.includes(step.id)) return;
      if (state.index === steps.length - 1) {
        state.index = steps.length;
        state.finished = true;
      } else {
        state.index += 1;
      }
      persist();
      render();
      document.querySelector(".guided-lesson, .guided-finish")?.scrollIntoView({ block: "start" });
    });
  };

  const render = () => {
    renderNavigation();
    updateProgress();
    if (state.finished) renderFinished();
    else renderStep();
  };

  listElement.addEventListener("click", (event) => {
    const button = event.target.closest("[data-step-index]");
    if (!button || button.disabled) return;
    state.index = Number(button.dataset.stepIndex);
    state.finished = false;
    persist();
    render();
  });

  window.addEventListener("learnhublanguagechange", render);
  render();
})();
