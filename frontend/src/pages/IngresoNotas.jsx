import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./IngresoNotasStyle.css";
import { saveNote } from "../services/noteServices";
import { saveNoteToMongo } from "../services/mongoNoteServices";
import { analyzeSentiment } from "../services/sentimentServices";
import { generatePositivePhrase } from "../services/positivePhraseServices";

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
    const storedUser = JSON.parse(localStorage.getItem("currentUser"));
    if (storedUser) {
      setCurrentUser(storedUser.USUARIO);
    }

    const interval = setInterval(() => {
      const ahora = new Date();
      setFechaHora(ahora.toLocaleString("es-ES"));
    }, 1000); // Actualiza cada segundo

    return () => clearInterval(interval); // Limpia el intervalo al desmontar el componente
  }, []);

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

  const handleDiscuss = async () => {
    try {
      const sentiment = await analyzeSentiment(nota)
      console.log(sentiment)
      if (sentiment === "POSITIVE") {
        setEmojiActual(emojisFelices[4]);
      } else if (sentiment === "NEUTRAL") {
        setEmojiActual(emojisNeutrales[2]);
      } else if (sentiment === "NEGATIVE") {
        setEmojiActual(emojisTristes[4]);
      }

      const positivePhrase = await generatePositivePhrase(nota)
      setFrasePositiva(positivePhrase)
      leerFrasePositiva(positivePhrase)

      const data = await saveNoteToMongo(nota)
      if (data.message === 'Nota guardada exitosamente') {
        console.log('Nota guardada exitosamente en MongoDB');
      } else {
        console.log('Error al guardar la nota en MongoDB');
      }
    } catch (error) {
      console.error('Error al procesar la nota:', error);
    }
  };
  
  const handleSaveNote = async () => {
    try {
      const response = await saveNote(nota, currentUser);
      if (response.message === "Nota guardada exitosamente") {
        alert("Nota guardada exitosamente");
      } else {
        alert("Error al guardar la nota");
      }
    } catch (error) {
      console.error("Error al guardar la nota:", error);
      alert("Error al guardar la nota");
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
              ¡Qué bueno verte, {currentUser}! Gracias por cuidar de ti. Tu
              bienestar es nuestra prioridad.
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
            <Link to={"/historial"}>
              <button className="verNotas">Leer Notas</button>
            </Link>
            <div className="contenedor-salir">
              <Link to={"/"}>
                <button className="botonSalir">Salir</button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IngresoNotas;