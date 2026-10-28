/* Terminal Linux simulé – Learn Hub */
(() => {
  const fs = {
    "/": ["bin", "boot", "dev", "etc", "home", "lib", "media", "mnt", "opt", "proc", "root", "run", "sbin", "srv", "sys", "tmp", "usr", "var"],
    "/home": ["kali"],
    "/home/kali": ["Documents", "Downloads", "Desktop", "script.sh", "notes.txt"],
    "/etc": ["passwd", "hosts", "resolv.conf"],
    "/var": ["log", "tmp"],
  };
  const fileContents = {
    "/etc/passwd": "root:x:0:0:root:/root:/bin/bash\nkali:x:1000:1000:Kali User:/home/kali:/bin/bash",
    "/etc/hosts": "127.0.0.1   localhost\n::1         ip6-localhost ip6-loopback",
    "/home/kali/notes.txt": "# Mes notes d'apprentissage\n- Réviser les commandes Linux\n- Tester nmap en labo\n- Créer un script de sauvegarde",
    "/home/kali/script.sh": "#!/bin/bash\necho \"Bonjour depuis le terminal simulé\"\n",
  };
  let cwd = "/home/kali";

  function resolve(path) {
    if (path === "~") return "/home/kali";
    if (path.startsWith("/")) return path;
    const parts = cwd.split("/").filter(Boolean);
    const rel = path.split("/");
    for (const p of rel) {
      if (p === "..") parts.pop();
      else if (p && p !== ".") parts.push(p);
    }
    return "/" + parts.join("/") || "/";
  }

  function run(cmd) {
    const args = cmd.trim().split(/\s+/);
    const name = args[0];
    const rest = args.slice(1);
    let out = "";

    switch (name) {
      case "":
        break;
      case "help":
        out = "Commandes disponibles : help, clear, ls, pwd, cd, whoami, date, uname, echo, cat, exit\nAvertissement : terminal simulé à des fins pédagogiques uniquement.";
        break;
      case "clear":
        document.querySelector("#terminal-output").innerHTML = "";
        return;
      case "ls": {
        const target = resolve(rest[0] || ".");
        const entries = fs[target] || [];
        out = entries.join("  ");
        if (!entries.length) out = `ls: impossible d'accéder à '${rest[0] || target}': Aucun fichier ou dossier de ce type`;
        break;
      }
      case "pwd":
        out = cwd;
        break;
      case "cd": {
        const target = resolve(rest[0] || "~");
        if (fs[target] || target === "/") cwd = target;
        else out = `cd: aucun fichier ou dossier de ce type : ${rest[0] || "~"}`;
        break;
      }
      case "whoami":
        out = "kali";
        break;
      case "date":
        out = new Date().toString();
        break;
      case "uname":
        out = rest.includes("-a") ? "Linux learnhub 6.6.0-kali #1 SMP x86_64 GNU/Linux" : "Linux";
        break;
      case "echo":
        out = rest.join(" ");
        break;
      case "cat": {
        if (!rest.length) { out = "cat: opérande manquante"; break; }
        const target = resolve(rest[0]);
        const content = fileContents[target];
        if (content === undefined) out = `cat: ${rest[0]}: Aucun fichier ou dossier de ce type`;
        else out = content;
        break;
      }
      case "exit":
        window.LearnHubTerminal.close();
        return;
      default:
        out = `${name}: commande introuvable. Tapez 'help' pour la liste des commandes.`;
    }

    const output = document.querySelector("#terminal-output");
    if (out) {
      const line = document.createElement("div");
      line.textContent = out;
      output.appendChild(line);
    }
    const prompt = document.createElement("div");
    prompt.className = "terminal-prompt";
    prompt.innerHTML = `<span class="terminal-prompt-user">kali@learnhub</span>:<span class="terminal-prompt-dir">${cwd}</span><span class="terminal-prompt-symbol">$</span> `;
    const input = document.createElement("input");
    input.className = "terminal-input";
    input.autocomplete = "off";
    input.spellcheck = false;
    input.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        const value = input.value;
        const histLine = document.createElement("div");
        histLine.className = "terminal-history";
        histLine.innerHTML = `<span class="terminal-prompt-user">kali@learnhub</span>:<span class="terminal-prompt-dir">${cwd}</span><span class="terminal-prompt-symbol">$</span> <span class="terminal-cmd">${esc(value)}</span>`;
        output.insertBefore(histLine, prompt);
        run(value);
        output.scrollTop = output.scrollHeight;
      }
    });
    output.replaceChildren(prompt, input);
    input.focus();
    output.scrollTop = output.scrollHeight;
  }

  function esc(value) { return String(value ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]); }

  function open() {
    const existing = document.querySelector(".terminal-backdrop");
    if (existing) existing.remove();
    const language = window.LearnHubI18n ? window.LearnHubI18n.language() : "fr";
    const labels = {
      ar: { title: "محطة لينكس محاكية", help: "اكتب 'help'", close: "إغلاق" },
      en: { title: "Simulated Linux Terminal", help: "Type 'help'", close: "Close" },
      fr: { title: "Terminal Linux simulé", help: "Tapez 'help'", close: "Fermer" }
    };
    const l = labels[language] || labels.fr;
    const backdrop = document.createElement("div");
    backdrop.className = "terminal-backdrop";
    backdrop.innerHTML = `<section class="terminal-dialog" role="dialog" aria-modal="true" aria-labelledby="terminal-title">
      <button class="terminal-close" type="button" aria-label="${l.close}">×</button>
      <h3 id="terminal-title">${l.title}</h3>
      <p class="terminal-hint">${l.help}</p>
      <div class="terminal-output" id="terminal-output"></div>
    </section>`;
    backdrop.querySelector(".terminal-close").addEventListener("click", close);
    backdrop.querySelector(".terminal-backdrop").addEventListener("click", (e) => { if (e.target === backdrop) close(); });
    document.body.append(backdrop);
    run("");
  }

  function close() {
    document.querySelector(".terminal-backdrop")?.remove();
  }

  window.LearnHubTerminal = { open, close };
})();
