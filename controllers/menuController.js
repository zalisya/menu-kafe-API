// controllers/menuController.js
const Menu = require('../models/Menu'); // Import Model (pintu ke database MongoDB)

// 1. Menangani pembuatan menu baru (POST)
const createMenu = async (req, res) => {
    try {
        let { nama, kategori, harga, stok, tersedia } = req.body;

        // Aturan Bisnis: Harga & Stok tidak boleh negatif
        if (harga < 0 || stok < 0) {
            return res.status(400).json({
                success: false,
                message: "Harga dan stok tidak boleh negatif (< 0)"
            });
        }

        // Aturan Bisnis: Otomatisasi status ketersediaan
        if (stok === 0) {
            tersedia = false;
        } else if (stok > 0 && tersedia === undefined) {
            tersedia = true;
        }

        // Simpan data permanen ke database MongoDB lewat Model Mongoose
        const newMenu = await Menu.create({
            nama, kategori, harga, stok, tersedia
        });

        // Respon sukses (HTTP 201 Created)
        res.status(201).json({
            success: true,
            message: "Menu berhasil ditambahkan",
            data: newMenu
        });

    } catch (error) {
        // Penanganan galat validasi skema
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
};

// 2. Menangani pengambilan seluruh daftar menu (GET)
const getAllMenu = async (req, res) => {
    try {
        // Mengambil seluruh dokumen dari koleksi 'menus' di MongoDB
        const menus = await Menu.find();

        // Respon sukses (HTTP 200 OK)
        res.status(200).json({
            success: true,
            count: menus.length,
            data: menus
        });

    } catch (error) {
        // Penanganan error internal server (HTTP 500)
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// 3. Menangani Update Menu Berdasarkan ID (PUT/PATCH)
const updateMenu = async (req, res) => {
    try {
        const { id } = req.params; // Mengambil ID dari Path Parameter URL
        
        // Mongoose mencari data berdasarkan ID lalu mengupdate dengan data baru dari req.body
        const updatedMenu = await Menu.findByIdAndUpdate(id, req.body, { 
            new: true, // Mengembalikan data yang sudah baru, bukan data lama
            runValidators: true // Memastikan aturan Schema Mongoose tetap dicek saat update
        });

        if (!updatedMenu) {
            return res.status(404).json({ success: false, message: "Menu tidak ditemukan" });
        }

        res.status(200).json({
            success: true,
            message: "Menu berhasil diperbarui",
            data: updatedMenu
        });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

// 4. Koki Keempat: Menangani Hapus Menu Berdasarkan ID (DELETE)
const deleteMenu = async (req, res) => {
    try {
        const { id } = req.params; // Mengambil ID dari Path Parameter URL

        const deletedMenu = await Menu.findByIdAndDelete(id);

        if (!deletedMenu) {
            return res.status(404).json({ success: false, message: "Menu tidak ditemukan" });
        }

        res.status(200).json({
            success: true,
            message: "Menu berhasil dihapus",
            data: {}
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

module.exports = { createMenu, getAllMenu, updateMenu, deleteMenu };