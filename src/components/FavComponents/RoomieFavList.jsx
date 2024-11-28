import { useEffect, useState } from "react";
import { RoomieFavCard } from '../RoomieComponents/RoomieFavCard';
import axios from "axios";
import Cookies from 'js-cookie';


export function RoomiesFavList() {
    const [favoriteUsers, setFavoriteUsers] = useState([]);
    const [loading, setLoading] = useState(true); 
    const [error, setError] = useState(null);

    const id = parseInt(Cookies.get('roomieId'));
    
    useEffect(()=>{
        const fetchFav = async () =>{
            try {
                const response = await axios.get(`http://localhost:8080/FavoritosRoomie/${id}`)
                const data = response.data;
                 setFavoriteUsers(data);//guardar los favoritos del usuario
                 console.log(data);
            }catch(error){
                console.error("Error al conseguir los roomies favoritos",error);
            }
            finally{
                setLoading(false);
            }
        }
        fetchFav();
    },[id]);

    if (loading) {
        return <div>Cargando usuarios favoritos...</div>;
    }

    return (
        <section className="flex flex-wrap gap-4 p-4">
            {favoriteUsers.map((user) => (
                <RoomieFavCard
                    key={user.id_favorito}
                    IdFavorito={user.id_favorito}
                    UsuarioId={user.usuario_id}
                    UsuarioFavoritoId={user.usuario_favorito_id}
                />
            ))}
        </section>
    );
}
