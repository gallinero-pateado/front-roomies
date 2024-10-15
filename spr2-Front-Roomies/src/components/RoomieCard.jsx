import { useState, useEffect } from "react";

export function RoomieCard({ userName, info, ubicacion, id }) {
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
            const response = await fetch(`/api/}`); // Endpoint para verificar si el usuario es favorito
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
                await fetch(`/api/`, {//ennpoint para agregar un favorito
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


    return (
        <article className="bg-white shadow-md rounded-lg p-4 min-w-[900px]">
            <header className="flex items-center mb-4">
                <img className="w-16 h-16 rounded-full mr-4" src="src/img-prueba.jpeg" alt={`${userName} perfil`} />
                <div>
                    <strong>{userName}</strong>
                    <p>{info}</p>
                    <span className="text-sm text-gray-500">Ubicación: {ubicacion}</span>
                </div>
            </header>

            <aside className="flex justify-between">
                <button
                    className={`py-2 px-4 rounded ${isFav ? 'bg-red-500 text-white' : 'bg-gray-200 text-black'}`}
                    onClick={handleClick}
                >
                    {isFav ? 'Favorito' : 'Agregar a Favoritos'}
                </button>
                <button className="py-2 px-4 bg-[#0091BD] text-white rounded">
                    Mensaje
                </button>
            </aside>
        </article>
    );
}
