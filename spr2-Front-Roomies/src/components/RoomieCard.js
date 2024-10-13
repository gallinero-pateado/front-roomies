import { useState } from "react";

export function RoomieCard({ key,userName, info, ubicacion, isFav: initialFav }) {
    
    // Usa el estado para manejar si es favorito o no
    const [isFav, setIsFav] = useState(initialFav);
    
    const handleClick = () => {
        setIsFav(!isFav);
    };

    /* Esta es la funcion que se encarga de eliminar o actualizar un favorio en el perfil del usuariom se debe borrar la de arriba en la version fnal
    const handleClick = async () => {
        setIsFav(!isFav);
        try {
        //poner la url del endopint correspondiente
            await fetch(`/api/favorites/${key}`, {// no estoy segunro si la id que se pasa es del favorito o del perfil que lo tiene de favorito
                method: isFav ? 'DELETE' : 'POST',// si  es fav, lo elimina de la lsita de favoritos, sino lo añade
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ userId }),
            });
        } catch (error) {
            console.error('Error al actualizar favorito:', error);
        }*/

    return (
        <article className="bg-white shadow-md rounded-lg p-4 min-w-[900px] ">
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
