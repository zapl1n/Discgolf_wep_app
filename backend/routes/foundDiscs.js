
const express = require('express');
const router = express.Router();
const foundDiscs = require('../models/foundDiscs');

router.post('/', (req, res) => {
    const { discName, color, locationFound, finderNumber } = req.body;
    foundDiscs.addFoundDisc(discName, color, locationFound, finderNumber, (err, result) => {
        if (err) {
            console.error('Error executing query', err);
            return res.status(500).send(err);
        }
        res.status(201).send('Disc added to database');
    });
});
    
router.get('/', (req, res) => {
    foundDiscs.getAllFoundDiscs((err, result) => {
        if (err) {
            console.error('Error executing query', err);
            return res.status(500).send(err);
        }
        res.status(200).send(result);
    });
});


module.exports = router;
