// index.js
const express = require('express');
const app = express();
const connectDB = require('./config/db'); 
connectDB(); // Eksekusi fungsi koneksi database

const PORT = 5000;

// Middleware: biar server kita ngerti kalau dikirimi data berbentuk JSON
app.use(express.json());

// 1. Import router
const menuRoutes = require('./routes/menuRoutes');

// 2. Daftarin router-nya. 
// Semua rute yang ada di menuRoutes.js akan diawal dengan '/api'
app.use('/api', menuRoutes);

// Route testing
app.get('/', (req, res) => {
    res.send('Server Kafe sudah jalan!');
});

app.listen(PORT, () => {
    console.log(`Server API Kafe jalan di http://localhost:${PORT}`);
});