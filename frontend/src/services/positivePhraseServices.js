export const generatePositivePhrase = async (nota) => {
    try {
      const response = await fetch(
        "http://localhost:3000/api/generate-positive-phrase",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            prompt: `Actua como si fueras un asesor motivacional y responde a esto: ${nota}`,
          }),
        }
      );
  
      if (response.ok) {
        const data = await response.json();
        return data.positiveMessage;
      } else {
        console.error("Error en la solicitud:", response.statusText);
      }
    } catch (error) {
      console.error("Error generando frase positiva:", error);
    }
};  