import { useEffect, useState } from "react";
import { RoomieCard } from "./RoomieCard";
import Filter from './Filter';

export function RoomiesFavList() {
    const [filters, setFilters] = useState({
        comuna: '',
        intereses: [],
        preferencias: [],
        carrera: '',
    });

    const [favoriteUsers, setFavoriteUsers] = useState([]);
    const [loading, setLoading] = useState(true); // Estado para manejar la carga de datos
    const [error, setError] = useState(null); // Estado para manejar errores

    /*METODO CON LOCALSTORAGE*/ 
    useEffect(() => {
        //obtiene los roomies de prueba del local storage
        const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
        const allUsers = [
            { id: 1, userName: "Valeria Henriquez", info: "Lorem, ipsum dolor sit amet consectetur adipisicing elit.", ubicacion: "Santiago centro" },
            { id: 2, userName: "John Marston", info: "Lorem, ipsum dolor sit amet consectetur adipisicing elit.", ubicacion: "Ñuñoa" },
            { id: 3, userName: "Alberto Hurtado", info: "Lorem, ipsum dolor sit amet consectetur adipisicing elit.", ubicacion: "La cisterna" },
            { id: 4, userName: "Carolina Rojas", info: "Lorem, ipsum dolor sit amet consectetur adipisicing elit.", ubicacion: "Macul" },
            { id: 5, userName: "Arthur Morgan", info: "Lorem, ipsum dolor sit amet consectetur adipisicing elit.", ubicacion: "La florida" },
        ];

        // Filtrar solo los usuarios que son favoritos
        const filteredFavorites = allUsers.filter(user => favorites.includes(user.id));
        setFavoriteUsers(filteredFavorites);
        setLoading(false); // Terminar el proceso de carga
    }, []);

    /*METODO CON LOS ENPOINT DEL BACK

    // tener ojo que se respeten los campos de cada usuario, 
    // obtener los roomiesFav de la bd
    // Método para obtener los favoritos desde la base de datos
    const fetchFavoriteUsers = async () => {
        try {
            const response = await fetch('/API/R_favorito'); // Endpoint de la API que devuelve los favoritos
            if (!response.ok) {
                throw new Error('Error al obtener los datos de favoritos'); // Lanzar error si la respuesta no es correcta
            }
            const data = await response.json(); // Convertir la respuesta a JSON
            setFavoriteUsers(data); // Guardar los datos en el estado
        } catch (err) {
            setError(err.message); // Guardar el mensaje de error en el estado
        } finally {
            setLoading(false); // Terminar el proceso de carga
        }
    };

    // Efecto que se ejecuta al cargar el componente para obtener los datos
    useEffect(() => {
        fetchFavoriteUsers();
    }, []);

    // Mostrar un mensaje mientras se cargan los datos
    if (loading) {
        return <div>Cargando usuarios favoritos...</div>;
    }

    // Mostrar un mensaje de error si algo salió mal
    if (error) {
        return <div>Error: {error}</div>;s
    }
    */

    const handleFilter = (newFilters) => {
        setFilters(newFilters);
    };

    const filteredUsers = favoriteUsers.filter((user) => {
        const matchesComuna = filters.comuna ? user.ubicacion === filters.comuna : true;
        const matchesIntereses = filters.intereses.length ? filters.intereses.every((interes) => user.intereses.includes(interes)) : true;
        const matchesPreferencias = filters.preferencias.length ? filters.preferencias.every((preferencia) => user.preferencias.includes(preferencia)) : true;
        const matchesCarrera = filters.carrera ? user.carrera === filters.carrera : true;
        return matchesComuna && matchesIntereses && matchesPreferencias && matchesCarrera;
    });

    if (loading) {
        return <div>Cargando...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div className="container mx-auto p-4">
            <Filter onFilter={handleFilter} />
            <section className="flex flex-wrap gap-4 p-4">
                {filteredUsers.map((user) => (
                    <RoomieCard
                        key={user.id}
                        id={user.id}
                        userName={user.userName}
                        info={user.info}
                        ubicacion={user.ubicacion}
                    />
                ))}
            </section>
        </div>
    );
}

