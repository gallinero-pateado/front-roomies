import { useState, useEffect } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';//
import 'react-toastify/dist/ReactToastify.css';


//se le pasa la id de roomie como prop, para luego trabajar con este usuario
export function Profile({id}) {


//DATOS DE PRUEBA, en la version final deben ser eliminados  
  const bio =
    "Soy Sebastián Andrés Poblete Chacón, estudiante de Ingeniería en Informática. Me considero una persona organizada, responsable y de fácil convivencia. Tengo experiencia trabajando en equipo y gestionando proyectos, lo que me ha enseñado a respetar los espacios y colaborar para mantener un ambiente armonioso. Soy tranquilo, me gusta el orden y siempre busco soluciones rápidas a los problemas cotidianos. Además, disfruto compartir y crear un entorno cómodo para todos.";

  const inter =
    "Desarrollo web y nuevas tecnologías \nDiseño gráfico \nMúsica \nAnime \nBoxeo";

  const pref =
    "Espacios ordenados y limpios \nAmbiente tranquilo y respetuoso \nBuena comunicación y convivencia \nPreferencia por roomies responsables y organizados \nRespetar horarios y áreas comunes";

  // Estado para los datos del perfil, con datos de pruebas
  const [perfil, setPerfil] = useState({
    name: "Sebastian Poblete",
    correo: "spobletec@utem.cl",
    fecha_nac: "09/02/2003",
    genero: "Masculino",
    universidad: "Universidad Tecnologica Metropolitana",
    carrera: "ing Informatica",
    año_ingreso: 2021,
    biografia: bio,
    preferencias: pref,
    intereses: inter,
  });



  // Función para manejar los cambios en los campos del formulario
  const handleChange = (e) => {
    const { name, value } = e.target;
    setPerfil({
      ...perfil, // Crea una copia del estado actual del perfil
      [name]: value, // Actualiza el campo correspondiente
    });
  };

  

  // Función para manejar el envío del formulario
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsEditing(false); // Cambia a modo vista después de guardar

    // Mostrar un toast en lugar de una alerta
    toast.success("Perfil editado correctamente", {
        position: "top-right",
        autoClose: 1000,  // El toast desaparecerá después de 1 segundos
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        progress: undefined,
    });
  };

  
/*
ESTA ES LA VERSION QUE SE CONECTA A LA BD, DESCOMENTAR UNA VEZ QUE SE PROBARON LOS DATOS DE PRUEBA Y SE TENGAN LOS ENDPOINT YA DESAROLLADOS
ADEMAS DE LA CONECCION CON LA BD, SI HAY ALGUN CAMPO DE MAS O FALTA ALGUNO, O EL TIPO DE DATO ES INCORRECTO, FAVOR DE AVISAR PARA REALIZAR
EL CAMBIO CORRESPONDIENTE

 // Estado para los datos del perfil, con datos reales, ajustar con los nombres puestos en la BD
 const [perfil, setPerfil] = useState({
    name: '',
    correo: '',
    fecha_nac: '',
    genero: '',
    universidad: '',
    carrera: '',
    año_ingreso: '',
    biografia: '',
    preferencias: '',
    intereses: '',
  });

  // Estado para controlar la vista de formulario/perfil
  const [isEditing, setIsEditing] = useState(false);

  // Función para cargar los datos del perfil desde la API
  useEffect(() => {
    const obtenerPerfil = async () => {
      try {
        const response = await axios.get('/api/profiles/${id}'); // Ajustar la URL según el endpoint real creado para obtener perfil
        setPerfil(response.data);
      } catch (error) {
        toast.error("Error al cargar los datos del perfil");// toast como notificiacion de error
      }
    };
    obtenerPerfil();
  }, []);

  // Manejar el cambio en los inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setPerfil((prevPerfil) => ({
      ...prevPerfil,
      [name]: value,
    }));
  };

  // enviar los cambios a la API
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.put('/api/profiles/&{id}', perfil); // Ajusta la URL segun endopint creado para modificar perfil
      // Mostrar un toast en lugar de una alerta
      toast.success("Perfil editado correctamente", {
        position: "top-right",
        autoClose: 1000,  // El toast desaparecerá después de 1 segundos
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        progress: undefined,
    });
      setIsEditing(false); // Volver a la vista de perfil
    } catch (error) {
      toast.error("Hubo un error al actualizar el perfil");
    }
  };
*/

// Estado para almacenar el perfil antes de editar
const [perfilBackup, setPerfilBackup] = useState(null);

// Estado para controlar la vista de formulario/perfil
const [isEditing, setIsEditing] = useState(false);

// Función para alternar entre perfil y formulario
const toggleEdit = () => {
  if (!isEditing) {
    setPerfilBackup(perfil); // Guarda una copia del perfil antes de editar
  } else {
    setPerfilBackup(null); // Restablece el backup si se cancela la edición
  }
  setIsEditing(!isEditing); // Cambia entre vista y edición
};

 // Función para manejar el clic en el botón de cancelar
 const handleCancel = () => {
  if (perfilBackup) {
    setPerfil(perfilBackup); // Restaurar el perfil a su estado antes de editar
  }
  setIsEditing(false); // Volver a la vista del perfil
};



  return (
    <aside className="profile">
    <ToastContainer />
    {/*si isEditing es true, mostrara el formulario*/ }
      {isEditing ? (
        <form onSubmit={handleSubmit}>
          <div className="miperfil-profile">
            <img src="src\img-prueba.jpeg" alt="imagen de perfil" />
            <div className="nombre-correo">
              <input
                name="name"
                type="text"
                id="name"
                value={perfil.name}
                onChange={handleChange}
                className="editable"
              />
              <p>{perfil.correo}</p>
            </div>
            <button id="confirm-btn" type="submit">
              Confirmar
            </button>
            <button id="cancel-btn" type="button" onClick={handleCancel}>
              Cancelar
            </button>
          </div>

          <div className="info">
            <section className="info-personal">
              <h2>Información Personal</h2>
              <h3>Fecha de nacimiento:</h3>
              <p>{perfil.fecha_nac}</p>

              <label htmlFor="genero">Género: </label>
              <select
                name="genero"
                id="genero-form"
                value={perfil.genero}
                onChange={handleChange}
              >
                <option value="Masculino">Masculino</option>
                <option value="Femenino">Femenino</option>
                <option value="Otro">Otro</option>
              </select>
            </section>

            <section className="info-academica">
              <h2>Información académica</h2>
              <label htmlFor="universidad">Universidad</label>
              <input
                name="universidad"
                type="text"
                id="universidad"
                value={perfil.universidad}
                onChange={handleChange}
              />

              <label htmlFor="carrera">Carrera</label>
              <input
                name="carrera"
                type="text"
                id="carrera"
                value={perfil.carrera}
                onChange={handleChange}
              />

              <label htmlFor="año_ingreso">Año de ingreso</label>
              <input
                name="año_ingreso"
                type="number"
                id="año_ingreso"
                min="1900"
                max={new Date().getFullYear()}
                value={perfil.año_ingreso}
                onChange={handleChange}
              />
            </section>
          </div>

          <div className="bio-int-pref">
            <div className="bio">
              <label htmlFor="biografia">Biografía:</label>
              <textarea
                name="biografia"
                id="biografia"
                rows="10"
                cols="50"
                value={perfil.biografia}
                onChange={handleChange}
              />
            </div>

            <div className="int-pref">
              <label htmlFor="intereses">Intereses:</label>
              <textarea
                name="intereses"
                id="intereses"
                rows="15"
                cols="35"
                value={perfil.intereses}
                onChange={handleChange}
              />

              <label htmlFor="preferencias">Preferencias:</label>
              <textarea
                name="preferencias"
                id="preferencias"
                rows="15"
                cols="40"
                value={perfil.preferencias}
                onChange={handleChange}
              />
            </div>
          </div>

          
        </form>
      ) : (
        <div className="perfil-view">
          {/*Si isEditing es false, se mostrara la vista de perfil*/ }
            
          <div className="miperfil-profile">
            <img src="src\img-prueba.jpeg" alt="Imagen de perfil" />
            <div className="nombre-correo">
              <h3>{perfil.name}</h3>
              <p>{perfil.correo}</p>
            </div>
            <button id="editar-btn" onClick={toggleEdit}>
              Editar
            </button>
          </div>

          <div className="info">
            <section className="info-personal">
              <h2>Información Personal</h2>
              <h3>Fecha de nacimiento:</h3>
              <p>{perfil.fecha_nac}</p>

              <h3>Género:</h3>
              <p>{perfil.genero}</p>
            </section>

            <section className="info-academica">
              <h2>Información académica</h2>
              <h3>Universidad:</h3>
              <p>{perfil.universidad}</p>

              <h3>Carrera:</h3>
              <p>{perfil.carrera}</p>

              <h3>Año de ingreso:</h3>
              <p>{perfil.año_ingreso}</p>
            </section>
          </div>

          <div className="bio-int-pref">
            <div className="bio">
              <h2>Biografía</h2>
              <p>{perfil.biografia}</p>
            </div>

            <div className="int-pref">
              <h2>Intereses:</h2>
              <p>{perfil.intereses}</p>

              <h2>Preferencias:</h2>
              <p>{perfil.preferencias}</p>
            </div>
          </div>
        </div>
      )}
    </aside>
  );
}
