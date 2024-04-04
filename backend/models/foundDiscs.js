const db = require('../database');

const FoundDiscModel = {
    addFoundDisc: function (discName, color, locationFound, finderNumber, imageFileName, callback) {
        db.query('INSERT INTO FoundDisc (discName, color, locationFound, finderNumber,imageFileName) VALUES (?,?,?,?,?)',
            [discName, color, locationFound, finderNumber,imageFileName],
            (err, result) => {
                if (err) {
                    console.error('Error executing query', err);
                    return callback(err, null);
                }
                callback(null, result);
            }
        );
    },

    getAllFoundDiscs: function (callback) {
        db.query('SELECT * FROM FoundDisc', (err, result) => {
            if (err) {
                console.error('Error executing query', err);
                return callback(err, null);
            }
            callback(null, result);
        });
    }
};

module.exports = FoundDiscModel;
