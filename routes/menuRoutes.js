// routes/menuRoutes.js
const express = require('express');
const router = express.Router(); // Fitur Express untuk memecah rute[cite: 101]

// Import Koki (Controller) yang udah kita bikin tadi
const { createMenu, getAllMenu, updateMenu, deleteMenu } = require('../controllers/menuController');

// Posisi Alur: Klien (Postman) ngirim request HTTP POST ke endpoint ini -> Router menangkap -> melempar data ke Controller 'createMenu'[cite: 112]
router.post('/menus', createMenu);

// Posisi Alur: Klien (Postman) ngirim GET -> Route menangkap -> dilempar ke koki 'getAllMenu'
router.get('/menus', getAllMenu);
router.put('/menus/:id', updateMenu);
router.delete('/menus/:id', deleteMenu);

// Export router biar bisa dicolok ke saklar utama (index.js)
module.exports = router;