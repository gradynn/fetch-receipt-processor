const express = require('express');
const app = express();

const PORT = 3000;

app.post('/reciepts/process', (req, res) => {
    res.status(200).send('Hello /reciepts/process');
});

app.get('/reciepts/:id/points', (req, res) => {
    const id = req.params.id;
    res.status(200).send(`Hello /reciepts/${id}/points`);
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});