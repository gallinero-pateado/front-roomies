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
            { id: 1, userName: "Valeria Henriquez", correo:"vhenriquez@gmail.com", biografia: "biografia generica de prueba para valeria hernandez sandksns sankskd sknaksdan ksandkd ", ubicacion: "Santiago centro", intereses:["Interes 1", "Interes 2"], preferencias:["Pref 1", "pref 2", "pref 3", "pref 4"], carrera:"Ingenieria informatica",genero:"Femenino"},
            { id: 2, userName: "John Marston", correo:"jmarston@gmail.com",biografia: "Lorem, ipsum dolor sit amet consectetur adipisicing elit.", ubicacion: "Ñuñoa", intereses:["Interes 1", "Interes 2"], preferencias:["Pref 1", "Pref 2", "pref 3"], carrera:"Arquitectura",genero:"Masculino" },
            { id: 3, userName: "Alberto Hurtado",correo:"ahurtado@gmail.com", biografia: "Lorem, ipsum dolor sit amet consectetur adipisicing elit.", ubicacion: "La cisterna", intereses:["interes 1", "interes 2", "interes 3"], preferencias: ["pref 1"], carrera:"Derecho",genero:"Prefiero no decir" },
            { id: 4, userName: "Carolina Rojas",correo:"crojas@gmail.com", biografia: "Lorem, ipsum dolor sit amet consectetur adipisicing elit.", ubicacion: "Macul", intereses:["int 1", "int 5"], preferencias:["pref 1", "pref 4"], carrera:"Ingenieria civil",genero:"Femenino" },
            { id: 5, userName: "Arthur Morgan",correo:"amorgan@gmail.com", biografia: "Lorem, ipsum dolor sit amet consectetur adipisicing elit.", ubicacion: "La florida", intereses:["int 2","int 3", "int4", "int 6"], preferencias:["pref 1", "pref 2", "pref 4", "pref 5", "pref 6"], carrera:"Ingenieria comercial", genero:"Prefiero no decir"},
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
                    correo = {user.correo}
                    biografia={user.biografia}
                    ubicacion={user.ubicacion}
                    intereses = {user.intereses}
                    preferencias = {user.preferencias}
                    carrera = {user.carrera}
                    genero={user.genero}

                />
                  
                ))}
            </section>
        </div>
    );
}

