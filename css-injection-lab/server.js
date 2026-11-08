const http = require('http');
const mysql = require('mysql2');

// Conexão usando as variáveis de ambiente do Podman/Docker
const connection = mysql.createConnection({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || 'your_password',
  database: process.env.DB_NAME || 'cyber_lab'
});

const server = http.createServer((req, res) => {
  if (req.url === '/') {
    connection.query('SELECT secret_token FROM users WHERE username = "admin"', (err, results) => {
      let token = results && results.length > 0 ? results[0].secret_token : 'DEFAULT_TOKEN';

      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.end(`
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <title>Vulnerable Portal - CSS Injection Lab</title>
            <style>
                body { background: #0f172a; color: #38bdf8; font-family: monospace; padding: 40px; }
                .box { border: 1px solid #334155; padding: 20px; background: #1e293b; border-radius: 8px; }
                input { background: #0f172a; border: 1px solid #475569; color: #fff; padding: 10px; width: 100%; font-size: 16px; }
            </style>
        </head>
        <body>
            <div class="box">
                <h2>Admin Panel (Secure DB -> DOM)</h2>
                <p>Secret token retrieved from MySQL injected into the input attribute:</p>
                <input type="text" id="secretField" value="${token}" disabled />
            </div>
        </body>
        </html>
      `);
    });
  } else if (req.url.startsWith('/log')) {
    console.log(`[!] EXFILTRATION DETECTED VIA CSS: ${req.url}`);
    res.writeHead(200);
    res.end('OK');
  }
});

server.listen(3000, () => {
  console.log('Lab running at http://localhost:3000');
});
