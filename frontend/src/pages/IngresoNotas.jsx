import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './IngresoNotasStyle.css';

// Emojis clasificados por sentimiento
const emojisFelices = ['😊', '😄', '😁', '😆', '😃', '😀', '🙂', '😍', '🥳', '🌞'];
const emojisTristes = ['😢', '😞', '😔', '😟', '😫', '😩', '😭', '😖', '😞', '😓'];
const frasesPositivas = [
    // Frases positivas predefinidas...
];

const IngresoNotas = () => {
    const [emojiActual, setEmojiActual] = useState(emojisFelices[0]);
    const [frasePositiva, setFrasePositiva] = useState('');
    const [fechaHora, setFechaHora] = useState('');
    const [nota, setNota] = useState('');

    useEffect(() => {
        mostrarFrasePositiva();
    }, []);

    const mostrarFrasePositiva = () => {
        const indiceAleatorio = Math.floor(Math.random() * frasesPositivas.length);
        const frase = frasesPositivas[indiceAleatorio];
        setFrasePositiva(frase);

        const ahora = new Date();
        setFechaHora(ahora.toLocaleString());
    };

    const cambiarEmoji = () => {
        const indice = (emojisFelices.indexOf(emojiActual) + 1) % emojisFelices.length;
        setEmojiActual(emojisFelices[indice]);
    };

    const generarFrasePositiva = async () => {
        try {
            const response = await fetch('http://localhost:3000/generate-positive-phrase', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ prompt: nota })
            });

            if (response.ok) {
                const data = await response.json();
                setFrasePositiva(data.positiveMessage);
            } else {
                console.error('Error en la solicitud:', response.statusText);
            }
        } catch (error) {
            console.error('Error generando frase positiva:', error);
        }
    };

    const analizarSentimiento = async () => {
        try {
            const response = await fetch('http://localhost:3000/analyze-sentiment', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ text: nota })
            });

            if (response.ok) {
                const data = await response.json();
                const sentiment = data.sentiment;

                // Selección de emoji según el valor de sentimiento
                if (sentiment >= 0.8) {
                    setEmojiActual(emojisFelices[9]); // Emoji muy feliz (🌞)
                } else if (sentiment >= 0.6) {
                    setEmojiActual(emojisFelices[8]); // Emoji feliz (🥳)
                } else if (sentiment >= 0.4) {
                    setEmojiActual(emojisFelices[3]); // Emoji neutral o ligeramente feliz (😆)
                } else if (sentiment >= 0.2) {
                    setEmojiActual(emojisTristes[0]); // Emoji ligeramente triste (😢)
                } else {
                    setEmojiActual(emojisTristes[8]); // Emoji muy triste (😓)
                }
            } else {
                console.error('Error en la solicitud:', response.statusText);
            }
        } catch (error) {
            console.error('Error analizando el sentimiento:', error);
        }
    };

    const handleSaveNote = async () => {
        await analizarSentimiento();
        await generarFrasePositiva();
    };

    return (
        <div className="contenedor">
            <div className="panel-izquierdo">
                <div id="contenedorEmoji" className="contenedor-emoji" onClick={cambiarEmoji}>
                    {emojiActual}
                </div>
                <div className="contenedor-frase" onClick={mostrarFrasePositiva}>
                    <p id="frasePositiva">{frasePositiva}</p>
                    <p id="fechaHora">{fechaHora}</p>
                </div>
            </div>
            <div className="panel-derecho">
                <div id="bienvenida">
                    <p id="mensaje">¡Qué bueno verte! Gracias por cuidar de ti. Tu bienestar es nuestra prioridad.</p>
                </div>
                <textarea
                    id="entradaNota"
                    placeholder="Escribe tu nota aquí..."
                    value={nota}
                    onChange={(e) => setNota(e.target.value)}
                ></textarea>
                <div className="contenedor-botones">
                    <div id="noteButtons">
                        <button className="guardarNota" onClick={handleSaveNote}>Guardar Nota</button>
                        <Link to={'/notas'}>
                            <button className="verNotas">Leer Notas</button>
                        </Link>
                    </div>
                    <Link to={'/'}>
                        <button className="botonSalir">Salir</button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default IngresoNotas;

