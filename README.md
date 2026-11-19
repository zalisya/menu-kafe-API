# REST API Manajemen Menu Kafe

Aplikasi backend **REST API** untuk mengelola data menu kafe menggunakan **Node.js**, **Express.js**, dan **MongoDB**. Proyek ini disusun dengan arsitektur modular untuk memenuhi ketentuan **Final Project Study Club Backend Basic**.

---

## Teknologi yang Digunakan

* **Runtime Environment:** Node.js
* **Web Framework:** Express.js
* **Database:** MongoDB (NoSQL Document Database)
* **ODM (Object Data Modeling):** Mongoose *(Asumsi: digunakan sesuai praktik integrasi Express + MongoDB pada materi Pertemuan 7)*
* **API Testing:** Postman

---

## Arsitektur & Struktur Folder

Proyek ini menerapkan konsep **Modular Routing & Separation of Concerns** dengan alur komunikasi:
`Client (Postman)` $\rightarrow$ `index.js (Entrypoint)` $\rightarrow$ `routes/` $\rightarrow$ `controllers/` $\rightarrow$ `models/` $\rightarrow$ `Database (MongoDB)`

```text
final_project_basic/
├── config/
│   └── db.js               # Konfigurasi koneksi ke database MongoDB
├── controllers/
│   └── menuController.js   # Logika bisnis, validasi input, dan penanganan HTTP status code
├── models/
│   └── Menu.js             # Definisi Schema dan Model Mongoose untuk koleksi 'menus'
├── routes/
│   └── menuRoutes.js       # Definisi endpoint dan pemetaan HTTP method ke controller
├── index.js                # Entrypoint utama server Express & middleware
├── package.json            # Daftar dependencies dan metadata proyek
└── README.md               # Dokumentasi proyek
```

---

## Prasyarat & Cara Menjalankan Aplikasi

Pastikan **Node.js** dan **MongoDB** (lokal di `mongodb://127.0.0.1:27017` atau MongoDB Atlas) sudah terpasang dan aktif di komputer kamu.

1. **Clone repository ini:**
   ```bash
   git clone <URL_REPOSITORY_GITHUB_KAMU>
   cd final_project_basic
   ```

2. **Install seluruh dependencies:**
   ```bash
   npm install
   ```

3. **Pastikan layanan MongoDB berjalan:**
   Aplikasi akan terhubung secara default ke database lokal `kafe_db` (`mongodb://127.0.0.1:27017/kafe_db`). *(Jika menggunakan file `.env`, sesuaikan variabel koneksi di `config/db.js`)*.

4. **Jalankan server:**
   ```bash
   node index.js
   ```

5. **Verifikasi server aktif:**
   Jika berhasil, terminal akan menampilkan pesan bahwa server berjalan di `http://localhost:5000` dan database MongoDB terhubung.

---

## Daftar Endpoint API

Base URL: `http://localhost:5000/api`

| Method | Endpoint | Deskripsi | Status Code |
| :--- | :--- | :--- | :--- |
| `POST` | `/api/menus` | Menambahkan data menu baru | `201`, `400`/`500` |
| `GET` | `/api/menus` | Mengambil seluruh daftar menu | `200`, `500` |
| `PUT` | `/api/menus/:id` | Memperbarui data menu berdasarkan ID | `200`, `404`, `500` |
| `DELETE` | `/api/menus/:id` | Menghapus data menu berdasarkan ID | `200`, `404`, `500` |

*(Catatan: Rute `PATCH /api/menus/:id` juga dapat diarahkan ke handler pembaruan jika dibutuhkan untuk pembaruan parsial).*

---

## Detail & Contoh Pengujian (Postman)

### 1. Tambah Menu Baru (`POST /api/menus`)
* **Headers:** `Content-Type: application/json`
* **Request Body (`raw` JSON):**
  ```json
  {
    "nama": "Kopi Susu Gula Aren",
    "kategori": "Kopi",
    "harga": 22000,
    "stok": 25
  }
  ```
* **Aturan Validasi:**
  * `harga` dan `stok` tidak boleh bernilai negatif (`< 0`).
  * Jika `stok === 0`, status `tersedia` otomatis diatur ke `false`. Jika `stok > 0` dan `tersedia` tidak diisi, otomatis diatur ke `true`.
* **Contoh Response Sukses (`201 Created`):**
  ```json
  {
    "success": true,
    "message": "Menu berhasil ditambahkan",
    "data": {
      "_id": "6afb101f5d5c70348805ce4e",
      "nama": "Kopi Susu Gula Aren",
      "kategori": "Kopi",
      "harga": 22000,
      "stok": 25,
      "tersedia": true,
      "createdAt": "2026-11-16T14:15:59.886Z",
      "updatedAt": "2026-11-16T14:15:59.886Z",
      "__v": 0
    }
  }
  ```

### 2. Ambil Semua Menu (`GET /api/menus`)
* **Contoh Response Sukses (`200 OK`):**
  ```json
  {
    "success": true,
    "count": 1,
    "data": [
      {
        "_id": "6afb101f5d5c70348805ce4e",
        "nama": "Kopi Susu Gula Aren",
        "kategori": "Kopi",
        "harga": 22000,
        "stok": 25,
        "tersedia": true
      }
    ]
  }
  ```

### 3. Perbarui Menu (`PUT /api/menus/:id`)
* **Path Parameter:** `id` (ObjectId dokumen menu di MongoDB)
* **Request Body (`raw` JSON):**
  ```json
  {
    "harga": 25000
  }
  ```
* **Contoh Response Sukses (`200 OK`):**
  ```json
  {
    "success": true,
    "message": "Menu berhasil diperbarui",
    "data": {
      "_id": "6afb101f5d5c70348805ce4e",
      "nama": "Kopi Susu Gula Aren",
      "kategori": "Kopi",
      "harga": 25000,
      "stok": 25,
      "tersedia": true
    }
  }
  ```
* **Response Gagal (`404 Not Found` - ID tidak ditemukan):**
  ```json
  {
    "success": false,
    "message": "Menu tidak ditemukan"
  }
  ```

### 4. Hapus Menu (`DELETE /api/menus/:id`)
* **Path Parameter:** `id` (ObjectId dokumen menu di MongoDB)
* **Contoh Response Sukses (`200 OK`):**
  ```json
  {
    "success": true,
    "message": "Menu berhasil dihapus",
    "data": {}
  }
  ```
* **Response Gagal (`404 Not Found` - ID tidak ditemukan):**
  ```json
  {
    "success": false,
    "message": "Menu tidak ditemukan"
  }
  ```