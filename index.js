const express = require('express');

const app = express();
const PORT = 3000;

app.use(express.json());

const receiptValidator = (req, res, next) => {
    const receipt = req.body;
    if (!receipt.retailer || !receipt.purchaseDate || !receipt.purchaseTime || !receipt.items || !receipt.total) {
        return res.status(400).send('Reciept missing required fields.');
    }
    next();
};

app.post('/receipts/process', receiptValidator, (req, res) => {
    res.status(200).send('Hello /receipts/process');
});

app.get('/receipts/:id/points', (req, res) => {
    const id = req.params.id;
    res.status(200).send(`Hello /receipts/${id}/points`);
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});