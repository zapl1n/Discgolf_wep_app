
const db = require('../database');

const LostDiscModel = {
    addLostDisc: function (discName, color, locationLost, ownerNumber, callback) {
        db.query('INSERT INTO LostDisc (discName, color, locationLost, ownerNumber) VALUES (?,?,?,?)',
            [discName, color, locationLost, ownerNumber],
            (err, result) => {
                if (err) {
                    console.error('Error executing query', err);
                    return callback(err);
                }
                callback(null, result);
            }
        );
    },

    getAllLostDiscs: function (callback) {
        db.query('SELECT * FROM LostDisc', (err, result) => {
            if (err) {
                console.error('Error executing query', err);
                return callback(err);
            }
            callback(null, result);
        });
    }
};

module.exports = LostDiscModel;