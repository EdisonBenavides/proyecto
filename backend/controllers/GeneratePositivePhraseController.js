const { HfInference } = require('@huggingface/inference');

const inference = new HfInference('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');

exports.generatePositivePhrase = async (req, res) => {
    const { prompt } = req.body;

    if (!prompt || typeof prompt !== 'string' || prompt.trim() === '') {
        return res.status(400).json({ positiveMessage: 'Por favor, proporciona un prompt válido.' });
    }

    try {
        const messages = [{ role: 'user', content: prompt }];
        const chunks = [];

        for await (const chunk of inference.chatCompletionStream({
            model: 'mistralai/Mistral-Nemo-Instruct-2407',
            messages: messages
        })) {
            chunks.push(chunk.choices[0]?.delta?.content || '');
        }

        const positiveMessage = chunks.join('') || 'No se pudo generar un mensaje positivo.';

        res.json({ positiveMessage });
    } catch (error) {
        console.error('Error generating positive phrase:', error.message);
        res.status(500).send(`Error generating positive phrase: ${error.message}`);
    }
};
