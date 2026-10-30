/* Terminal Linux simulé — Learn Hub */
(() => {
  const fs = {
    "/": ["bin", "boot", "dev", "etc", "home", "lib", "media", "mnt", "opt", "proc", "root", "run", "sbin", "srv", "sys", "tmp", "usr", "var"],
    "/home": ["kali"],
    "/home/kali": ["Documents", "Downloads", "Desktop", "script.sh", "notes.txt"],
    "/etc": ["passwd", "hosts", "resolv.conf"],
    "/var": ["log", "tmp"]
  };
  const fileContents = {
    "/etc/passwd": "root:x:0:0:root:/root:/bin/bash\nkali:x:1000:1000:Kali User:/home/kali:/bin/bash",
    "/etc/hosts": "127.0.0.1   localhost\n::1         ip6-localhost ip6-loopback",
    "/home/kali/notes.txt": "# Mes notes d'apprentissage\n- Réviser les commandes Linux\n- Tester nmap en labo\n- Créer un script de sauvegarde",
    "/home/kali/script.sh": "#!/bin/bash\necho \"Bonjour depuis le terminal simulé\"\n"
  };
  let cwd = "/home/kali";
  let previousFocus = null;

  function resolve(path) {
    if (path === "~") return "/home/kali";
    const parts = path.startsWith("/") ? [] : cwd.split("/").filter(Boolean);
    for (const part of path.split("/")) {
      if (part === "..") parts.pop();
      else if (part && part !== ".") parts.push(part);
    }
    return `/${parts.join("/")}` || "/";
  }

  function appendPrompt(output) {
    const prompt = document.createElement("div");
    prompt.className = "terminal-prompt";
    const user = document.createElement("span");
    user.className = "terminal-prompt-user";
    user.textContent = "kali@learnhub";
    const directory = document.createElement("span");
    directory.className = "terminal-prompt-dir";
    directory.textContent = cwd;
    const symbol = document.createElement("span");
    symbol.className = "terminal-prompt-symbol";
    symbol.textContent = "$";
    const input = document.createElement("input");
    input.className = "terminal-input";
    input.autocomplete = "off";
    input.spellcheck = false;
    input.setAttribute("aria-label", "Commande Linux simulée");
    prompt.append(user, document.createTextNode(":"), directory, symbol, document.createTextNode(" "), input);
    output.append(prompt);
    input.addEventListener("keydown", (event) => {
      if (event.key !== "Enter") return;
      const command = input.value;
      const history = document.createElement("div");
      history.className = "terminal-history";
      history.textContent = `kali@learnhub:${cwd}$ ${command}`;
      prompt.replaceWith(history);
      run(command);
    });
    input.focus();
  }

  function run(command) {
    const output = document.querySelector("#terminal-output");
    if (!output) return;
    const [name = "", ...args] = command.trim().split(/\s+/);
    let result = "";

    switch (name) {
      case "": break;
      case "help": result = "Commandes disponibles : help, clear, ls, pwd, cd, whoami, date, uname, echo, cat, exit\nTerminal simulé à des fins pédagogiques uniquement."; break;
      case "clear": output.replaceChildren(); appendPrompt(output); return;
      case "ls": {
        const target = resolve(args[0] || ".");
        result = (fs[target] || []).join("  ") || `ls: impossible d'accéder à '${args[0] || target}' : aucun fichier ou dossier de ce type`;
        break;
      }
      case "pwd": result = cwd; break;
      case "cd": {
        const target = resolve(args[0] || "~");
        if (fs[target] || target === "/") cwd = target;
        else result = `cd: aucun fichier ou dossier de ce type : ${args[0] || "~"}`;
        break;
      }
      case "whoami": result = "kali"; break;
      case "date": result = new Date().toString(); break;
      case "uname": result = args.includes("-a") ? "Linux learnhub 6.6.0-kali #1 SMP x86_64 GNU/Linux" : "Linux"; break;
      case "echo": result = args.join(" "); break;
      case "cat": {
        if (!args.length) result = "cat: opérande manquante";
        else result = fileContents[resolve(args[0])] ?? `cat: ${args[0]} : aucun fichier ou dossier de ce type`;
        break;
      }
      case "exit": close(); return;
      default: result = `${name}: commande introuvable. Tapez 'help' pour la liste des commandes.`;
    }

    if (result) {
      const line = document.createElement("div");
      line.className = "terminal-result";
      line.textContent = result;
      output.append(line);
    }
    appendPrompt(output);
    output.scrollTop = output.scrollHeight;
  }

  function open() {
    close();
    previousFocus = document.activeElement;
    const language = window.LearnHubI18n?.language() || "fr";
    const labels = {
      ar: { title: "محطة لينكس محاكية", help: "اكتب 'help'", close: "إغلاق", input: "أمر لينكس محاكى" },
      en: { title: "Simulated Linux terminal", help: "Type 'help'", close: "Close", input: "Simulated Linux command" },
      fr: { title: "Terminal Linux simulé", help: "Tapez 'help'", close: "Fermer", input: "Commande Linux simulée" }
    };
    const text = labels[language] || labels.fr;
    const backdrop = document.createElement("div");
    backdrop.className = "terminal-backdrop";
    backdrop.innerHTML = `<section class="terminal-dialog" role="dialog" aria-modal="true" aria-labelledby="terminal-title" tabindex="-1">
      <button class="terminal-close" type="button" aria-label="${text.close}">×</button>
      <h3 id="terminal-title">${text.title}</h3>
      <p class="terminal-hint">${text.help}</p>
      <div class="terminal-output" id="terminal-output" aria-live="polite"></div>
    </section>`;
    const dialog = backdrop.querySelector(".terminal-dialog");
    backdrop.querySelector(".terminal-close").addEventListener("click", close);
    backdrop.addEventListener("click", (event) => { if (event.target === backdrop) close(); });
    backdrop.addEventListener("keydown", (event) => {
      if (event.key === "Escape") { event.stopPropagation(); close(); }
      if (event.key === "Tab") {
        const focusable = [...dialog.querySelectorAll("button:not(:disabled), input")];
        if (event.shiftKey && (document.activeElement === focusable[0] || document.activeElement === dialog)) { event.preventDefault(); focusable.at(-1).focus(); }
        else if (!event.shiftKey && (document.activeElement === focusable.at(-1) || document.activeElement === dialog)) { event.preventDefault(); focusable[0].focus(); }
      }
    });
    document.addEventListener("keydown", onEscape);
    document.body.append(backdrop);
    run("");
    document.querySelector(".terminal-input")?.setAttribute("aria-label", text.input);
  }

  function onEscape(event) { if (event.key === "Escape") close(); }

  function close() {
    const backdrop = document.querySelector(".terminal-backdrop");
    if (!backdrop) return;
    backdrop.remove();
    document.removeEventListener("keydown", onEscape);
    previousFocus?.focus();
  }

  window.LearnHubTerminal = { open, close };
})();
