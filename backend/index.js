const express = require('express');

const app = express();
const dotenv = require('dotenv').config();

app.use(express.json());



const foundDiscs = require('../routes/foundDiscs');
const lostDiscs = require('../routes/lostDiscs');

app.use('/leitud', foundDiscs);
app.use('/kaotatud', lostDiscs);



app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
