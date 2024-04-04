
const express = require('express');
const router = express.Router();
const foundDiscs = require('../models/foundDiscs');
const mutler = require('multer');
const joi = require('joi');
const upload = mutler({ dest: 'uploads/' });

const postSchema = joi.object({
    discName: joi.string().required(),
    color: joi.string().required(),
    locationFound: joi.string().required(),
    finderNumber: joi.string().required()
});


router.post('/', upload.single('image'), async (req, res) => {
    try {
        const body = JSON.parse(req.body.data);
        await postSchema.validateAsync(body)

        const { discName, color, locationFound, finderNumber } = body;
        const imageFileName = req.file.filename;

        foundDiscs.addFoundDisc(discName, color, locationFound, finderNumber, imageFileName, (err, result) => {
            if (err) {
                console.error('Error executing query', err);
                return res.status(500).send(err);
            }
            res.status(201).send('Disc added to database');
        });

    }
    catch (error) {
        console.error('Error executing query', error);
        return res.status(500).send(error);

    }
}
)


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
