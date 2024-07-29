const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { HfInference } = require('@huggingface/inference');

const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());

// Inicializa el cliente de inferencia con tu clave API
const inference = new HfInference('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');

app.post('/generate-positive-phrase', async (req, res) => {
    const { prompt } = req.body;

    try {
        // Crea una lista de mensajes para el modelo
        const messages = [{ role: 'user', content: prompt }];
        const chunks = [];

        // Usa chatCompletionStream para obtener la respuesta del modelo
        for await (const chunk of inference.chatCompletionStream({
            model: 'mistralai/Mistral-Nemo-Instruct-2407',
            messages: messages,
            max_tokens: 500,
        })) {
            chunks.push(chunk.choices[0]?.delta?.content || '');
        }

        // Une todos los fragmentos de respuesta en una sola cadena
        const positiveMessage = chunks.join('') || 'No se pudo generar un mensaje positivo.';

        res.json({ positiveMessage });
    } catch (error) {
        console.error('Error generating positive phrase:', error.message);
        res.status(500).send(`Error generating positive phrase: ${error.message}`);
    }
});

app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});
