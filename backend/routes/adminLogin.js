const express = require('express');
const router = express.Router();
const { login, approve, deny, deletePost } = require('../controllers/adminLoginController');
const authMiddleware = require('../middlewares/auth');

// POST päring administraatori sisselogimiseks või lisamiseks andmebaasi
router.post('/login', login);
router.post('/approve/:id', authMiddleware, approve);
router.post('/deny/:id', authMiddleware, deny);
router.delete('/delete/:id', authMiddleware, deletePost);
//router.post('/deny', authMiddleware, deny);

module.exports = router;
