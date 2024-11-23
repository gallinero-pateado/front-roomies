import { useState, useEffect } from "react";
import axios from 'axios';

export function RoomieFavCard({ IdFavorito,UsuarioId,UsuarioFavoritoId  }) {
    
    
    //obtener los datos adicionales del roomie
    const [roomie, setRoomie] = useState({})
    const [user, setUser]= useState({})
    const [intereses, setIntereses] = useState([]);
    const [preferencias, setPreferencias] = useState([]);

    

    useEffect(()=>{
        const fetchRoomie = async ()=>{

            try{
                const userResponse = await axios.get(`http://localhost:8080/UsuarioId/${UsuarioFavoritoId}`)
                const roomieRespone = await axios.get(`http://localhost:8080/UsuarioRoomie/${UsuarioFavoritoId}`)

                 // Convertir el campo 'intereses' a un array
                const interesesArray = roomieRespone.data.Intereses.split(',');
                    // Convertir el campo 'preferencias' a un array
                const preferencesArray = roomieRespone.data.Preferencias.split(',');

                setRoomie(roomieRespone.data)
                setUser(userResponse.data)
                    

                // Agregar el array de intereses al estado 
                setIntereses(interesesArray);  
                setPreferencias(preferencesArray);
            }catch(error){
                console.error('Error al obtener datos del perfil:', error)
                window.alert('No se pudo cargar la información del usuario. Inténtalo más tarde.');
            }
        }
        fetchRoomie();
    },[UsuarioFavoritoId])

    
    const handleClick = async () => {

        try{
            await axios.delete(`http://localhost:8080/FavoritosRoomie/${IdFavorito}`,{
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('authToken')}`
                }
            })  
            window.alert("Usuario eliminado de favoritos con exito");
        }catch(error){
            console.error("Error al eliminar de favoritos", error);

        }

    };

    //modal para manejar las etiquetas de int y pref
    const [isModalOpen, setIsModalOpen] = useState(false); // Estado para controlar el modal

    // Abrir el modal
    const openModal = () => {
        setIsModalOpen(true);
    };

    // Cerrar el modal
    const closeModal = () => {
        setIsModalOpen(false);
    };

    const [subject, setSubject] = useState("");
    const [message, setMessage] = useState("");

    const sendMessage = async (e)=>{

        e.preventDefault();

        if (!subject || !message) {
            window.alert('Por favor, completa todos los campos antes de enviar el mensaje.');
            return;
        }
        
        try {
            const userMessague = 
            { 
                EmisorId: UsuarioId,
                ReceptorId: UsuarioFavoritoId,
                Asunto: subject,
                Contenido: message,
                Estado:'No leida',
                
            };            

            await axios.post(`http://localhost:8080/MensajesRoomie`, userMessague,{
                headers: {
                    'Content-Type': 'application/json '
                    //'Authorization': `Bearer ${localStorage.getItem('authToken')}`
                    
                  }
            })

            setSubject('');
            setMessage('');

            window.alert("Mensaje enviado con exito")

        }catch(error){
            console.error("Error al enviar el mensaje", error);
        }
        closeModal();
    }


    return (
        <article className="bg-white shadow-md rounded-lg p-4 min-w-[900px]">
            <header className="flex items-center mb-4">
                <img className="w-16 h-16 rounded-full mr-4" src="src/img-prueba.jpeg" alt={`${user.Nombres} perfil`} />
                <div>
                    <strong>{user.Nombres} {user.Apellidos}</strong>
                    <p>{user.Correo}</p>
                    <span className="text-sm text-gray-500">{roomie.Biografia}</span>
                </div>
            </header>

            <aside className="flex justify-between">
                <button
                    className={`py-2 px-4 rounded 'bg-[#FFD166] text-[#1D4157]`}
                    onClick={handleClick}
                >
                    Favorito
                </button>
                <button type="button" className="py-2 px-4 bg-[#0092BC] text-white rounded" onClick={openModal}>
                    Ver perfil
                </button>
            </aside>

            {isModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                    <div className="bg-white rounded-lg shadow-lg p-5 w-full max-w-lg min-w-[850px] max-h-[90vh] overflow-y-auto">
                        <div className="flex items-center gap-6 mb-4">
                            <img src="" alt="imagen de perfil" className="rounded-full w-16 h-16" />
                            <div className="flex flex-col">
                                <h1 className="font-bold text-2xl">{user.Nombres} {user.Apellidos}</h1>
                                <p className="text-gray-500 text-2sm">{user.Correo}</p>
                            </div>
                        </div>

                        <div className="flex flex-w mb-4 text-center">
                            <div className="w-1/3">
                                <h2 className="font-bold text-md">Genero</h2>
                                <p className="text-md">{roomie.Genero}</p>
                            </div>
                            <div className="w-1/3">
                                <h2 className="font-bold text-md">Carrera</h2>
                                <p className="text-md">{user.Id_carrera}</p>
                            </div>
                            <div className="w-1/3">
                                <h2 className="font-bold text-md">Año de ingreso</h2>
                                <p className="text-md">{user.Ano_ingreso}</p>
                            </div>
                            
                        </div>

                        <div className="mb-4">
                            <h2 className="font-bold text-md">Biografía:</h2>
                            <p className="text-md text-justify">{roomie.Biografia}</p>
                        </div>

                        <div className="flex gap-4 mb-4">
                            <div className="w-1/2">
                                <h2 className="font-bold text-md">Intereses:</h2>
                                <div className="grid grid-cols-2 gap-2">
                                    {intereses.map((interes, index) => (
                                        <p key={index} className="text-sm bg-[#0092BC] text-white px-2 py-1 rounded-full">
                                            {interes}
                                        </p>
                                    ))}
                                </div>
                            </div>

                            <div className="w-1/2">
                                <h2 className="font-bold text-md">Preferencias:</h2>
                                {preferencias.map((preferencia, index) => (
                                        <p key={index} className="text-sm bg-[#0092BC] text-white px-2 py-1 rounded-full">
                                            {preferencia}
                                        </p>
                                    ))}
                            </div>
                        </div>

                        <form onSubmit={sendMessage}>
                        <div className="mb-4 flex flex-col">
                            <label htmlFor="Asunto" className="font-bold">Asunto:</label>
                            <input type="text" className="rounded border border-gray-600 my-3 py-1" value={subject} onChange={(e)=>setSubject(e.target.value)} />
                            <textarea
                                name="message"
                                id="message"
                                value={message}
                                onChange={(e)=>setMessage(e.target.value)}
                                rows="4"
                                className="bg-gray-300 rounded p-2 text-sm border border-gray-300 w-full resize-none"
                                placeholder="Escribe tu mensaje aquí..."
                            />
                        </div>

                        <div className="flex justify-end">
                            <button  type="submit" className="bg-[#0092BC] hover:bg-[#007a9a] text-white font-bold py-2 px-4 rounded-lg mr-2" >
                                Enviar mensaje
                            </button>
                            <button onClick={closeModal} className="text-gray-500 hover:text-gray-700">Cancelar</button>
                        </div>
                        </form>
                        
                    </div>
                </div>

            )
            }
        </article>
    );
}

