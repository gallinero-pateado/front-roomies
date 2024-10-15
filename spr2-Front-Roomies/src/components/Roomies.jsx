import { useState } from "react";
import { RoomieCard } from "./RoomieCard";

export function RoomiesList() {
    //mostrar todos los usuarios de prueba
    const user = [
        { id: 1, userName: "Valeria Henriquez", info: "Lorem, ipsum dolor sit amet consectetur adipisicing elit.", ubicacion: "Santiago centro" },
        { id: 2, userName: "John Marston", info: "Lorem, ipsum dolor sit amet consectetur adipisicing elit.", ubicacion: "Ñuñoa" },
        { id: 3, userName: "Alberto Hurtado", info: "Lorem, ipsum dolor sit amet consectetur adipisicing elit.", ubicacion: "La cisterna" },
        { id: 4, userName: "Carolina Rojas", info: "Lorem, ipsum dolor sit amet consectetur adipisicing elit.", ubicacion: "Macul" },
        { id: 5, userName: "Arthur Morgan", info: "Lorem, ipsum dolor sit amet consectetur adipisicing elit.", ubicacion: "La florida" },
    ];

    /*Codigo Final una vez que se concecte la bd

    // Estado para almacenar los usuarios obtenidos de la base de datos
    const [users, setUsers] = useState([]);
    // Estado para manejar la carga
    const [loading, setLoading] = useState(true);
    // Estado para manejar errores
    const [error, setError] = useState(null);

    // Método para obtener los usuarios desde la base de datos
    const fetchUsers = async () => {
        try {
            const response = await fetch('/api/R_usuario_roomie'); // Endpoint para obtener roomies
            if (!response.ok) {
                throw new Error('Error al obtener los usuarios');
            }
            const data = await response.json(); // Convertir la respuesta a JSON
            setUsers(data); // Actualizar el estado con los usuarios obtenidos
        } catch (err) {
            setError(err.message); // Capturar y guardar el mensaje de error
        } finally {
            setLoading(false); // Cambiar el estado de carga
        }
    };

    // useEffect para llamar a fetchUsers al montar el componente
    useEffect(() => {
        fetchUsers(); // Llamar al método para obtener usuarios
    }, []);

    // Si estamos cargando, mostrar un mensaje de carga
    if (loading) {
        return <div>Cargando...</div>;
    }

    // Si hay un error, mostrar el mensaje de error
    if (error) {
        return <div>Error: {error}</div>;
    }*/ 

    return (
        <section className="flex flex-wrap gap-4 p-4">
            {user.map((user) => (
                <RoomieCard
                    key={user.id}
                    id={user.id} // Pasar el id al RoomieCard
                    userName={user.userName}
                    info={user.info}
                    ubicacion={user.ubicacion}
                />
            ))}
        </section>
    );
}
