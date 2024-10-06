import { useState } from "react";

export function RoomieCard({ key,userName, info, ubicacion, isFav: initialFav }) {
    
    // Usa el estado para manejar si es favorito o no
    const [isFav, setIsFav] = useState(initialFav);
    const botonFav = isFav ? 'RoomieCard-button is-fav' : 'RoomieCard-button';

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
        <article className='RoomieCard'>
            <header className='RoomieCard-header'>
                <img className="RoomieCard-img" src="src/img-prueba.jpeg" alt={`${userName} perfilImg`} />
                <div className='RoomieCard-info'>
                    <strong>{userName}</strong>
                    <p>{info}</p>
                    <span className='RoomieCard-infoUserName'>Ubicación: {ubicacion}</span>
                </div>
            </header>

            <aside>
                <button className={botonFav} onClick={handleClick}>
                    {isFav ? 'Favorito' : 'Agregar a Favoritos'}
                </button>
                <button className='RoomieCard-button'>Mensaje</button>
            </aside>
        </article>
    );
}
