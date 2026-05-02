// Import modul http dari Node.js
import * as http from 'http';

// Tentukan port yang akan digunakan
const PORT = 3000;

// Buat server HTTP
const server = http.createServer((req, res) => {
  // Ambil URL dan metode HTTP dari objek request
  const rawUrl = req.url || '/';
  const method = req.method || 'GET';

  // Parsing URL untuk memisahkan path dari query string
  const parsedUrl = new URL(rawUrl, `http://localhost:${PORT}`);
  const path = parsedUrl.pathname;

  // Tampilkan log di terminal (untuk debugging)
  console.log(`[${new Date().toLocaleTimeString()}] ${method} ${path}`);

  // --- ROUTING MANUAL DENGAN PERCABANGAN ---

  // Rute: GET /
  if (path === '/' && method === 'GET') {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end('<h1>🏠 Halaman Utama</h1><p>Selamat datang di server Node.js + TypeScript!</p>');
  }
  // Rute: GET /about
  else if (path === '/about' && method === 'GET') {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end('<h1>📄 Tentang Kami</h1><p>Ini adalah contoh routing manual sederhana.</p>');
  }
  // Rute: GET /api/users (mengembalikan data JSON)
  else if (path === '/api/users' && method === 'GET') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify([
      { id: 1, name: 'Alice' },
      { id: 2, name: 'Bob' }
    ]));
  }
  // Rute: POST /api/users (simulasi tambah user)
  else if (path === '/api/users' && method === 'POST') {
    res.writeHead(201, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: 'User berhasil dibuat' }));
  }
  // Jika tidak ada rute yang cocok → 404 Not Found
  else {
    res.writeHead(404, { 'Content-Type': 'text/html' });
    res.end('<h1>❌ 404 - Halaman Tidak Ditemukan</h1>');
  }
});

// Jalankan server, dengarkan di port yang ditentukan
server.listen(PORT, () => {
  console.log(`🚀 Server berjalan di http://localhost:${PORT}`);
});