// routes/menuRoutes.js
const express = require('express');
const router = express.Router(); // Fitur Express untuk memecah rute[cite: 101]

// Import Koki (Controller) yang udah kita bikin tadi
const { createMenu, getAllMenu, updateMenu, deleteMenu } = require('../controllers/menuController');

router.post('/menus', createMenu);
router.get('/menus', getAllMenu);
router.put('/menus/:id', updateMenu);
router.delete('/menus/:id', deleteMenu);

// Export router biar bisa dicolok ke saklar utama (index.js)
module.exports = router;