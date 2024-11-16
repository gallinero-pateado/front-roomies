import React, { useEffect, useState } from "react";
import MessagueCard from './messagueCard';

const Message = () => {
    const [messages, setMessages] = useState([]);
    const [isEnviaods, setIsEnviaods] = useState(true); // Estado para controlar la vista de Enviados o Recibidos

    useEffect(() => {
        // Obtener los mensajes del localStorage
        const storedMessages = JSON.parse(localStorage.getItem("userMessages")) || [];
        console.log("Mensajes cargados:", storedMessages); // Verifica si los mensajes están cargados correctamente
        setMessages(storedMessages);
    }, []); // Solo se ejecuta una vez, al cargar el componente

    // Cambia la vista a Enviados o Recibidos
    const toggleEdit = (estado) => {
        setIsEnviaods(estado === "Enviado");
    };

    // Mensajes recibidos de prueba; en unificación se traerán desde la BD
    const mensajesRecibidos = [
        { id: 1, receptor: "Sebastian Poblete", emisor: "Arthur Morgan", correo: "amorgan@gmail.com", fechaEnvio: "01/01/01 00:00:00", asunto: "Mensaje de prueba", mensaje: "Hola soy arthur morgan, este es un mensaje de prueba", estado: "Recibido", estMensaje: "Recibido" },
        { id: 2, receptor: "Sebastian Poblete", emisor: "Valeria Henriquez", correo: "vhenriquez@gmail.com", fechaEnvio: "01/01/01 00:00:01", asunto: "Mensaje de prueba 2", mensaje: "Hola soy valeria, este es otro mensaje de prueba", estado: "Recibido", estMensaje: "Recibido" },
        { id: 3, receptor: "Sebastian Poblete", emisor: "Valeria Henriquez", correo: "vhenriquez@gmail.com", fechaEnvio: "01/01/01 00:10:01", asunto: "Mensaje de prueba 3", mensaje: "Hola soy valeria, este es otro mensaje de prueba, parte 2", estado: "Recibido", estMensaje: "Recibido" },
    ];

    const mensajesAMostrar = isEnviaods ? messages : mensajesRecibidos;

    return (
        <section className="flex flex-wrap gap-4 p-4">
            <div className="flex gap-10">
                <button 
                    className="bg-[#007a9a] hover:bg-[#7B4B94] text-white font-bold py-2 px-4 rounded-lg" 
                    onClick={() => toggleEdit("Recibido")}
                >
                    Recibidos
                </button>
                <button 
                    className="bg-[#007a9a] hover:bg-[#7B4B94] text-white font-bold py-2 px-4 rounded-lg" 
                    onClick={() => toggleEdit("Enviado")}
                >
                    Enviados
                </button>
            </div>

            {mensajesAMostrar
                .map((message) => (
                    <MessagueCard
                        key={message.id}
                        id={message.id}
                        receptor={message.receptor}
                        emisor={message.emisor}
                        correo={message.correo}
                        fechaEnvio={message.fechaEnvio}
                        asunto={message.asunto}
                        mensaje={message.mensaje}
                        estado={message.estado}
                        estMensaje={message.estMensaje} // Utiliza el estado del mensaje
                    />
                ))}
        </section>
    );
};

export default Message;
