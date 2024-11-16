import React, { useEffect, useState } from "react";

const MessagueCard = ({ id, receptor, emisor, correo, fechaEnvio, asunto, mensaje, estado, estMensaje }) => {
  const [isModalOpen, setIsModalOpen] = useState(false); // Estado para controlar el modal
  const [messageStatus, setMessageStatus] = useState(estado); // Estado para controlar si está "leído" o "no leído"

  useEffect(() => {
    const savedStatus = localStorage.getItem(`userMessages-${fechaEnvio}`);
    if (savedStatus) {
      setMessageStatus(savedStatus);
    }
  }, [fechaEnvio]);

  // Abrir el modal
  const openModal = () => {
    if (messageStatus !== "leído") {
      setMessageStatus("leído");
      localStorage.setItem(`userMessages-${fechaEnvio}`, "leído");
    }
    setIsModalOpen(true);
  };

  // Cerrar el modal
  const closeModal = () => {
    setIsModalOpen(false);
  };

 

  const [subject, setSubject] = useState("");
    const [message, setMessage] = useState("");

    const sendResponse = (e)=>{

        e.preventDefault();

        //obtener la hora del envio del mensaje
        const now = new Date();
        const formattedDateTime = now.toLocaleString("es-ES", {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
        });

        /*logica para enviar mensaje, En este caso se guardaran los datos del mensaje en el local storague,
        en el repositorio de unificacion se manejaran con las tablas de las bd creadas */
        
        const userMessague = 
            { 
                id: id,//aca va la id del roomie
                emisor:emisor,//en la unificacion, aca el nombre o la id del usuario logeado
                receptor: emisor,
                correo: correo,
                fechaEnvio: formattedDateTime,
                asunto: asunto,
                mensaje: message,
                estado:"recibido",
                estMensaje: "Enviado"

            };
        

        // Obtener los mensajes previos del localStorage o crear una lista nueva
        const existingMessages = JSON.parse(localStorage.getItem("userMessages")) || [];
        // Agregar el nuevo mensaje a la lista de mensajes
        existingMessages.push(userMessague);
        // Guardar la lista actualizada en el localStorage
        localStorage.setItem("userMessages", JSON.stringify(existingMessages));

        console.log(localStorage.getItem("userMessages"));

        window.alert("Mensaje enviado con exito")
       
        closeModal();
    }

  return (
    <article className={`shadow-md rounded-lg p-4 min-w-[900px] ${messageStatus === "leído" ? "bg-[#A3D9D3]" : "bg-white"}`}>
      {estMensaje === "Enviado" && (
        <>
        <header className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              <img className="w-16 h-16 rounded-full mr-4" src="src/img-prueba.jpeg" alt={`${receptor} perfil`} />
              <div className="flex flex-col">
                <h2 className="font-bold">{receptor}</h2>
                <p>{correo}</p>
              </div>
            </div>

            <div>
              <h2 className="font-bold">Asunto:</h2>
              <p className="truncate w-48">{asunto}</p>
            </div>

            <div className="flex items-center">
              <button
                className="bg-[#0092BC] hover:bg-[#007a9a] text-white font-bold py-2 px-4 rounded-lg"
                onClick={openModal}
              >
                Ver mensaje
              </button>
            </div>
          </header>

        </>
      )}

      {estMensaje === "Recibido" && (
        <header className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          <img className="w-16 h-16 rounded-full mr-4" src="src/img-prueba.jpeg" alt={`${emisor} perfil`} />
          <div className="flex flex-col">
            <h2 className="font-bold">{emisor}</h2>
            <p>{correo}</p>
          </div>
        </div>

        <div>
          <h2 className="font-bold">Asunto:</h2>
          <p className="truncate w-48">{asunto}</p>
        </div>

        <div className="flex items-center">
          <button
            className="bg-[#0092BC] hover:bg-[#007a9a] text-white font-bold py-2 px-4 rounded-lg"
            onClick={openModal}
          >
            Ver mensaje
          </button>
        </div>
      </header>
      )}
      

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-5 w-full max-w-lg min-w-[850px] max-h-[90vh] overflow-y-auto flex flex-col">
            {estMensaje === "Recibido" && (
              <div className="mt-4">
                <div className="flex items-center gap-6 mb-4">
                  <img src="src/img-prueba.jpeg" alt="imagen de perfil" className="rounded-full w-16 h-16" />
                  <div className="flex flex-col">
                    <h1 className="font-bold text-2xl">{emisor}</h1>
                    <p className="text-gray-500 text-sm">{correo}</p>
                  </div>
                </div>
                <div className="mb-4">
                    <h2 className="font-bold">Asunto:</h2>
                    <p className="text-justify">{asunto}</p>
                  </div>
                  <div className="mb-4">
                    <h2 className="font-bold">Mensaje:</h2>
                    <p className="text-justify">{mensaje}</p>
                  </div>
                  <div>
                      <p>{fechaEnvio}</p>
                  </div>
                <textarea
                  value={message}
                  onChange={(e)=>setMessage(e.target.value)}
                  rows="4"
                  className="bg-gray-300 rounded p-2 text-sm border border-gray-300 w-full resize-none"
                  placeholder="Escribe tu respuesta aquí..."
                ></textarea>
                <button
                  className="bg-[#0092BC] hover:bg-[#007a9a] text-white font-bold py-2 px-4 rounded-lg"
                  onClick={sendResponse}
                >
                  Enviar respuesta
                </button>
              </div>
            )}

            {estMensaje === "Enviado" && (
              <div className="mt-4">
                <div className="flex items-center gap-6 mb-4">
                <img src="src/img-prueba.jpeg" alt="imagen de perfil" className="rounded-full w-16 h-16" />
                <div className="flex flex-col">
                  <h1 className="font-bold text-2xl">{receptor}</h1>
                  <p className="text-gray-500 text-sm">{correo}</p>
                </div>
              </div>
              <div className="mb-4">
                <h2 className="font-bold">Asunto:</h2>
                <p className="text-justify">{asunto}</p>
              </div>
              <div className="mb-4">
                <h2 className="font-bold">Mensaje:</h2>
                <p className="text-justify">{mensaje}</p>
              </div>
              <div>
                  <p>{fechaEnvio}</p>
              </div>
            </div>
            )}

            <div className="mt-auto flex justify-end">
              <button
                className="bg-[#0092BC] hover:bg-[#007a9a] text-white font-bold py-2 px-4 rounded-lg"
                onClick={closeModal}
              >
                Volver
              </button>
            </div>
          </div>
        </div>
      )}
    </article>
  );
};

export default MessagueCard;
