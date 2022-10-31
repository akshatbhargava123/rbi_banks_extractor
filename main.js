require('dotenv').config();
const bodyParser = require('body-parser');
const express = require('express');
const app = express();

app.use(bodyParser.json());

app.get('/banks', (req, res) => {
    console.log(`received message from ${req.body}`);
    console.log(req.body);
    res.json({ data: [], error: null });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`App successfully stated on PORT :: ${PORT}!`);
});