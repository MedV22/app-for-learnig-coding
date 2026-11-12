/* Simulated Kali Linux terminal — Learn Hub */
(() => {
  const defaultFs = {
    "/": ["bin", "boot", "dev", "etc", "home", "lib", "media", "mnt", "opt", "proc", "root", "run", "sbin", "srv", "sys", "tmp", "usr", "var"],
    "/home": ["kali"],
    "/home/kali": ["Documents", "Downloads", "Desktop", "script.sh", "notes.txt", "scan.py"],
    "/home/kali/Desktop": ["lab_targets.txt"],
    "/home/kali/Documents": ["audit_report.pdf", "todo.md"],
    "/etc": ["passwd", "hosts", "resolv.conf", "os-release"],
    "/var": ["log", "tmp"]
  };

  const defaultFiles = {
    "/etc/passwd": "root:x:0:0:root:/root:/bin/bash\nkali:x:1000:1000:Kali User:/home/kali:/bin/bash",
    "/etc/hosts": "127.0.0.1\tlocalhost\n127.0.1.1\tlearnhub\n::1\t\tip6-localhost ip6-loopback",
    "/etc/os-release": "PRETTY_NAME=\"Kali GNU/Linux Rolling\"\nNAME=\"Kali GNU/Linux\"\nID=kali\nVERSION=\"2026.4\"",
    "/home/kali/notes.txt": "# Learn Hub practice notes\n- Review common Linux commands (ls, cd, chmod, grep)\n- Practice nmap in an authorized lab (TryHackMe / DVWA)\n- Inspect HTTP requests with Burp Suite\n- Write a basic Python port scanner for a lab",
    "/home/kali/script.sh": "#!/bin/bash\necho \"[+] Starting the audit script...\"\necho \"[+] Scan completed successfully.\"\n",
    "/home/kali/scan.py": "import socket\nprint('Python port scanner is ready.')\n",
    "/home/kali/Desktop/lab_targets.txt": "192.168.1.100  test-web-server\n192.168.1.105  lab-gateway\n"
  };

  let fs = JSON.parse(JSON.stringify(defaultFs));
  let fileContents = { ...defaultFiles };
  let cwd = "/home/kali";
  let previousFocus = null;
  let keydownHandler = null;
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
    input.setAttribute("aria-label", "Linux command");

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
          const commands = ["help", "clear", "ls", "pwd", "cd", "cat", "whoami", "date", "uname", "ip", "ifconfig", "ping", "nmap", "mkdir", "touch", "rm", "history", "exit", "grep", "chmod", "ps", "netstat", "ss", "find", "env", "python3", "python", "nano", "vim", "ssh", "wget", "curl", "apt", "apt-get", "man", "sudo", "export", "head", "tail", "wc", "echo"];
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
        {
          const rows = [
            ["ls [-la]", "List directory files"], ["pwd", "Print the current directory"],
            ["cd [directory]", "Change directory"], ["cat [file]", "Read a file"],
            ["head / tail", "Show the beginning or end of a file"], ["grep <pattern> <file>", "Search a file for a pattern"],
            ["wc [-l] <file>", "Count lines, words, or characters"], ["find [path]", "Search for files"],
            ["mkdir [name]", "Create a directory"], ["touch [name]", "Create an empty file"],
            ["rm [name]", "Delete a file"], ["chmod <mode> <file>", "Change file permissions"],
            ["whoami", "Print the current user"], ["ps", "List running processes"],
            ["ip a / ifconfig", "Show network configuration"], ["ss / netstat", "Show active connections"],
            ["ping <host>", "Test network connectivity"], ["nmap <target>", "Simulate a port scan"],
            ["ssh [user@host]", "Secure remote connection (simulated)"], ["wget / curl <url>", "Download a resource (simulated)"],
            ["apt install <pkg>", "Manage packages (simulated)"], ["python3 [-c code]", "Launch Python (simulated → Python Lab)"],
            ["man <command>", "Show a command's manual"], ["sudo <cmd>", "Run as root (simulated)"],
            ["export NAME=VALUE", "Set an environment variable"], ["env", "Show environment variables"],
            ["uname -a", "Show kernel information"], ["date / echo", "Print the date or a message"],
            ["history", "Show command history"], ["clear", "Clear the screen"], ["exit", "Close the terminal"]
          ];
          result = `<div class="term-table"><strong>Available commands:</strong>${rows.map(([cmd, description]) => `<div><span class="term-hl">${esc(cmd)}</span> ${esc(description)}</div>`).join("")}</div>`;
        }
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
          result = `ls: cannot access '${pathArg}': No such file or directory`;
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
          result = `cd: no such file or directory: ${targetPath}`;
        }
        break;
      }

      case "cat": {
        if (!args.length) {
          result = "cat: missing operand. Try 'cat notes.txt'";
        } else {
          const path = resolve(args[0]);
          if (fileContents[path] !== undefined) {
            result = fileContents[path];
          } else if (fs[path] !== undefined) {
            result = `cat: ${args[0]}: Is a directory`;
          } else {
            result = `cat: ${args[0]}: No such file or directory`;
          }
        }
        break;
      }

      case "mkdir": {
        if (!args.length) {
          result = "mkdir: missing operand. Try 'mkdir lab'";
        } else {
          const newPath = resolve(args[0]);
          if (fs[newPath]) {
            result = `mkdir: cannot create directory '${args[0]}': File exists`;
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
          result = "touch: missing operand. Try 'touch test.txt'";
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
          result = "rm: missing operand";
        } else {
          const filePath = resolve(args[0]);
          const parent = filePath.substring(0, filePath.lastIndexOf("/")) || "/";
          const fileName = filePath.substring(filePath.lastIndexOf("/") + 1);
          if (fileContents[filePath] !== undefined) {
            delete fileContents[filePath];
            if (fs[parent]) fs[parent] = fs[parent].filter((f) => f !== fileName);
          } else if (fs[filePath] !== undefined) {
            result = `rm: cannot remove '${args[0]}': Is a directory (use rm -r on a real system)`;
          } else {
            result = `rm: cannot remove '${args[0]}': No such file or directory`;
          }
        }
        break;
      }

      case "whoami":
        result = "kali";
        break;

      case "date":
        result = new Date().toLocaleString("en-US", { weekday: "short", day: "numeric", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit", second: "2-digit" });
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
        result = history.map((cmd, idx) => `  ${String(idx + 1).padStart(3, " ")}  ${cmd}`).join("\n");
        break;

      case "exit":
        close();
        return;

      case "grep": {
        const pattern = args[0];
        const fileArg = args[1];
        if (!pattern) { result = "usage: grep <pattern> [file]"; break; }
        if (!fileArg) { result = `grep: searching stdin for '${pattern}' is not supported (simulated)`; break; }
        const grepPath = resolve(fileArg);
        const grepContent = fileContents[grepPath];
        if (grepContent === undefined) { result = `grep: ${fileArg}: No such file or directory`; break; }
        const grepLines = grepContent.split("\n").filter((l) => l.toLowerCase().includes(pattern.toLowerCase()));
        result = grepLines.length ? grepLines.join("\n") : `(no matches for '${pattern}')`;
        break;
      }

      case "chmod": {
        const mode = args[0];
        const target = args[1];
        if (!mode || !target) { result = "usage: chmod <mode> <file> — e.g. chmod 755 script.sh"; break; }
        result = `chmod: permissions of '${target}' changed to ${mode} (simulated)`;
        break;
      }

      case "ps":
        result = `  PID TTY          TIME CMD
    1 ?        00:00:03 systemd
  412 ?        00:00:00 sshd
  847 pts/0    00:00:00 bash
 1023 pts/0    00:00:00 ps`;
        break;

      case "netstat":
      case "ss":
        result = `Netid  State   Recv-Q  Send-Q  Local Address:Port    Peer Address:Port
tcp    LISTEN  0       128     0.0.0.0:22           0.0.0.0:*
tcp    LISTEN  0       128     0.0.0.0:80           0.0.0.0:*
tcp    ESTAB   0       0       192.168.1.105:22     192.168.1.1:51234`;
        break;

      case "find": {
        const findPath = args.find((a) => !a.startsWith("-")) || ".";
        const target2 = resolve(findPath);
        const findEntries = fs[target2] || [];
        result = [target2, ...findEntries.map((f) => `${target2}/${f}`)].join("\n");
        break;
      }

      case "env":
        result = `HOME=/home/kali\nUSER=kali\nSHELL=/bin/bash\nTERM=xterm-256color\nPATH=/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin\nLANG=en_US.UTF-8\nLOGNAME=kali`;
        break;

      case "python3":
      case "python": {
        const pyArg = args.join(" ");
        if (!pyArg || pyArg === "-V" || pyArg === "--version") {
          result = "Python 3.12.3 (simulated — use Python Lab to run real code)";
        } else if (pyArg.startsWith("-c")) {
          result = "[simulated] Open Python Lab (Alt+P) to run real Python code in your browser.";
        } else {
          result = "[simulated] To run a Python script, open the Python Lab editor (top button or Alt+P).";
        }
        break;
      }

      case "nano":
      case "vim":
      case "vi": {
        const editorFile = args[0] || "";
        result = `[simulated] The ${name} editor is not available in this terminal. Use 'cat' to read a file, or Python Lab to edit code.`;
        break;
      }

      case "ssh": {
        const sshHost = args.find((a) => !a.startsWith("-")) || "";
        result = sshHost
          ? `ssh: connection to '${sshHost}' — networking is unavailable in this simulation.\nssh: Use a real Kali terminal in TryHackMe or DVWA to practice SSH.`
          : "usage: ssh [user@]hostname";
        break;
      }

      case "wget":
      case "curl": {
        const url = args.find((a) => !a.startsWith("-")) || "";
        result = url
          ? `${name}: networking is unavailable in this simulation.\n${name}: Use a real Kali terminal (VM / TryHackMe) to make actual HTTP requests.`
          : `usage: ${name} <url>`;
        break;
      }

      case "apt":
      case "apt-get": {
        const sub = args[0];
        if (sub === "update") result = "Reading package lists... Done (simulated)\nAll packages are up to date.";
        else if (sub === "install") result = args[1]
          ? `Installing '${args[1]}'... (simulated — works only on a real Kali Linux system)`
          : "apt: specify a package to install. Example: apt install nmap";
        else result = `apt: unknown command '${sub || "?"}'. Commands: update, install, remove, search`;
        break;
      }

      case "man": {
        const manCmd = args[0];
        if (!manCmd) { result = "usage: man <commande>"; break; }
        const manPages = {
          nmap: "NMAP(1) — Network port scanner. Options: -sV (version), -O (OS), -A (advanced detection), -p <ports>",
          ls: "LS(1) — List directory contents. Options: -l (long format), -a (all), -la (combined)",
          grep: "GREP(1) — Search a file for a pattern. Options: -i (ignore case), -r (recursive), -n (line numbers)",
          chmod: "CHMOD(1) — Change permissions. Example: chmod 755 file (rwxr-xr-x)",
          cat: "CAT(1) — Display file contents. Option: -n (line numbers)",
          ssh: "SSH(1) — Secure remote connection. Usage: ssh [user@]host [-p port]",
          ping: "PING(8) — Test network connectivity. Options: -c N (packet count), -i sec (interval)",
        };
        result = manPages[manCmd] || `No manual page for '${manCmd}' (simulated — see https://man7.org/linux/man-pages/)`;
        break;
      }

      case "sudo": {
        const sub2 = args.join(" ");
        result = sub2
          ? `[sudo] simulated: running '${sub2}' as root (simulation only)`
          : "usage: sudo <command>";
        break;
      }

      case "export": {
        const varDef = args[0] || "";
        result = varDef ? `Exported variable: ${varDef}` : "usage: export NAME=VALUE";
        break;
      }

      case "head":
      case "tail": {
        const fileT = args.find((a) => !a.startsWith("-")) || "";
        const nLines = parseInt(args.find((a) => /^-n\d*$/.test(a) || /^\d+$/.test(a.replace("-",""))) || "10");
        const lines2 = parseInt(isNaN(nLines) ? 10 : nLines) || 10;
        const pathT = resolve(fileT);
        const contentT = fileContents[pathT];
        if (!fileT) { result = `usage: ${name} [-n N] <file>`; break; }
        if (contentT === undefined) { result = `${name}: ${fileT}: No such file or directory`; break; }
        const linesArr = contentT.split("\n");
        result = name === "head" ? linesArr.slice(0, lines2).join("\n") : linesArr.slice(-lines2).join("\n");
        break;
      }

      case "wc": {
        const fileW = args.find((a) => !a.startsWith("-")) || "";
        const pathW = resolve(fileW);
        const contentW = fileContents[pathW];
        if (!fileW) { result = "usage: wc [-l] <file>"; break; }
        if (contentW === undefined) { result = `wc: ${fileW}: No such file or directory`; break; }
        const lCount = contentW.split("\n").length;
        const wCount = contentW.split(/\s+/).filter(Boolean).length;
        const cCount = contentW.length;
        result = `  ${lCount}  ${wCount} ${cCount} ${fileW}`;
        break;
      }

      default:
        result = `${esc(name)}: command not found. Type <span class="term-hl">help</span> to list available commands.`;
        isHtml = true;
        break;
    }

    if (result !== undefined && result !== null && result !== "") {
      // Cap output at 45 lines
      const rawLines = (typeof result === "string" ? result : String(result)).split("\n");
      const truncated = rawLines.length > 45;
      const displayed = truncated ? rawLines.slice(0, 45) : rawLines;

      const line = document.createElement("div");
      line.className = "terminal-output-block";
      if (isHtml) {
        if (truncated) {
          const template = document.createElement("template");
          template.innerHTML = result;
          line.textContent = template.content.textContent.split("\n").slice(0, 45).join("\n");
          const note = document.createElement("div");
          note.className = "term-truncation-note";
          note.textContent = `... (${rawLines.length - 45} lines hidden — limit: 45 lines)`;
          output.append(line, note);
          appendPrompt(output);
          output.scrollTop = output.scrollHeight;
          return;
        }
        line.innerHTML = result;
      } else {
        const displayedResult = displayed.join("\n");
        line.textContent = displayedResult;
        if (truncated) {
          const note = document.createElement("div");
          note.className = "term-truncation-note";
          note.textContent = `... (${rawLines.length - 45} lines hidden — limit: 45 lines)`;
          output.append(line);
          output.append(note);
          appendPrompt(output);
          output.scrollTop = output.scrollHeight;
          return;
        }
      }
      output.append(line);
    }

    appendPrompt(output);
    output.scrollTop = output.scrollHeight;
  }

  function open() {
    close();
    previousFocus = document.activeElement;

    const text = {
      title: "Kali Linux Simulated Terminal",
      hint: "Type 'help' to list available commands",
      close: "Close"
    };

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

    keydownHandler = (event) => {
      if (window.LearnHubUtils?.isTopLayer && !window.LearnHubUtils.isTopLayer(backdrop)) return;
      if (event.key === "Escape") {
        event.stopImmediatePropagation();
        close();
      } else if (event.key === "Tab") {
        const dialog = backdrop.querySelector(".terminal-dialog");
        const focusable = [...dialog.querySelectorAll("button:not(:disabled), input:not(:disabled), textarea:not(:disabled), select:not(:disabled), [tabindex]:not([tabindex='-1'])")];
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
    };
    document.addEventListener("keydown", keydownHandler);

    document.body.append(backdrop);
    const output = backdrop.querySelector("#terminal-output");
    appendPrompt(output);
    output.scrollTop = output.scrollHeight;
  }

  function close() {
    const backdrop = document.querySelector(".terminal-backdrop");
    if (keydownHandler) {
      document.removeEventListener("keydown", keydownHandler);
      keydownHandler = null;
    }
    if (backdrop) backdrop.remove();
    if (previousFocus?.isConnected) previousFocus.focus();
    previousFocus = null;
  }

  window.LearnHubTerminal = { open, close };
})();
