const express = require('express');
const bodyParser = require('body-parser');
const tf = require('@tensorflow/tfjs');
const cors = require('cors');

const app = express();
const port = 3001;

app.use(cors());
app.use(bodyParser.json());

let model;

async function loadModel() {
    if (!model) {
        model = await tf.loadLayersModel('https://storage.googleapis.com/tfjs-models/tfjs/sentiment_cnn_v1/model.json');
    }
    return model;
}

async function analyzeSentiment(text) {
    const model = await loadModel();
    const inputText = text.toLowerCase().replace(/[^a-zA-Z0-9\s]/g, '').split(' ');
    const inputTensor = tf.tensor2d([inputText.map(word => word.length)], [1, inputText.length]);
    const prediction = model.predict(inputTensor);
    const sentiment = prediction.dataSync()[0];
    console.log(sentiment)
    return sentiment;
}

app.post('/analyze-sentiment', async (req, res) => {
    const { text } = req.body;
    try {
        const sentimentScore = await analyzeSentiment(text);
        res.json({ sentiment: sentimentScore });
    } catch (error) {
        console.error('Error analyzing sentiment:', error);
        res.status(500).send('Error analyzing sentiment');
    }
});

app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});
