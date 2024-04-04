const db = require('../database');
const bcrypt = require('bcrypt');
const dotenv = require('dotenv').config();

const adminLogin = {
    addAdminToDatabase: async () => {
        try {
            const adminUsername = process.env.ADMIN_USERNAME;
            const adminPassword = process.env.ADMIN_PASSWORD;


            // Kontrollime, kas administraator on juba olemas
            const existingAdmin = await  db.query('SELECT username, password FROM admin WHERE username = ? AND password = ?', [adminUsername, adminPassword]);


            

            if (existingAdmin.length > 0) {
                console.log('Admin already exists in the database');
                return;
            }
            


            // Kui administraatorit pole, lisame ta andmebaasi
            const hash = await bcrypt.hash(adminPassword, 10);

            const adminData = {
                username: adminUsername,
                password: hash
            };

            const result = await db.query('INSERT INTO admin SET ?', adminData);

            console.log('Admin successfully added to the database:', result);
        } catch (error) {
            console.error('Error adding admin to database:', error);
        }
    },

    login: async function (username, password, callback) {
        try {
            const result = await db.query('SELECT * FROM admin WHERE username = ?', [username]);
            

            if (result.length === 0) {
                return callback(null, false);
            }

            const res = await bcrypt.compare(password, result[0].password);

            if (res) {
                return callback(null, true);
            } else {
                return callback(null, false);
            }
        } catch (error) {
            console.error('Error logging in:', error);
            return callback(error, null);
        }
    }
};

module.exports = adminLogin;
