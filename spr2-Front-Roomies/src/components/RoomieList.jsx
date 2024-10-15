import { useState } from "react";
import { RoomiesList } from "./RoomiesList";
import { RoomiesFavList } from "./RoomiesFavList";

export function RoomiesContainer() {
    const [favorites, setFavorites] = useState([]);

    const toggleFavorite = (userId) => {
        setFavorites((prevFavorites) => {
            if (prevFavorites.includes(userId)) {
                // Si ya es favorito, lo eliminamos
                return prevFavorites.filter((id) => id !== userId);
            } else {
                // Si no es favorito, lo agregamos
                return [...prevFavorites, userId];
            }
        });
    };

    return (
        <div>
            <RoomiesList toggleFavorite={toggleFavorite} />
            <RoomiesFavList favorites={favorites} />
        </div>
    );
}
