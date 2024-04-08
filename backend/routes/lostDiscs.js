
const express = require('express');
const router = express.Router();
const LostDiscModel = require('../models/lostDiscs');

router.post('/', (req,res) =>{
    const { discName, color, locationLost, ownerNumber } = req.body;
    LostDiscModel.addLostDisc(discName, color, locationLost, ownerNumber, (err, result) => {
        if (err) {
            console.error('Error executing query', err);
            return res.status(500).send(err);
        }
        res.status(201).send('Disc added to database');
    });
});

router.get('/', auth, (req, res) => {
    LostDiscModel.getAllLostDiscs((err, result) => {
        if (err) {
            console.error('Error executing query', err);
            return res.status(500).send(err);
        }
        res.status(200).send(result);
    })
})


module.exports = router;