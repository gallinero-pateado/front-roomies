import { useState, useEffect,useContext } from "react";
import axios from "axios";
import { debounce } from "lodash";
import Cookies from "js-cookie";
import ReportForm from "../ReportComponents/ReportForm";
import { ThemeContext } from "../../context/ThemeContext";
import themeStyles from "../Const/themes"

const apiurl = "https://api-roomies.tssw.info";

export function RoomieCard({
  ID,
  Roomie,
  Correo,
  Nombres,
  Apellidos,
  Id_carrera,
  Foto_perfil,
  Ano_Ingreso,
  Genero,
  Biografia,
  Intereses,
  Preferencias,
  Ubicacion,
  favoritos,
  FotoPerfil,
}) {

  const { theme } = useContext(ThemeContext);
  const styles = themeStyles[theme]; // Obtener estilos según el tema
    
  const [isFav, setIsFav] = useState(false); // Obtener el estado inicial de favoritos del localStorage
  const [idFav, setIdFav] = useState("");
  const [isReportFormOpen, setIsReportFormOpen] = useState(false);

  const authToken = Cookies.get("authToken");

  const id = parseInt(Cookies.get("roomieId"));

  useEffect(() => {
    const favFound = favoritos.find((user) => user.usuario_favorito_id === ID);
    setIsFav(!!favFound);
    setIdFav(favFound?.id_favorito || "");
  }, [favoritos, ID]);

  const handleClick = debounce(async () => {
    try {
      if (isFav) {
        await axios.delete(`${apiurl}/FavoritosRoomie/${idFav}`, {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        });
        window.alert("Usuario Eliminado de favoritos a favoritos");
        setIsFav(false);
      } else {
        console.log(id);
        const newFav = {
          usuario_id: id,
          usuario_favorito_id: ID,
        };
        await axios.post(`${apiurl}/FavoritosRoomie`, newFav, {
          headers: {
            "Content-Type": "application/json ",
            Authorization: `Bearer ${authToken}`,
          },
        });
        window.alert("Usuario añadido a favoritos");
        setIsFav(true);
      }
    } catch (error) {
      console.error("Error al editar el favorito");
    }
  }, 300); //espera 300ms antes de realizar la solicitud

  //modal para manejar las etiquetas de int y pref
  const [isModalOpen, setIsModalOpen] = useState(false); // Estado para controlar el modal

  // Abrir el modal
  const openModal = () => {
    setIsModalOpen(true);
    console.log(FotoPerfil)
  };

  // Cerrar el modal
  const closeModal = () => {
    setIsModalOpen(false);
  };

  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  const sendMessage = async (e) => {
    e.preventDefault();

    if (!subject || !message) {
      window.alert(
        "Por favor, completa todos los campos antes de enviar el mensaje."
      );
      return;
    }

    try {
      const userMessague = {
        EmisorId: id,
        ReceptorId: ID,
        Asunto: subject,
        Contenido: message,
        Estado: "No leida",
      };

      await axios.post(`${apiurl}/MensajesRoomie`, userMessague, {
        headers: {
          "Content-Type": "application/json ",
          Authorization: `Bearer ${authToken}`,
        },
      });

      window.alert("Mensaje enviado con exito");
      setMessage("");
      setSubject("");
    } catch (error) {
      console.error("Error al enviar el mensaje", error);
    }
    closeModal();
  };

  const openReportForm = () => {
    setIsReportFormOpen(true);
  };

  const closeReportForm = () => {
    setIsReportFormOpen(false);
  };
  return (
    <article className={`${styles.card} shadow-md rounded-lg p-4 w-full max-w-[900px] mx-auto`}>
        <header className="flex flex-col sm:flex-row items-center mb-4">
            <img className="w-16 h-16 rounded-full mr-4 mb-4 sm:mb-0" src={Foto_perfil} alt={`${Nombres} perfil`} />
            <div className="text-center sm:text-left">
                <strong>{Nombres} {Apellidos} </strong>
                <p>{Correo}</p>

                <p className="text-sm sm:block hidden">{Biografia}</p>
                <span className="text-sm text-gray-500">Ubicación: {Ubicacion}</span>
            </div>
        </header>

        <aside className="flex flex-col sm:flex-row justify-between sm:items-center">
            <button
                className={`py-2 px-4 rounded mb-2 sm:mb-0 ${isFav ? 'bg-[#FFD166] text-[#1D4157]' : 'bg-gray-200 text-black'}`}
                onClick={handleClick}
            >
                {isFav ? 'Favorito' : 'Agregar a Favoritos'}
            </button>
            <div className="flex flex-col sm:flex-row gap-4" >
            <button type="button" className="py-2 px-4 bg-[#0092BC] text-white rounded sm:mb-0" onClick={openModal}>
                Ver perfil
            </button>
            <button onClick={openReportForm}
                        className="py-2 px-4 text-white rounded bg-gray-500 hover:bg-gray-700">
                        Reportar
            </button>
            </div>
            
        </aside>

        {isModalOpen && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                <div className={`${styles.card} rounded-lg shadow-lg p-5 w-full max-w-lg sm:max-w-2xl lg:max-w-4xl min-w-[300px] max-h-[90vh] overflow-y-auto`}>
                    <div className="flex items-center gap-6 mb-4">
                    <img src={Foto_perfil} alt="imagen de perfil" className="w-32 h-32 rounded-full"  />
                        <div className="flex flex-col">
                            <h1 className={`${styles.text} font-bold text-2xl `}>{Nombres}  {Apellidos} </h1>
                            <p className="text-gray-500 text-2sm">{Correo}</p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4 text-center">
                    <div >
                            <h2 className="font-bold text-md">Ubicacion</h2>
                            <p className="text-md">{Ubicacion}</p>
                        </div>
                        <div >
                            <h2 className="font-bold text-md">Genero</h2>
                            <p className="text-md">{Genero}</p>
                        </div>
                        <div >
                            <h2 className="font-bold text-md">Carrera</h2>
                            <p className="text-md">{Id_carrera}</p>
                        </div>
                        <div >
                            <h2 className="font-bold text-md">Año de ingreso</h2>
                            <p className="text-md">{Ano_Ingreso}</p>
                        </div>
                        
                    </div>

                    <div className="mb-4">
                        <h2 className="font-bold text-md">Biografía:</h2>
                        <p className="text-md text-justify">{Biografia}</p>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4 mb-4">
                        <div className="w-full sm:w-1/2">
                            <h2 className="font-bold text-md">Intereses:</h2>
                            <div className="grid grid-cols-2 gap-2">
                                {Intereses.map((interes, index) => (
                                    <p key={index} className="text-sm bg-[#0092BC] font-bold text-center text-white px-2 py-1 mb-2 rounded-xl">
                                        {interes}
                                    </p>
                                ))}
                            </div>
                        </div>

                        <div className="w-full sm:w-1/2">
                            <h2 className="font-bold text-md">Preferencias:</h2>
                            <div className="grid grid-cols-2 gap-2">
                                {Preferencias.map((preferencia, index) => (
                                    <p key={index} className="text-sm bg-[#0092BC] font-bold text-center text-white px-2 py-1 mb-2 rounded-xl">
                                        {preferencia}
                                    </p>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/*Formulario de mensaje */}
                    <form onSubmit={sendMessage} >
                    <div className="mb-4 flex flex-col">
                        <label htmlFor="Asunto" className="font-bold">Asunto:</label>
                        <input type="text" className={`${styles.inputText} ${styles.inputBg} rounded border border-gray-600 my-3 py-1`} value={subject} onChange={(e)=>setSubject(e.target.value)} />
                        <textarea
                            name="message"
                            id="message"
                            value={message}
                            onChange={(e)=>setMessage(e.target.value)}
                            rows="4"
                            className={`${styles.inputText} bg-gray-300 rounded p-2 text-lg border border-gray-300 w-full box-border resize-none max`}
                            placeholder="Escribe tu mensaje aquí..."
                        />
                    </div>

                    <div className="flex justify-end">
                    
                        <button  type="submit" className="bg-[#0092BC] hover:bg-[#007a9a] text-white font-bold py-2 px-4 rounded-lg mr-2" >
                            Enviar mensaje
                        </button>
                        <button onClick={closeModal} className=" bg-[#f00000] hover:bg-[#CA0C0CFF] text-white">Cancelar</button>
                    </div>
                    </form>
                    
                </div>
            </div>
        )
        }
        {isReportFormOpen && (
              <ReportForm
                reportedUserId={ID}
                reportingUserId={id}
                onClose={closeReportForm}
              />
            )}
    </article>
);
}


