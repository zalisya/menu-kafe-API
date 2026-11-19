// config/db.js - Layer Konfigurasi Database
const mongoose = require('mongoose');

// Fungsi asynchronous untuk menyambungkan server ke MongoDB[cite: 93, 116]
const connectDB = async () => {
    try {
        // Alamat default MongoDB lokal. 'kafe_db' adalah nama database lu nanti.
        const conn = await mongoose.connect('mongodb://127.0.0.1:27017/kafe_db');
        console.log(`MongoDB Terhubung: ${conn.connection.host}`);
    } catch (error) {
        console.error(`Error Koneksi MongoDB: ${error.message}`);
        // Mematikan server secara paksa (exit code 1) jika database gagal terhubung
        process.exit(1); 
    }
};

// Mengekspor fungsi connectDB agar bisa digunakan di file lain[cite: 75]
module.exports = connectDB;