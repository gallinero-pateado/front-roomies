import { useState } from "react";
import { RoomieCard } from "../components_PRoomie/RoomieCard"; 

///En este momento los usuarios de prueba mostrados son todos los usuarios, pero una vez descomentado el codigo real, solo debe cargar los perfiles vinculados a la id del usuario
export function RoomiesList({id}) {
    
    // Perfiles favoritos de prueba
    const usuarios = [
        {
            id: 1,
            userName: "Valeria Henriquez",
            info: "Lorem, ipsum dolor sit amet consectetur adipisicing elit.",
            ubicacion: "Santiago centro",
            isFav: false,
            //agregar la imagen de perfil
        },
        {
            id: 2,
            userName: "John Marston",
            info: "Lorem, ipsum dolor sit amet consectetur adipisicing elit.",
            ubicacion: "Ñuñoa",
            isFav: true,
            //agregar la imagen de perfil
        },
        {
            id: 3,
            userName: "Alberto Hurtado",
            info: "Lorem, ipsum dolor sit amet consectetur adipisicing elit.",
            ubicacion: "La cisterna",
            isFav: false,
            //agregar la imagen de perfil
        },
        {
            id: 4,
            userName: "Carolina Rojas",
            info: "Lorem, ipsum dolor sit amet consectetur adipisicing elit.",
            ubicacion: "Macul",
            isFav: true,
            //agregar la imagen de perfil
        },
        {
            id: 5,
            userName: "Arthur Morgan",
            info: "Lorem, ipsum dolor sit amet consectetur adipisicing elit.",
            ubicacion: "La florida",
            isFav: true,
            //agregar la imagen de perfil
        },
    ];

    /*ESTE ES EL CODIGO QUE SE DEBERIA UTILIZAR CON DATOS REALES, SI FALTAN O SOBRAN COSAS COMO MANEJO DE DATOS, VALIDACIONES, ETC, AVISAR CORREGIR
    
        const [usuarios, setUsuarios] = useState([]);  // Estado para almacenar la lista de usuarios
        const [loading, setLoading] = useState(true);  // Estado para controlar la carga de datos
        const [error, setError] = useState(null);      // Estado para manejar errores

        // Función para obtener los usuarios desde la API
        const fetchUsuarios = async () => {
            try {
                const response = await fetch('/api/favorites/:id'); // URL de la API que devuelve la lista de usuarios
                if (!response.ok) {
                    throw new Error('Error al obtener los datos');  // Lanzar un error si no se recibe una respuesta correcta
                }
                const data = await response.json();  // Convertir la respuesta a JSON
                setUsuarios(data);  // Guardar los datos en el estado
            } catch (err) {
                setError(err.message);  // Guardar el mensaje de error en el estado
            } finally {
                setLoading(false);  // Terminar el proceso de carga
            }
        };

        // Efecto que se ejecuta al cargar el componente para obtener los datos
        useEffect(() => {
            fetchUsuarios();
        }, []);

        if (loading) {
            return <div>Cargando usuarios...</div>;  // Mostrar mensaje mientras se cargan los datos
        }

        if (error) {
            return <div>Error: {error}</div>;  // Mostrar mensaje de error si algo salió mal
        }

       
};

    */



    return (
        <section className="RoomiesList">
            {usuarios.map((user) => (
                <RoomieCard 
                //por cada favorito, carga un componente roomiecard para ser mostrado
                    key={user.id} 
                    //img ={user.img}
                    userName={user.userName} 
                    info={user.info} 
                    ubicacion={user.ubicacion}
                    isFav={user.isFav} 
                />
            ))}
        </section>
    );
}
