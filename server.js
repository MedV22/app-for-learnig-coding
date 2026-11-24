const fs = require("node:fs");
const http = require("node:http");
const path = require("node:path");

const ROOT = __dirname;
const HOST = "127.0.0.1";
const PORT = Number(process.env.CODEVALLY_PORT || 8080);
const KALI_HOST = process.env.CODEVALLY_KALI_HOST || "127.0.0.1";
const KALI_PORT = Number(process.env.CODEVALLY_KALI_PORT || 7681);
const KALI_PREFIX = "/kali-terminal";
const TTYD_AUTH = process.env.CODEVALLY_TTYD_AUTH || "";

const MIME_TYPES = {
  ".css": "text/css; charset=utf-8",
  ".html": "text/html; charset=utf-8",
  ".ico": "image/x-icon",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".png": "image/png",
  ".svg": "image/svg+xml",
  ".webmanifest": "application/manifest+json; charset=utf-8"
};

const SECURITY_HEADERS = {
  "Content-Security-Policy": "frame-ancestors 'self'",
  "Referrer-Policy": "same-origin",
  "X-Content-Type-Options": "nosniff",
  "X-Frame-Options": "SAMEORIGIN"
};

function sendText(response, statusCode, message) {
  response.writeHead(statusCode, {
    ...SECURITY_HEADERS,
    "Cache-Control": "no-store",
    "Content-Type": "text/plain; charset=utf-8"
  });
  response.end(message);
}

function proxyPath(requestUrl) {
  return `${requestUrl.pathname}${requestUrl.search}`;
}

function isAllowedWebSocketOrigin(request) {
  const requestHost = String(request.headers.host || "").toLowerCase();
  const localHosts = new Set([`127.0.0.1:${PORT}`, `localhost:${PORT}`]);
  if (!localHosts.has(requestHost) || !request.headers.origin) return false;

  try {
    const origin = new URL(request.headers.origin);
    return origin.protocol === "http:" && origin.host.toLowerCase() === requestHost &&
      origin.pathname === "/" && !origin.search && !origin.hash;
  } catch {
    return false;
  }
}

function proxyHttp(request, response, requestUrl) {
  if (!TTYD_AUTH) {
    sendText(response, 503, "Le relais sécurisé Kali n'est pas configuré. Lance start-kali-terminal.ps1 depuis PowerShell.");
    return;
  }

  const upstream = http.request({
    hostname: KALI_HOST,
    port: KALI_PORT,
    method: request.method,
    path: proxyPath(requestUrl),
    headers: { ...request.headers, host: request.headers.host || `${HOST}:${PORT}`, authorization: `Basic ${TTYD_AUTH}` }
  }, (upstreamResponse) => {
    response.writeHead(upstreamResponse.statusCode || 502, {
      ...upstreamResponse.headers,
      ...SECURITY_HEADERS,
      "Cache-Control": "no-store"
    });
    upstreamResponse.pipe(response);
  });

  upstream.on("error", () => {
    if (!response.headersSent) {
      sendText(response, 503, "Le terminal Kali WSL n'est pas démarré. Lance start-kali-terminal.ps1 depuis PowerShell, à la racine du projet.");
    } else {
      response.destroy();
    }
  });
  request.pipe(upstream);
}

function proxyWebSocket(request, clientSocket, head, requestUrl) {
  if (!TTYD_AUTH) {
    clientSocket.end("HTTP/1.1 503 Service Unavailable\r\nConnection: close\r\nContent-Length: 0\r\n\r\n");
    return;
  }

  const upstream = http.request({
    hostname: KALI_HOST,
    port: KALI_PORT,
    method: "GET",
    path: proxyPath(requestUrl),
    headers: { ...request.headers, host: request.headers.host || `${HOST}:${PORT}`, authorization: `Basic ${TTYD_AUTH}` }
  });

  upstream.on("upgrade", (upstreamResponse, upstreamSocket, upstreamHead) => {
    clientSocket.write(`HTTP/1.1 ${upstreamResponse.statusCode || 101} ${upstreamResponse.statusMessage || "Switching Protocols"}\r\n`);
    for (let i = 0; i < upstreamResponse.rawHeaders.length; i += 2) {
      clientSocket.write(`${upstreamResponse.rawHeaders[i]}: ${upstreamResponse.rawHeaders[i + 1]}\r\n`);
    }
    clientSocket.write("\r\n");
    if (upstreamHead.length) clientSocket.write(upstreamHead);
    if (head.length) upstreamSocket.write(head);
    upstreamSocket.pipe(clientSocket);
    clientSocket.pipe(upstreamSocket);
    clientSocket.on("error", () => upstreamSocket.destroy());
    upstreamSocket.on("error", () => clientSocket.destroy());
  });

  upstream.on("response", (upstreamResponse) => {
    clientSocket.write(`HTTP/1.1 ${upstreamResponse.statusCode || 502} ${upstreamResponse.statusMessage || "Bad Gateway"}\r\n`);
    for (let i = 0; i < upstreamResponse.rawHeaders.length; i += 2) {
      clientSocket.write(`${upstreamResponse.rawHeaders[i]}: ${upstreamResponse.rawHeaders[i + 1]}\r\n`);
    }
    clientSocket.write("\r\n");
    upstreamResponse.pipe(clientSocket);
  });

  upstream.on("error", () => {
    if (!clientSocket.destroyed) {
      clientSocket.end("HTTP/1.1 503 Service Unavailable\r\nConnection: close\r\nContent-Type: text/plain; charset=utf-8\r\n\r\nLe terminal Kali WSL n'est pas démarré.");
    }
  });
  clientSocket.on("error", () => upstream.destroy());
  upstream.end();
}

async function serveStatic(request, response, requestUrl) {
  if (request.method !== "GET" && request.method !== "HEAD") {
    sendText(response, 405, "Méthode non autorisée.");
    return;
  }

  let pathname;
  try {
    pathname = decodeURIComponent(requestUrl.pathname);
  } catch {
    sendText(response, 400, "Adresse invalide.");
    return;
  }

  const relativePath = (pathname === "/" ? "index.html" : pathname).replace(/^[/\\]+/, "");
  const pathParts = relativePath.split(/[\\/]+/);
  if (pathParts.some((part) => part.startsWith(".") || part.startsWith("_backup") || ["scratch", "docker"].includes(part))) {
    sendText(response, 404, "Fichier introuvable.");
    return;
  }

  const extension = path.extname(relativePath).toLowerCase();
  if (!Object.hasOwn(MIME_TYPES, extension)) {
    sendText(response, 404, "Fichier introuvable.");
    return;
  }

  const filePath = path.resolve(ROOT, relativePath);
  if (filePath !== ROOT && !filePath.startsWith(`${ROOT}${path.sep}`)) {
    sendText(response, 404, "Fichier introuvable.");
    return;
  }

  try {
    const stats = await fs.promises.stat(filePath);
    if (!stats.isFile()) {
      sendText(response, 404, "Fichier introuvable.");
      return;
    }
    response.writeHead(200, {
      ...SECURITY_HEADERS,
      "Cache-Control": extension === ".html" || relativePath === "sw.js" ? "no-cache" : "public, max-age=300",
      "Content-Length": stats.size,
      "Content-Type": MIME_TYPES[extension],
      ...(relativePath === "sw.js" ? { "Service-Worker-Allowed": "/" } : {})
    });
    if (request.method === "HEAD") {
      response.end();
      return;
    }
    fs.createReadStream(filePath).pipe(response);
  } catch {
    sendText(response, 404, "Fichier introuvable.");
  }
}

const server = http.createServer((request, response) => {
  let requestUrl;
  try {
    requestUrl = new URL(request.url, `http://${request.headers.host || `${HOST}:${PORT}`}`);
  } catch {
    sendText(response, 400, "Adresse invalide.");
    return;
  }

  if (requestUrl.pathname === KALI_PREFIX) {
    response.writeHead(301, { ...SECURITY_HEADERS, Location: `${KALI_PREFIX}/${requestUrl.search}` });
    response.end();
    return;
  }
  if (requestUrl.pathname.startsWith(`${KALI_PREFIX}/`)) {
    proxyHttp(request, response, requestUrl);
    return;
  }
  serveStatic(request, response, requestUrl);
});

server.on("upgrade", (request, socket, head) => {
  let requestUrl;
  try {
    requestUrl = new URL(request.url, `http://${request.headers.host || `${HOST}:${PORT}`}`);
  } catch {
    socket.destroy();
    return;
  }
  if (!requestUrl.pathname.startsWith(`${KALI_PREFIX}/`)) {
    socket.destroy();
    return;
  }
  if (!isAllowedWebSocketOrigin(request)) {
    socket.end("HTTP/1.1 403 Forbidden\r\nConnection: close\r\nContent-Length: 0\r\n\r\n");
    return;
  }
  proxyWebSocket(request, socket, head, requestUrl);
});

server.listen(PORT, HOST, () => {
  console.log(`CodeVally local server: http://${HOST}:${PORT}`);
});

server.on("error", (error) => {
  console.error(`Unable to start local server: ${error.message}`);
  process.exitCode = 1;
});
