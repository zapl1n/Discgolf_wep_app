const express = require('express');
const app = express();

app.use(express.json());

const foundDiscs = require('./routes/foundDiscs');


app.use('/api/disc', foundDiscs);
app.use('/api/admin', require('./routes/adminLogin'));



app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
