require('dotenv').config();
const bodyParser = require('body-parser');
const express = require('express');
const { fetchBankInfo } = require('./parser');
const app = express();

app.use(bodyParser.json());

app.get('/banks', async (req, res) => {
    try {
        const data = await fetchBankInfo();
        res.json({ data, error: null });
    } catch (err) {
        res.json({ error: true, message: 'Something went wrong!' });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`App successfully stated on PORT :: ${PORT}!`);
});
