const express = require('express');
const router = express.Router();
const adminLoginController = require('../controllers/adminLoginController');

// POST päring administraatori sisselogimiseks või lisamiseks andmebaasi
router.post('/', async (req, res) => {
    try {
        // Kontrollime, kas administraator on juba olemas
        const existingAdmin = await adminLoginController.addAdminToDatabase();

        // Kui administraatorit pole, lisame ta andmebaasi ja logime sisse
        if (!existingAdmin) {
            console.log('Admin added to database');
            await adminLoginController.login(req.body.username, req.body.password, (err, success) => {
                if (err) {
                    console.error('Error logging in:', err);
                    return res.status(500).json({ error: 'Internal server error' });
                }
                if (success) {
                    return res.status(200).json({ message: 'Login successful' });
                } else {
                    return res.status(401).json({ error: 'Unauthorized' });
                }
            });
        } else {
            // Kui administraator on juba olemas, proovime ainult sisse logida
            await adminLoginController.login(req.body.username, req.body.password, (err, success) => {
                if (err) {
                    console.error('Error logging in:', err);
                    return res.status(500).json({ error: 'Internal server error' });
                }
                if (success) {
                    return res.status(200).json({ message: 'Login successful' });
                } else {
                    return res.status(401).json({ error: 'Unauthorized' });
                }
            });
        }
    } catch (error) {
        console.error('Error logging in:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router;
