import express from 'express';
import { v4 as uuidv4 } from 'uuid';

import { calculatePoints } from './util.js';

const app = express();
const pointsStore = new Map();
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
    const reciept = req.body;

    const id = uuidv4();
    const points = calculatePoints(reciept);
    pointsStore.set(id, points);

    res.status(200).send({
        "id": id
    });
});

app.get('/receipts/:id/points', (req, res) => {
    const id = req.params.id;

    if (!pointsStore.has(id)) { 
        return res.status(404).send('Receipt not found.');
    }
    
    const points = pointsStore.get(id);
    res.status(200).send({
        "points": points
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});