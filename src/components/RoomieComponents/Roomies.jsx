import { useState, useEffect } from "react";
import axios from 'axios';
import { RoomieCard } from "./RoomieCard";

export function RoomiesList() {
    // Estado para almacenar los usuarios obtenidos de la base de datos
    const [users, setUsers] = useState([]);

    //obtener todos los usuarios roomies
    useEffect(()=>{
        const fetchRoomies = async()=>{
            try{
                const response = await axios.get(`http://localhost:8080/UsuarioRoomies`)
                
                const data = response.data;
                setUsers(data)//solo guarda los datos de roomie: (biografia, intereses y pref)
                console.log(users);
                //falta agregar la info basica del usuario
                
            }catch(error){
                console.error('Error al obtener datos del perfil:', error);
            }
        }

        fetchRoomies();
    }, []);


    return (
        <section className="flex flex-wrap gap-4 p-4">
            {users.map((user) => (
                <RoomieCard
                    key={user.Id}
                    ID={user.Id}
                    Nombres="Nombre 1"
                    Apellidos="Apellido 1"
                    Correo="Correo 1"
                    Biografia={user.Biografia}
                    Genero={user.Genero}
                    Ano_ingreso="2021"
                    // Convierte 'Intereses' en un array antes de pasarla a RoomieCard
                    Intereses={user.Intereses ? user.Intereses.split(',').map((item) => item.trim()) : []}
                    Preferencias={user.Preferencias ? user.Preferencias.split(',').map((item) => item.trim()) : []}
                    Carrera="si"
                />
            ))}
        </section>
    );
    
}

