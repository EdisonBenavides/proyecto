const API_URL_SENTIMENT_ANALYSIS = 'http://localhost:3000/api/analyze-sentiment';

export const analyzeSentiment = async (text) => {
  try {
    const response = await fetch(API_URL_SENTIMENT_ANALYSIS, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ text }),
    });

    if (!response.ok) {
      throw new Error('Network response was not OK');
    }

    const data = await response.json();
    return data.sentiment;
  } catch (error) {
    console.error('Error analyzing sentiment:', error);
    throw error;
  }
};
