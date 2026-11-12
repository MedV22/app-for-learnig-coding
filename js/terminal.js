/* Terminal Linux simulé (Kali style) — Learn Hub */
(() => {
  const defaultFs = {
    "/": ["bin", "boot", "dev", "etc", "home", "lib", "media", "mnt", "opt", "proc", "root", "run", "sbin", "srv", "sys", "tmp", "usr", "var"],
    "/home": ["kali"],
    "/home/kali": ["Documents", "Downloads", "Desktop", "script.sh", "notes.txt", "scan.py"],
    "/home/kali/Desktop": ["lab_targets.txt"],
    "/home/kali/Documents": ["rapport_audit.pdf", "todo.md"],
    "/etc": ["passwd", "hosts", "resolv.conf", "os-release"],
    "/var": ["log", "tmp"]
  };

  const defaultFiles = {
    "/etc/passwd": "root:x:0:0:root:/root:/bin/bash\nkali:x:1000:1000:Kali User:/home/kali:/bin/bash",
    "/etc/hosts": "127.0.0.1\tlocalhost\n127.0.1.1\tlearnhub\n::1\t\tip6-localhost ip6-loopback",
    "/etc/os-release": "PRETTY_NAME=\"Kali GNU/Linux Rolling\"\nNAME=\"Kali GNU/Linux\"\nID=kali\nVERSION=\"2026.4\"",
    "/home/kali/notes.txt": "# Mes notes d'apprentissage Learn Hub\n- Réviser les commandes Linux usuelles (ls, cd, chmod, grep)\n- Pratiquer nmap en labo contrôlé (TryHackMe / DVWA)\n- Tester les requêtes HTTP avec Burp Suite\n- Écrire un port scanner basique en Python",
    "/home/kali/script.sh": "#!/bin/bash\necho \"[+] Démarrage du script d'audit...\"\necho \"[+] Analyse terminée avec succès.\"\n",
    "/home/kali/scan.py": "import socket\nprint('Port scanner Python prêt à l\\'emploi.')\n",
    "/home/kali/Desktop/lab_targets.txt": "192.168.1.100  serveur-web-test\n192.168.1.105  passerelle-lab\n"
  };

  let fs = JSON.parse(JSON.stringify(defaultFs));
  let fileContents = { ...defaultFiles };
  let cwd = "/home/kali";
  let previousFocus = null;
  const history = [];
  let historyIndex = -1;

  function resolve(path) {
    if (!path || path === "~") return "/home/kali";
    if (path.startsWith("~/")) return `/home/kali/${path.slice(2)}`;
    const parts = path.startsWith("/") ? [] : cwd.split("/").filter(Boolean);
    for (const part of path.split("/")) {
      if (part === "..") {
        if (parts.length > 0) parts.pop();
      } else if (part && part !== ".") {
        parts.push(part);
      }
    }
    return `/${parts.join("/")}` || "/";
  }

  function getDisplayDir() {
    if (cwd === "/home/kali") return "~";
    if (cwd.startsWith("/home/kali/")) return `~/${cwd.slice("/home/kali/".length)}`;
    return cwd;
  }

  function appendPrompt(output) {
    const promptWrap = document.createElement("div");
    promptWrap.className = "terminal-prompt-line";

    const promptText = document.createElement("span");
    promptText.className = "terminal-prompt-user";
    promptText.innerHTML = `<span class="term-user">kali@learnhub</span>:<span class="term-path">${esc(getDisplayDir())}</span><span class="term-sign">$</span> `;

    const input = document.createElement("input");
    input.className = "terminal-input";
    input.autocomplete = "off";
    input.autocapitalize = "off";
    input.spellcheck = false;
    input.setAttribute("aria-label", "Commande Linux");

    promptWrap.append(promptText, input);
    output.append(promptWrap);

    input.addEventListener("keydown", (event) => {
      if (event.key === "Enter") {
        const command = input.value.trim();
        if (command) {
          history.push(command);
          historyIndex = history.length;
        }

        const executedLine = document.createElement("div");
        executedLine.className = "terminal-history-line";
        executedLine.innerHTML = `<span class="term-user">kali@learnhub</span>:<span class="term-path">${esc(getDisplayDir())}</span><span class="term-sign">$</span> <span class="term-cmd-text">${esc(command)}</span>`;
        promptWrap.replaceWith(executedLine);

        run(command);
      } else if (event.key === "ArrowUp") {
        event.preventDefault();
        if (history.length > 0 && historyIndex > 0) {
          historyIndex--;
          input.value = history[historyIndex] || "";
        }
      } else if (event.key === "ArrowDown") {
        event.preventDefault();
        if (historyIndex < history.length - 1) {
          historyIndex++;
          input.value = history[historyIndex] || "";
        } else {
          historyIndex = history.length;
          input.value = "";
        }
      } else if (event.key === "Tab") {
        event.preventDefault();
        // Auto-complete basic commands and files
        const currentVal = input.value;
        const [cmd, arg] = currentVal.split(/\s+/);
        if (!arg) {
          const commands = ["help", "clear", "ls", "pwd", "cd", "cat", "whoami", "date", "uname", "ip", "ifconfig", "ping", "nmap", "mkdir", "touch", "rm", "history", "exit"];
          const matches = commands.filter((c) => c.startsWith(cmd));
          if (matches.length === 1) input.value = matches[0] + " ";
        } else {
          const files = fs[cwd] || [];
          const matches = files.filter((f) => f.startsWith(arg));
          if (matches.length === 1) input.value = `${cmd} ${matches[0]}`;
        }
      }
    });

    input.focus();
    output.scrollTop = output.scrollHeight;
  }

  function esc(value) {
    return String(value ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]);
  }

  function run(command) {
    const output = document.querySelector("#terminal-output");
    if (!output) return;

    const trimmed = command.trim();
    if (!trimmed) {
      appendPrompt(output);
      return;
    }

    const [name = "", ...args] = trimmed.split(/\s+/);
    let result = "";
    let isHtml = false;

    switch (name.toLowerCase()) {
      case "help":
        result = `
<div class="term-table">
  <strong>Commandes disponibles :</strong>
  <div>  <span class="term-hl">ls [-la]</span>         Lister les fichiers du dossier</div>
  <div>  <span class="term-hl">pwd</span>              Afficher le dossier courant</div>
  <div>  <span class="term-hl">cd [dossier]</span>     Changer de dossier</div>
  <div>  <span class="term-hl">cat [fichier]</span>    Lire le contenu d'un fichier</div>
  <div>  <span class="term-hl">mkdir [nom]</span>      Créer un nouveau dossier</div>
  <div>  <span class="term-hl">touch [nom]</span>      Créer un fichier vide</div>
  <div>  <span class="term-hl">rm [nom]</span>         Supprimer un fichier</div>
  <div>  <span class="term-hl">whoami</span>           Afficher l'utilisateur actif</div>
  <div>  <span class="term-hl">ip a / ifconfig</span>  Afficher la configuration réseau</div>
  <div>  <span class="term-hl">ping &lt;host&gt;</span>        Tester la connectivité réseau</div>
  <div>  <span class="term-hl">nmap &lt;cible&gt;</span>       Simuler un scan de ports</div>
  <div>  <span class="term-hl">uname -a</span>         Afficher les informations du noyau</div>
  <div>  <span class="term-hl">date / echo</span>       Afficher l'heure ou un message</div>
  <div>  <span class="term-hl">history</span>          Historique des commandes</div>
  <div>  <span class="term-hl">clear</span>            Effacer l'écran</div>
  <div>  <span class="term-hl">exit</span>             Fermer le terminal</div>
</div>`;
        isHtml = true;
        break;

      case "clear":
        output.replaceChildren();
        appendPrompt(output);
        return;

      case "pwd":
        result = cwd;
        break;

      case "ls": {
        const showAll = args.includes("-a") || args.includes("-la") || args.includes("-al");
        const pathArg = args.find((a) => !a.startsWith("-")) || ".";
        const target = resolve(pathArg);
        const entries = fs[target];

        if (!entries) {
          result = `ls: impossible d'accéder à '${pathArg}' : Aucun fichier ou dossier de ce type`;
        } else {
          const list = showAll ? [".", "..", ...entries] : entries;
          result = list.map((item) => {
            const isDir = fs[`${target === "/" ? "" : target}/${item}`] !== undefined;
            const isExec = item.endsWith(".sh") || item.endsWith(".py");
            const cls = isDir ? "term-file-dir" : isExec ? "term-file-exec" : "term-file-normal";
            return `<span class="${cls}">${esc(item)}</span>`;
          }).join("   ");
          isHtml = true;
        }
        break;
      }

      case "cd": {
        const targetPath = args[0] || "~";
        const target = resolve(targetPath);
        if (fs[target] || target === "/") {
          cwd = target;
        } else {
          result = `cd: aucun fichier ou dossier de ce type : ${targetPath}`;
        }
        break;
      }

      case "cat": {
        if (!args.length) {
          result = "cat: opérande manquant. Exemple: cat notes.txt";
        } else {
          const path = resolve(args[0]);
          if (fileContents[path] !== undefined) {
            result = fileContents[path];
          } else if (fs[path] !== undefined) {
            result = `cat: ${args[0]}: est un dossier`;
          } else {
            result = `cat: ${args[0]}: Aucun fichier ou dossier de ce type`;
          }
        }
        break;
      }

      case "mkdir": {
        if (!args.length) {
          result = "mkdir: opérande manquant. Exemple: mkdir labo";
        } else {
          const newPath = resolve(args[0]);
          if (fs[newPath]) {
            result = `mkdir: impossible de créer le dossier '${args[0]}': Le fichier existe`;
          } else {
            fs[newPath] = [];
            const parent = newPath.substring(0, newPath.lastIndexOf("/")) || "/";
            const dirName = newPath.substring(newPath.lastIndexOf("/") + 1);
            if (fs[parent] && !fs[parent].includes(dirName)) {
              fs[parent].push(dirName);
            }
          }
        }
        break;
      }

      case "touch": {
        if (!args.length) {
          result = "touch: opérande manquant. Exemple: touch test.txt";
        } else {
          const filePath = resolve(args[0]);
          const parent = filePath.substring(0, filePath.lastIndexOf("/")) || "/";
          const fileName = filePath.substring(filePath.lastIndexOf("/") + 1);
          if (fs[parent]) {
            if (!fs[parent].includes(fileName)) fs[parent].push(fileName);
            fileContents[filePath] = fileContents[filePath] || "";
          }
        }
        break;
      }

      case "rm": {
        if (!args.length) {
          result = "rm: opérande manquant";
        } else {
          const filePath = resolve(args[0]);
          const parent = filePath.substring(0, filePath.lastIndexOf("/")) || "/";
          const fileName = filePath.substring(filePath.lastIndexOf("/") + 1);
          if (fileContents[filePath] !== undefined) {
            delete fileContents[filePath];
            if (fs[parent]) fs[parent] = fs[parent].filter((f) => f !== fileName);
          } else if (fs[filePath] !== undefined) {
            result = `rm: impossible de supprimer '${args[0]}': est un dossier (utilise rm -r en vrai)`;
          } else {
            result = `rm: impossible de supprimer '${args[0]}': Aucun fichier ou dossier de ce type`;
          }
        }
        break;
      }

      case "whoami":
        result = "kali";
        break;

      case "date":
        result = new Date().toLocaleString("fr-FR", { weekday: "short", day: "numeric", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit", second: "2-digit" });
        break;

      case "uname":
        result = args.includes("-a")
          ? "Linux learnhub 6.6.0-kali1-amd64 #1 SMP PREEMPT_DYNAMIC Kali 6.6.9-1kali1 (2026-01-08) x86_64 GNU/Linux"
          : "Linux";
        break;

      case "echo":
        result = args.join(" ");
        break;

      case "ip":
      case "ifconfig":
        result = `
1: lo: &lt;LOOPBACK,UP,LOWER_UP&gt; mtu 65536 qdisc noqueue state UNKNOWN
    link/loopback 00:00:00:00:00:00 brd 00:00:00:00:00:00
    inet 127.0.0.1/8 scope host lo
2: eth0: &lt;BROADCAST,MULTICAST,UP,LOWER_UP&gt; mtu 1500 qdisc pfifo_fast state UP
    link/ether 08:00:27:d3:f2:14 brd ff:ff:ff:ff:ff:ff
    inet 192.168.1.105/24 brd 192.168.1.255 scope global dynamic eth0`;
        isHtml = true;
        break;

      case "ping": {
        const target = args[0] || "8.8.8.8";
        result = `
PING ${esc(target)} (${esc(target)}) 56(84) bytes of data.
64 bytes from ${esc(target)}: icmp_seq=1 ttl=118 time=13.4 ms
64 bytes from ${esc(target)}: icmp_seq=2 ttl=118 time=14.1 ms
64 bytes from ${esc(target)}: icmp_seq=3 ttl=118 time=13.8 ms

--- ${esc(target)} ping statistics ---
3 packets transmitted, 3 received, 0% packet loss, time 2004ms
rtt min/avg/max/mdev = 13.4/13.76/14.1/0.29 ms`;
        isHtml = true;
        break;
      }

      case "nmap": {
        const target = args.find((a) => !a.startsWith("-")) || "192.168.1.1";
        result = `
Starting Nmap 7.94 ( https://nmap.org ) at ${new Date().toISOString().slice(0, 19).replace("T", " ")}
Nmap scan report for ${esc(target)}
Host is up (0.0024s latency).
Not shown: 997 closed tcp ports (reset)
PORT    STATE SERVICE  VERSION
22/tcp  open  ssh      OpenSSH 9.3p1 Debian 1
80/tcp  open  http     nginx 1.24.0
443/tcp open  ssl/http nginx 1.24.0

Nmap done: 1 IP address (1 host up) scanned in 1.48 seconds`;
        isHtml = true;
        break;
      }

      case "history":
        result = history.map((cmd, idx) => `  ${String(idx + 1).padStart(3, " ")}  ${esc(cmd)}`).join("\n");
        isHtml = true;
        break;

      case "exit":
        close();
        return;

      default:
        result = `${esc(name)}: commande introuvable. Tapez <span class="term-hl">help</span> pour afficher la liste des commandes disponibles.`;
        isHtml = true;
        break;
    }

    if (result) {
      const line = document.createElement("div");
      line.className = "terminal-output-block";
      if (isHtml) {
        line.innerHTML = result;
      } else {
        line.textContent = result;
      }
      output.append(line);
    }

    appendPrompt(output);
  }

  function open() {
    close();
    previousFocus = document.activeElement;

    const language = window.LearnHubI18n?.language?.() || "fr";
    const labels = {
      ar: { title: "محطة لينكس كالي المحاكية", hint: "اكتب 'help' لعرض الأوامر المتاحة", close: "إغلاق" },
      en: { title: "Kali Linux Simulated Terminal", hint: "Type 'help' to list available commands", close: "Close" },
      fr: { title: "Terminal Kali Linux (Simulé)", hint: "Tapez 'help' pour la liste des commandes", close: "Fermer" }
    };
    const text = labels[language] || labels.fr;

    const backdrop = document.createElement("div");
    backdrop.className = "terminal-backdrop";
    backdrop.innerHTML = `
      <section class="terminal-dialog" role="dialog" aria-modal="true" aria-labelledby="terminal-title" tabindex="-1">
        <div class="terminal-titlebar">
          <div class="terminal-dots" aria-hidden="true">
            <span class="dot dot-red"></span>
            <span class="dot dot-yellow"></span>
            <span class="dot dot-green"></span>
          </div>
          <div class="terminal-tab" id="terminal-title">
            <span class="term-tab-icon">⌘</span> kali@learnhub: ~ (bash)
          </div>
          <button class="terminal-close" type="button" aria-label="${text.close}">×</button>
        </div>
        <div class="terminal-banner">
          <pre class="term-ascii">
 _                     _   _       _     
| |    ___  __ _ _ __ | |_| |_ _ _| |__  
| |   / _ \\/ _\` | '__||  _  | | | | '_ \\ 
| |__|  __/ (_| | |   | | | | |_| | |_) |
|_____\\___|\\__,_|_|   |_| |_|\\__,_|_.__/ </pre>
          <p class="terminal-hint">🐧 <strong>Kali Linux Rolling</strong> — ${text.hint}</p>
        </div>
        <div class="terminal-output" id="terminal-output" aria-live="polite"></div>
      </section>`;

    backdrop.querySelector(".terminal-close").addEventListener("click", close);
    backdrop.addEventListener("click", (event) => {
      if (event.target === backdrop) close();
    });

    const onKeyDown = (event) => {
      if (event.key === "Escape") {
        event.stopPropagation();
        close();
      }
    };
    document.addEventListener("keydown", onKeyDown);

    document.body.append(backdrop);
    const output = backdrop.querySelector("#terminal-output");
    appendPrompt(output);
  }

  function close() {
    const backdrop = document.querySelector(".terminal-backdrop");
    if (!backdrop) return;
    backdrop.remove();
    previousFocus?.focus();
  }

  window.LearnHubTerminal = { open, close };
})();
