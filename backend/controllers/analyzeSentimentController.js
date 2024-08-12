async function queryHuggingFace(data) {
    const response = await fetch(
        "https://api-inference.huggingface.co/models/nlptown/bert-base-multilingual-uncased-sentiment",
        {
            headers: {
                Authorization: "Bearer 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",
                "Content-Type": "application/json",
            },
            method: "POST",
            body: JSON.stringify(data),
        }
    );
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
}

exports.analyzeSentiment = async (req, res) => {
    const { text } = req.body;
    if (!text) {
        return res.status(400).send('Text is required');
    }

    try {
        const inputText = text.toLowerCase();
        const data = { inputs: inputText };
        const response = await queryHuggingFace(data);

        if (response[0] && response[0].length > 0) {
            const sentimentData = response[0];
            let sentiment = 'NEUTRAL';
            let highestScore = 0;

            sentimentData.forEach(item => {
                const { label, score } = item;
                if (score > highestScore) {
                    highestScore = score;
                    sentiment = label;
                }
            });

            if (highestScore > 0.6) {
                sentiment = 'POSITIVE';
            } else if (highestScore < 0.5) {
                sentiment = 'NEGATIVE';
            } else {
                sentiment = 'NEUTRAL';
            }    

            res.json({ sentiment, score: highestScore });
        } else {
            throw new Error('No sentiment data found in the response');
        }
    } catch (error) {
        console.error('Error analyzing sentiment:', error);
        res.status(500).send('Error analyzing sentiment');
    }
}