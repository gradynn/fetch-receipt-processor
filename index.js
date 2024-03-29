import express from 'express';
import { v4 as uuidv4 } from 'uuid';
import dotenv from 'dotenv';
import rateLimit from 'express-rate-limit';

import { calculatePoints } from './util.js';

dotenv.config();

// Setup
const app = express();
const pointsStore = new Map();
const PORT = process.env.PORT || 3000;

// Rate Limiting
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100
});
app.use(limiter);
app.use(express.json());

// Validator Middleware
const receiptSchemaValidator = (req, res, next) => {
    const receipt = req.body;
    if (!receipt.retailer || !receipt.purchaseDate || !receipt.purchaseTime || !receipt.items || !receipt.total) {
        return res.status(400).send('Reciept missing required fields.');
    }
    next();
};

/**
 * POST /receipts/process
 * 
 * Process a receipt, calculate points and store points in the pointsStore.
 */
app.post('/receipts/process', receiptSchemaValidator, (req, res) => {
    const reciept = req.body;

    const id = uuidv4();
    const points = calculatePoints(reciept);
    pointsStore.set(id, points);

    res.status(200).send({
        "id": id
    });
});


/**
 * GET /receipts/:id/points
 * 
 * Get the points for a receipt.
 * @param {string} id - The id of the receipt.
 */
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