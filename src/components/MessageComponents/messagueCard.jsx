import React, { useEffect, useState,useContext } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { ThemeContext } from "../../context/ThemeContext";
import themeStyles from "../Const/themes"
const apiurl = "https://api-roomies.tssw.info";

const MessagueCard = ({
  Id,
  Emisor,
  Receptor,
  Asunto,
  Contenido,
  FechaHoraEnvio,
  Estado,
}) => {
  
  const { theme } = useContext(ThemeContext);
  const styles = themeStyles[theme]; // Obtener estilos según el tema
  const [isModalOpen, setIsModalOpen] = useState(false); // Estado para controlar el modal
  const [messageStatus, setMessageStatus] = useState(""); // Estado para controlar si está "leído" o "no leído"
  const [userData, setUserData] = useState({});

  const authToken = Cookies.get("authToken");

  //obtener toda la informacion de un mensaje por su id
  useEffect(() => {
    const fetchMessage = async () => {
      try {
        const userResponse = await axios.get(`${apiurl}/UsuarioId/${Emisor}`); //obtener datos del emisor
        const data = userResponse.data.usuario;

        setMessageStatus(Estado);
        console.log(messageStatus);
        setUserData(data);
      } catch (error) {
        console.error("Error al cargar el mensaje", error);
      }
    };
    fetchMessage();
  }, [Emisor]);

  // Abrir el modal
  const openModal = async () => {
    if (messageStatus !== "leido") {
      setMessageStatus("leido");
      try {
        const setEstado = {
          Estado: "leido",
        };

        await axios.put(`${apiurl}/MensajesRoomie/${Id}`, setEstado, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authToken}`,
          },
        });
      } catch (error) {
        console.error("No se pudo leer el mensaje", error);
      }
    }
    setIsModalOpen(true);
    setSubject(Asunto)
  };

  // Cerrar el modal
  const closeModal = () => {
    setIsModalOpen(false);
  };

  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  const sendResponse = async (e) => {
    e.preventDefault();

    try {
      const userMessague = {
        EmisorId: Receptor, // receptor es el usuario logeado
        ReceptorId: Emisor, // emisor es quien envio primero el mensaje
        Asunto: "Respuesta a :" + subject,
        Contenido: message,
        Estado: "No leido",
      };

      await axios.post(`${apiurl}/MensajesRoomie`, userMessague, {
        headers: {
          "Content-Type": "application/json ",
          Authorization: `Bearer ${authToken}`,
        },
      });



      window.alert("Mensaje enviado con exito");
    } catch (error) {
      console.error("Error al enviar el mensaje", error);
    }

    setMessage("");
    closeModal();
  };

  return (
    <article
      className={`shadow-md rounded-lg p-4 min-w-[900px] ${
        messageStatus === "leido" ? "bg-[#A3D9D3]" : "bg-white"
      }`}
    >
      <header className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          <img
            className="w-16 h-16 rounded-full mr-4"
            src={userData.Foto_perfil}
            alt={`${userData.Nombres} perfil`}
          />
          <div className="flex flex-col">
            <h2 className={`${styles.inputText} font-bold`}>
              {userData.Nombres} {userData.Apellidos}
            </h2>
            <p className={`${styles.inputText}`}>{userData.Correo}</p>
          </div>
        </div>

        <div>
          <h2 className={`${styles.inputText} font-bold text-2xl font-bold`}>Asunto:</h2>
          <p className={`${styles.inputText}  runcate w-48`}>{Asunto}</p>
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

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className={`${styles.card}  rounded-lg shadow-lg p-5 w-full max-w-lg min-w-[850px] max-h-[90vh] overflow-y-auto`}>
            <div className="mt-4">
              <div className="flex items-center gap-6 mb-4">
                <img
                  src={userData.Foto_perfil}
                  alt={`${userData.Nombres} perfil`}
                  className="rounded-full w-16 h-16"
                />
                <div className="flex flex-col">
                  <h1 className={`${styles.text} font-bold text-2xl`}>
                    {userData.Nombres} {userData.Apellidos}
                  </h1>
                  <p className="text-gray-500 text-2sm">{userData.Correo}</p>
                </div>
              </div>
              <div className="mb-4">
                <h2 className={`${styles.text} font-bold text-2xl font-bold`}>Asunto:</h2>
                <p className={`${styles.text} text-justify`}>{Asunto}</p>
              </div>
              <div className="mb-4">
                <h2 className={`${styles.text} font-bold text-2xl font-bold`}>Mensaje:</h2>
                <p className={`${styles.text} text-justify`}>{Contenido}</p>
              </div>
              <div className="mb-4">
                <h2 className={`${styles.text} font-bold text-2xl font-bold`}>Fecha envio</h2>
                <p className="text-black text-gray-500 text-m">{FechaHoraEnvio}</p>
              </div>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows="4"
                className={`${styles.inputText} bg-gray-300 rounded p-2 text-lg border border-gray-300 w-full box-border resize-none max`}
                placeholder="Escribe tu respuesta aquí..."
              ></textarea>
              <button
                className="bg-[#0092BC] hover:bg-[#007a9a] text-white font-bold py-2 px-4 rounded-lg"
                onClick={sendResponse}
              >
                Enviar respuesta
              </button>
            </div>

            <div className="mt-auto flex justify-end">
              <button
                className="bg-[#f00000] hover:bg-[#CA0C0CFF] text-white"
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
