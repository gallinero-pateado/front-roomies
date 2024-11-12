import { useState } from "react";
import { RoomieCard } from "./RoomieCard";

export function RoomiesList() {
    //mostrar todos los usuarios de prueba
    const users = [
        { id: 1, userName: "Valeria Henriquez", correo:"vhenriquez@gmail.com", biografia: "biografia generica de prueba pdssasdssdaad sa sdasdjas asd jsanjasdnsa sdjnsdjsan sansajnsda asjdnsajsansa jdasndjsan sdjnasjdsa dsajndjasnjsandsjandsjandsajndjsandjsa sadnsajdnsajdnsajndsajndsajnsjandsajndjsandsajndjsandsjsanjsadn sajdnsadjnara valeria hernandez sandksns sankskd sknaksdan ksandkd ", ubicacion: "Santiago centro", intereses:["Interes 1", "Interes 2"], preferencias:["Pref 1", "pref 2", "pref 3", "pref 4"], carrera:"Ingenieria informatica",genero:"Femenino"},
        { id: 2, userName: "John Marston", correo:"jmarston@gmail.com",biografia: "Lorem, ipsum dolor sit amet consectetur adipisicing elit.", ubicacion: "Ñuñoa", intereses:["Interes 1", "Interes 2"], preferencias:["Pref 1", "Pref 2", "pref 3"], carrera:"Arquitectura",genero:"Masculino" },
        { id: 3, userName: "Alberto Hurtado",correo:"ahurtado@gmail.com", biografia: "Lorem, ipsum dolor sit amet consectetur adipisicing elit.", ubicacion: "La cisterna", intereses:["interes 1", "interes 2", "interes 3"], preferencias: ["pref 1"], carrera:"Derecho",genero:"Prefiero no decir" },
        { id: 4, userName: "Carolina Rojas",correo:"crojas@gmail.com", biografia: "Lorem, ipsum dolor sit amet consectetur adipisicing elit.", ubicacion: "Macul", intereses:["int 1", "int 5"], preferencias:["pref 1", "pref 4"], carrera:"Ingenieria civil",genero:"Femenino" },
        { id: 5, userName: "Arthur Morgan",correo:"amorgan@gmail.com", biografia: "Lorem, ipsum dolor sit amet consectetur adipisicing elit.", ubicacion: "La florida", intereses:["int 2","int 3", "int4", "int 6"], preferencias:["pref 1", "pref 2", "pref 4", "pref 5", "pref 6"], carrera:"Ingenieria comercial", genero:"Prefiero no decir"},
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
            {users.map((user) => (
                <RoomieCard
                    key={user.id}
                    id={user.id} // Pasar el id al RoomieCard
                    userName={user.userName}
                    biografia={user.biografia}
                    ubicacion={user.ubicacion}
                    correo={user.correo}
                    intereses={user.intereses}
                    preferencias={user.preferencias}
                    carrera={user.carrera}
                    genero={user.genero}
                />
            ))}
        </section>
    );
}
