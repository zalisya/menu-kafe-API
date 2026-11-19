// index.js
const express = require('express');
const app = express();
const connectDB = require('./config/db'); 
connectDB(); // Eksekusi fungsi koneksi database

const PORT = 5000;

// Middleware: biar server kita ngerti kalau dikirimi data berbentuk JSON
app.use(express.json());

// 1. Import router yang baru aja lu bikin
const menuRoutes = require('./routes/menuRoutes');

// 2. Daftarin router-nya. 
// Mulai sekarang, semua request klien yang menuju awalan '/api' bakal dioper ke menuRoutes
app.use('/api', menuRoutes);

// Route ngetes doang
app.get('/', (req, res) => {
    res.send('Server Kafe sudah jalan!');
});

app.listen(PORT, () => {
    console.log(`Server API Kafe jalan di http://localhost:${PORT}`);
});