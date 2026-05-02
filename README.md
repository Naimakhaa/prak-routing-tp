# prak-routing-tp
web-routing-typescript

Routing Manual dengan Node.js + TypeScript
Proyek ini merupakan implementasi routing manual menggunakan Node.js dan TypeScript, tanpa framework tambahan. Dibuat sebagai bagian dari praktikum mata kuliah Pemrograman Web Lanjutan.

📁 Struktur Folder
project-node/
├── package.json
├── tsconfig.json
└── src/
    └── server.ts

⚙️ Cara Menjalankan
1. Pastikan Node.js sudah terinstall
bashnode --version
2. Install dependensi
bashnpm install
3. Jalankan server
bashnpm start
Server akan berjalan di http://localhost:3000

🗺️ Daftar Rute
MethodPathDeskripsiResponseGET/Halaman 
utamaHTMLGET/aboutHalaman 
tentang kamiHTMLGET/api/usersAmbil semua data userJSONPOST/api/usersTambah user baruJSONSemua*Rute tidak ditemukanHTML 404

🧪 Cara Menguji
Buka browser dan akses URL berikut:

http://localhost:3000/ → Halaman Utama
http://localhost:3000/about → Halaman About
http://localhost:3000/api/users → Data user dalam format JSON

Untuk menguji metode POST, gunakan curl di terminal:
bashcurl -X POST http://localhost:3000/api/users

🔍 Penjelasan Kode
1. Import Modul http
typescriptimport * as http from 'http';
Berbeda dengan Bun yang sudah menyediakan global Bun, Node.js memerlukan import modul http secara eksplisit. Modul ini adalah bawaan Node.js sehingga tidak perlu install tambahan.

2. Membuat Server dengan http.createServer()
typescriptconst server = http.createServer((req, res) => {
    // handler dipanggil setiap ada request masuk
});
http.createServer() menerima sebuah callback yang akan dipanggil setiap kali ada request masuk. Callback ini menerima dua parameter:

req — objek request, berisi informasi dari klien (URL, method, headers, body)
res — objek response, digunakan untuk mengirim balasan ke klien


3. Membaca URL dan Method
typescriptconst rawUrl = req.url || '/';
const method = req.method || 'GET';

const parsedUrl = new URL(rawUrl, `http://localhost:${PORT}`);
const path = parsedUrl.pathname;
req.url berisi path lengkap seperti /about?name=john, sehingga perlu di-parse terlebih dahulu menggunakan new URL() agar bisa mengambil hanya bagian pathname-nya saja (/about). Tanpa ini, query string bisa menyebabkan perbandingan di routing gagal.

4. Routing Manual dengan if-else
typescript// Rute: GET /
if (path === '/' && method === 'GET') {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end('<h1>🏠 Halaman Utama</h1><p>Selamat datang di server Node.js + TypeScript!</p>');
}
// Rute: GET /about
else if (path === '/about' && method === 'GET') {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end('<h1>📄 Tentang Kami</h1><p>Ini adalah contoh routing manual sederhana.</p>');
}
// Rute: GET /api/users
else if (path === '/api/users' && method === 'GET') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify([
        { id: 1, name: 'Alice' },
        { id: 2, name: 'Bob' }
    ]));
}
// Rute: POST /api/users
else if (path === '/api/users' && method === 'POST') {
    res.writeHead(201, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: 'User berhasil dibuat' }));
}
// 404 Not Found
else {
    res.writeHead(404, { 'Content-Type': 'text/html' });
    res.end('<h1>❌ 404 - Halaman Tidak Ditemukan</h1>');
}
Setiap kondisi memeriksa kombinasi path dan method. Inilah inti dari routing manual yang dapat menentukan rute mana yang merespons request tertentu.

5. Mengirim Respons dengan res.writeHead() dan res.end()
typescript// Respons HTML
res.writeHead(200, { 'Content-Type': 'text/html' });
res.end('<h1>Halaman Utama</h1>');

// Respons JSON
res.writeHead(200, { 'Content-Type': 'application/json' });
res.end(JSON.stringify([{ id: 1, name: 'Alice' }]));

// Respons dengan status code berbeda (201 Created)
res.writeHead(201, { 'Content-Type': 'application/json' });
res.end(JSON.stringify({ message: 'User berhasil dibuat' }));
Di Node.js, mengirim respons dilakukan dalam dua langkah:

res.writeHead(statusCode, headers) — menulis status code dan headers
res.end(data) — mengirim body respons dan menutup koneksi


6. Menjalankan Server
typescriptserver.listen(PORT, () => {
    console.log(`🚀 Server berjalan di http://localhost:${PORT}`);
});
server.listen() membuat server mulai mendengarkan koneksi masuk di port yang ditentukan. Callback di dalamnya hanya dijalankan sekali saat server berhasil start.