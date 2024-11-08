import { useState, useEffect } from "react";

export function RoomieCard({ userName, biografia, ubicacion, id, correo, intereses, preferencias, carrera, genero }) {

    // Obtener el estado inicial de favoritos del localStorage
    const [isFav, setIsFav] = useState(() => {
        const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
        return favorites.includes(id);
    });

    const handleClick = () => {
        setIsFav(prevIsFav => {
            const newIsFav = !prevIsFav;

            // Actualizar el localStorage
            const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
            if (newIsFav) {
                favorites.push(id);
            } else {
                const index = favorites.indexOf(id);
                if (index > -1) {
                    favorites.splice(index, 1);
                }
            }
            localStorage.setItem('favorites', JSON.stringify(favorites));
            return newIsFav;
        });
    };

    
/* Por el momento trabajar con datos de prueba y localstorage 
// Obtener el estado inicial de favoritos desde la base de datos
    const [isFav, setIsFav] = useState(false);

    // Función para verificar si el usuario es favorito al montar el componente
    const fetchIsFavorite = async () => {
        try {
            const response = await fetch(`/api/`); // Endpoint para verificar si el usuario es favorito, agregar enpoint correspondiente
            if (!response.ok) {
                throw new Error('Error al obtener el estado de favorito');
            }
            const data = await response.json(); // Convertir la respuesta a JSON
            setIsFav(data.isFavorite); // Actualizar el estado con el valor obtenido
        } catch (error) {
            console.error(error.message); // Manejo de errores
        }
    };

    // useEffect para verificar si el usuario es favorito al montar el componente
    useEffect(() => {
        fetchIsFavorite(); // Llamar a la función para verificar si es favorito
    }, [id]);

    // Función para manejar el clic en el botón de favorito
    const handleClick = async () => {
        const newIsFav = !isFav; // Cambiar el estado de favorito

        // Actualizar el estado local
        setIsFav(newIsFav);

        try {
            if (newIsFav) {
                // Agregar a favoritos
                await fetch(`/api/`, {//endpoint para agregar un favorito
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ userId: id }), // Enviar el ID del usuario para agregarlo a favoritos
                });
            } else {
                // Eliminar de favoritos
                await fetch(`/api/`, {
                    method: 'DELETE', // Endpoint para eliminar de favoritos
                });
            }
        } catch (error) {
            console.error('Error al actualizar favoritos:', error.message); // Manejo de errores
            // Revertir el estado local en caso de error
            setIsFav(!newIsFav);
        }
    };*/ 


    //vista de perfil para enviar mensaje
    
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

    const sendMessage = ()=>{
        window.alert("Mensaje enviado");
        /*logica para enviar mensaje, se completara una vez se puedan usar los usuarios de prueba*/ 
       
        closeModal();
    }


    return (
        <article className="bg-white shadow-md rounded-lg p-4 min-w-[900px]">
            <header className="flex items-center mb-4">
                <img className="w-16 h-16 rounded-full mr-4" src="src/img-prueba.jpeg" alt={`${userName} perfil`} />
                <div>
                    <strong>{userName}</strong>
                    <p>{biografia}</p>
                    <span className="text-sm text-gray-500">Ubicación: {ubicacion}</span>
                </div>
            </header>

            <aside className="flex justify-between">
                <button
                    className={`py-2 px-4 rounded ${isFav ? 'bg-[#0092BC] text-white' : 'bg-gray-200 text-black'}`}
                    onClick={handleClick}
                >
                    {isFav ? 'Favorito' : 'Agregar a Favoritos'}
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
                                <h1 className="font-bold text-2xl">{userName}</h1>
                                <p className="text-gray-500 text-2sm">{correo}</p>
                            </div>
                        </div>

                        <div className="flex flex-w mb-4 text-center">
                            <div className="w-1/3">
                                <h2 className="font-bold text-md">Genero</h2>
                                <p className="text-md">{genero}</p>
                            </div>
                            <div className="w-1/3">
                                <h2 className="font-bold text-md">Carrera</h2>
                                <p className="text-md">{carrera}</p>
                            </div>
                            <div className="w-1/3">
                                <h2 className="font-bold text-md">Año de ingreso</h2>
                                <p className="text-md">2021</p>
                            </div>
                            
                        </div>

                        <div className="mb-4">
                            <h2 className="font-bold text-md">Biografía:</h2>
                            <p className="text-md text-justify">{biografia}</p>
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
                                <div className="grid grid-cols-2 gap-2">
                                    {preferencias.map((preferencia, index) => (
                                        <p key={index} className="text-sm bg-[#0092BC] text-white px-2 py-1 rounded-full">
                                            {preferencia}
                                        </p>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <form >
                        <div className="mb-4 flex flex-col">
                            <label htmlFor="Asunto" className="font-bold">Asunto:</label>
                            <input type="text" className="rounded border border-gray-600 my-3 py-1" />
                            <textarea
                                name="message"
                                id="message"
                                rows="4"
                                className="bg-gray-300 rounded p-2 text-sm border border-gray-300 w-full resize-none"
                                placeholder="Escribe tu mensaje aquí..."
                            />
                        </div>

                        <div className="flex justify-end">
                            <button  type="submit" className="bg-[#0092BC] hover:bg-[#007a9a] text-white font-bold py-2 px-4 rounded-lg mr-2" onClick={sendMessage}>
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


