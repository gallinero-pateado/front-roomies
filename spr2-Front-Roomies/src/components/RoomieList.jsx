import { useState, useEffect } from "react";
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

export function RoomiesList({ toggleFavorite }) {
    const [users, setUsers] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredUsers, setFilteredUsers] = useState(users);
  
    useEffect(() => {
      // Simula una llamada a una API para obtener los usuarios
      const fetchUsers = async () => {
        const response = await fetch('/api/users'); // Ajusta la URL según tu API
        const data = await response.json();
        setUsers(data);
      };
  
      fetchUsers();
    }, []);
  
    useEffect(() => {
      setFilteredUsers(
        users.filter(user =>
          user.name.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    }, [searchTerm, users]);
  
    return (
      <div>
        <input
          type="text"
          placeholder="Buscar usuario..."
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
        />
        <div>
          {filteredUsers.map(user => (
            <RoomieCard
              key={user.id}
              userName={user.name}
              info={user.info}
              ubicacion={user.ubicacion}
              id={user.id}
              toggleFavorite={toggleFavorite}
            />
          ))}
        </div>
      </div>
    );
  }
