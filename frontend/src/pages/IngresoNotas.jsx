import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./IngresoNotasStyle.css";
import { saveNote } from '../services/noteServices'

// Emojis clasificados por sentimiento
const emojisFelices = ["😊", "😄", "😁", "😆", "😃"];
const emojisTristes = ["😢", "😞", "😔", "😟", "😓"];
const emojisNeutrales = ["😐", "😑", "😶", "😏", "🤔"];

const IngresoNotas = () => {
  const [emojiActual, setEmojiActual] = useState(emojisFelices[0]);
  const [frasePositiva, setFrasePositiva] = useState("");
  const [fechaHora, setFechaHora] = useState("");
  const [nota, setNota] = useState("");
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('currentUser'));
    if (storedUser) {
      setCurrentUser(storedUser.USUARIO);
    }

    obtenerFrasePositiva();
    const interval = setInterval(() => {
      const ahora = new Date();
      setFechaHora(ahora.toLocaleString("es-ES"));
    }, 1000); // Actualiza cada segundo

    return () => clearInterval(interval); // Limpia el intervalo al desmontar el componente
  }, []);

  const obtenerFrasePositiva = async () => {
    try {
      // Obtener una frase positiva al cargar el componente
      const response = await fetch("http://localhost:3000/api/get-positive-phrase"); // Cambia esta URL según sea necesario
      if (response.ok) {
        const data = await response.json();
        const frase = data.positiveMessage;
        setFrasePositiva(frase);
        leerFrasePositiva(frase);
      } else {
        console.error("Error al obtener frase positiva:", response.statusText);
      }
    } catch (error) {
      console.error("Error al obtener frase positiva:", error);
    }
  };

  const leerFrasePositiva = (frase) => {
    if ("speechSynthesis" in window) {
      const utterance = new SpeechSynthesisUtterance(frase);
      utterance.lang = "es-ES";
      utterance.rate = 1;
      utterance.pitch = 1;
      speechSynthesis.speak(utterance);
    } else {
      console.error("La síntesis de voz no está soportada en este navegador.");
    }
  };

  const cambiarEmoji = () => {
    const indice =
      (emojisFelices.indexOf(emojiActual) + 1) % emojisFelices.length;
    setEmojiActual(emojisFelices[indice]);
  };

  const generarFrasePositiva = async () => {
    try {
      const response = await fetch(
        "http://localhost:3000/api/generate-positive-phrase",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ prompt: `Actua como si fueras un asesor motivacional y responde a esto: ${nota}` }),
        }
      );

      if (response.ok) {
        const data = await response.json();
        setFrasePositiva(data.positiveMessage);
        leerFrasePositiva(data.positiveMessage);
      } else {
        console.error("Error en la solicitud:", response.statusText);
      }
    } catch (error) {
      console.error("Error generando frase positiva:", error);
    }
  };

  const analizarSentimiento = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/analyze-sentiment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text: nota }),
      });

      if (response.ok) {
        const data = await response.json();
        const sentiment = data.sentiment;

        // Selección de emoji según el valor de sentimiento
        if (sentiment === "POSITIVE") {
          setEmojiActual(emojisFelices[4]); // Emoji muy feliz (😃)
        } else if (sentiment === "NEUTRAL") {
          setEmojiActual(emojisNeutrales[2]); // Emoji neutral (😶)
        } else if (sentiment === "NEGATIVE") {
          setEmojiActual(emojisTristes[4]); // Emoji muy triste (😓)
        }
      } else {
        console.error("Error en la solicitud:", response.statusText);
      }
    } catch (error) {
      console.error("Error analizando el sentimiento:", error);
    }
  };

  const handleDiscuss = async () => {
    await analizarSentimiento();
    await generarFrasePositiva();
  };

  const handleSaveNote = async () => {
    try{
      const response = await saveNote(nota, currentUser)
      if (response.message === 'Nota guardada exitosamente') {
        alert('Nota guardada exitosamente');
      } else {
        alert('Error al guardar la nota');
      }
    } catch (error) {
      console.error('Error al guardar la nota:', error);
      alert('Error al guardar la nota');
    }
  };

  return (
    
    <div className="principal-container-notes">
      <div className="contenedor-secundario">
        <div className="panel-izquierdo">
          <div
            id="contenedorEmoji"
            className="contenedor-emoji"
            onClick={cambiarEmoji}
          >
            {emojiActual}
            <p id="fechaHora">{fechaHora}</p>
          </div>
          <div className="contenedor-frase">
            <p id="frasePositiva">{frasePositiva}</p>
            <button className="conversar" onClick={handleDiscuss}>
              Conversa Conmigo
            </button>
          </div>
        </div>
        <div className="panel-derecho">
          <div id="bienvenida">
            <p id="mensaje">
              ¡Qué bueno verte, {currentUser}! Gracias por cuidar de ti. Tu bienestar es
              nuestra prioridad.
            </p>
          </div>
          <textarea
            id="entradaNota"
            placeholder="Escribe tu nota aquí..."
            value={nota}
            onChange={(e) => setNota(e.target.value)}
          ></textarea>
          <div className="contenedor-botones">
            <Link>
              <button className="guardarNotas" onClick={handleSaveNote}>
                Guardar Nota
              </button>
            </Link>
            <Link to={'/historial'}>
              <button className="verNotas">Leer Notas</button>
            </Link>
          </div>
        </div>
        <div className="salir">
        <Link to={"/"}>
              <button className="botonSalir">Salir</button>
        </Link>

        </div>
    

  
      </div>
    </div>
  );
};
export default IngresoNotas;