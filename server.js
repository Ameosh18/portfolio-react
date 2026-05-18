import http from 'http';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = process.env.PORT || 5000;
const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css',
  '.js': 'application/javascript',
  '.mjs': 'application/javascript',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.ttf': 'font/ttf',
};

const server = http.createServer((req, res) => {
  // Serve from dist folder (built React app)
  let filePath = path.join(__dirname, 'dist', req.url);

  // Default to index.html for SPA routing
  if (filePath === path.join(__dirname, 'dist', '/')) {
    filePath = path.join(__dirname, 'dist', 'index.html');
  }

  const extname = path.extname(filePath).toLowerCase();
  const contentType = MIME_TYPES[extname] || 'text/plain';

  // For assets (js, css, images), serve directly
  // For other routes (SPA), serve index.html
  fs.stat(filePath, (err, stats) => {
    if (err || !stats.isFile()) {
      // Not a file, try to serve index.html for SPA routing
      const indexPath = path.join(__dirname, 'dist', 'index.html');
      fs.readFile(indexPath, (err, data) => {
        if (err) {
          res.writeHead(404, { 'Content-Type': 'text/plain' });
          res.end('404 - File not found');
        } else {
          res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
          res.end(data);
        }
      });
    } else {
      // Serve the requested file
      fs.readFile(filePath, (err, data) => {
        if (err) {
          res.writeHead(404, { 'Content-Type': 'text/plain' });
          res.end('404 - File not found');
        } else {
          res.writeHead(200, { 'Content-Type': contentType });
          res.end(data);
        }
      });
    }
  });
});

server.listen(PORT, () => {
  console.log(`
╔════════════════════════════════════════════════════════════════╗
║  🚀 React Server running at http://localhost:${PORT}                ║
║  📍 Home Page: http://localhost:${PORT}/                          ║
║  📍 Work Page: http://localhost:${PORT}/work                       ║
║                                                                ║
║  ✅ React app ready!                                           ║
║  📦 Built from dist folder                                    ║
║  🔄 For development, use 'npm run dev' instead               ║
╚════════════════════════════════════════════════════════════════╝
  `);
});
