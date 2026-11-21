// models/Menu.js - Layer Model
const mongoose = require('mongoose');

// Bikin aturan cetakan data (Schema) untuk Menu Kafe
const menuSchema = new mongoose.Schema({
    nama: {
        type: String,
        required: true,
        trim: true,
        minlength: 2,
        maxlength: 100 
    },
    kategori: {
        type: String,
        required: true,
        enum: ['Kopi', 'Non-Kopi', 'Pastry', 'Makanan'] // Hanya nerima nilai dari daftar ini
    },
    harga: {
        type: Number,
        required: true,
        min: 0 // Aturan BR-02: Harga nggak boleh minus
    },
    stok: {
        type: Number,
        required: true,
        min: 0, // Aturan BR-02: Stok nggak boleh minus
        default: 0
    },
    tersedia: {
        type: Boolean,
        default: false
    }
}, {
    // Fitur bawaan Mongoose untuk otomatis bikin field createdAt dan updatedAt
    timestamps: true 
});

// Export modelnya biar nanti bisa dipanggil sama Controller
module.exports = mongoose.model('Menu', menuSchema);