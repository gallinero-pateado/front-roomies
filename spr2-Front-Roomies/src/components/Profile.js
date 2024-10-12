import { useState, useEffect } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';//
import 'react-toastify/dist/ReactToastify.css';
import carreras from './carreras';
import comunas from './comunas';
import intereses from './intereses'
import preferences from './preferences'


//se le pasa la id de roomie como prop, para luego trabajar con este usuario
const Profile= ({id}) => {


//DATOS DE PRUEBA, en la version final deben ser eliminados  
  
  const bio = "aaaa"

  
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
    preferencias: [],
    intereses: [],
    ubicacion: 'San Ramon'
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

  
  //modal para manejar las etiquetas de int y pref
  const [isModalOpen, setIsModalOpen] = useState(false); // Estado para controlar el modal
  const [isModalOpenP, setIsModalOpenP] = useState(false); // Estado para controlar el modal
  const [tempSelectedInterests, setTempSelectedInterests] = useState([]); // Estado temporal para los intereses seleccionados
  const [tempSelectedPreferences, setTempSelectedPreferences] = useState([]); // Estado temporal para los intereses seleccionados
  const [confirmedInterests, setConfirmedInterests] = useState([]); // Estado para los intereses confirmados
  const [confirmedPreferences, setConfirmedPreferences] = useState([]); // Estado para los intereses confirmados

   // Manejar los intereses temporales en el modal
   const toggleInterest = (interest) => {
    if (tempSelectedInterests.includes(interest)) {
      setTempSelectedInterests(tempSelectedInterests.filter((i) => i !== interest));
    } else {
      setTempSelectedInterests([...tempSelectedInterests, interest]);
    }
  };

  // Manejar los preferencias temporales en el modal
  const togglePrefrerences = (preference) => {
    if (tempSelectedPreferences.includes(preference)) {
      setTempSelectedInterests(tempSelectedPreferences.filter((i) => i !== preference));
    } else {
      setTempSelectedPreferences([...tempSelectedPreferences, preference]);
    }
  };


  // Confirmar los intereses seleccionados y cerrar el modal
  const confirmInterests = () => {
    setConfirmedInterests(tempSelectedInterests); // Solo los intereses seleccionados se confirman
    setPerfil({ ...perfil, intereses: tempSelectedInterests });
    setIsModalOpen(false);
  };

  // Confirmar los preferencias seleccionados y cerrar el modal
  const confirmPreferences = () => {
    setConfirmedPreferences(tempSelectedPreferences); // Solo los intereses seleccionados se confirman
    setPerfil({ ...perfil, preferencias: tempSelectedPreferences });
    setIsModalOpenP(false);
  };


  // Abrir el modal
  const openModal = () => {
    setTempSelectedInterests(perfil.intereses); // Cargar los intereses actuales al modal
    setIsModalOpen(true);
  };

  const openModalPref = () => {
    setTempSelectedPreferences(perfil.preferencias); // Cargar los intereses actuales al modal
    setIsModalOpenP(true);
  };

  // Cerrar el modal
  const closeModal = () => {
    setIsModalOpen(false);
  };

  const closeModalP = () => {
    setIsModalOpenP(false);
  };


  
/*
ESTA ES LA VERSION QUE SE CONECTA A LA BD, DESCOMENTAR UNA VEZ QUE SE PROBARON LOS DATOS DE PRUEBA Y SE TENGAN LOS ENDPOINT YA DESAROLLADOS
ADEMAS DE LA CONECCION CON LA BD, SI HAY ALGUN CAMPO DE MAS O FALTA ALGUNO, O EL TIPO DE DATO ES INCORRECTO, FAVOR DE AVISAR PARA REALIZAR
EL CAMBIO CORRESPONDIENTE

 

 

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

  // enviar los cambios a la API, se debe borrar el handlesubmit no comentado
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
          <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-4 px-8 rounded-lg focus:outline-none focus:shadow-outline transition duration-300"
          onClick={toggleEdit}
        >
          Comifirmar
          {console.log(perfil)}
        </button>
          <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-4 px-8 rounded-lg focus:outline-none focus:shadow-outline transition duration-300"
          onClick={handleCancel}
        >
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
              className="shadow  border rounded  py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-blue-500"
              name="genero"
              value={perfil.genero}
              onChange={handleChange}
            >
              <option value="male">Masculino</option>
              <option value="female">Femenino</option>
              <option value="other">Otro</option>
              <option value="prefer-not-to-say">Prefiero no decir</option>
            </select>

            <label htmlFor="ubicacion">Ubicacion: </label>
            <select className="shadow  border rounded  py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-blue-500"
            name="ubicacion" id="ubicacion" value={perfil.ubicacion} onChange={handleChange} >
              {comunas.map((ubicacion)=>(
                <option key={ubicacion.value} value={ubicacion.value}>
                  {ubicacion.label} 
                </option>
              ))}
            </select>
          </section>

          <section className="info-academica">
            <h2>Información académica</h2>
            <h3>Universidad:</h3>
            <p>{perfil.universidad}</p>

            <label htmlFor="carrera">Carrera</label>
            <select className="shadow  border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-blue-500"
            name="carrera" id="carrera" value={perfil.carrera} onChange={handleChange} >
              {carreras.map((carrera)=>(
                <option key={carrera.value} value={carrera.value}>
                  {carrera.label} 
                </option>
              ))}
            </select>
            

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
            
            {/* Intereses */}
            <div className="mb-6">
              <label className="block text-blue-700 font-bold mb-2">Intereses</label>
              <button
                type="button"
                onClick={openModal}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg focus:outline-none focus:shadow-outline"
              >
                Seleccionar Intereses
              </button>

              {/* Mostrar intereses confirmados debajo */}
              {confirmedInterests.length > 0 && (
                <div className="mt-4">
                  <h3 className="text-blue-700 font-bold mb-2">Intereses seleccionados:</h3>
                  <div className="flex flex-wrap gap-2">
                    {confirmedInterests.map((interest) => (
                      <span
                        key={interest}
                        className="bg-blue-500 text-white px-3 py-1 rounded-full"
                      >
                        {interest}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>


            {/* Preferencias*/}
            <div className="mb-6">
              <label className="block text-blue-700 font-bold mb-2">Preferencias</label>
              <button
                type="button"
                onClick={openModalPref}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg focus:outline-none focus:shadow-outline"
              >
                Seleccionar Preferencias
              </button>

              {/* Mostrar Preferenncias confirmados debajo */}
              {confirmedPreferences.length > 0 && (
                <div className="mt-4">
                  <h3 className="text-blue-700 font-bold mb-2">Preferencias seleccionadas:</h3>
                  <div className="flex flex-wrap gap-2">
                    {confirmedPreferences.map((preferences) => (
                      <span
                        key={preferences}
                        className="bg-blue-500 text-white px-3 py-1 rounded-full"
                      >
                        {preferences}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
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
          
          <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-4 px-8 rounded-lg focus:outline-none focus:shadow-outline transition duration-300"
          onClick={toggleEdit}
        >
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

            <h3>Ubicacion:</h3>
            <p>{perfil.ubicacion}</p>
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
            {confirmedInterests.length > 0 && (
                <div className="mt-4">
                  <div className="flex flex-wrap gap-2">
                    {confirmedInterests.map((interest) => (
                      <span
                        key={interest}
                        className="bg-blue-500 text-white px-3 py-1 rounded-full"
                      >
                        {interest}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            

            <h2>Preferencias:</h2>
            {confirmedPreferences.length > 0 && (
                <div className="mt-4">
                  <div className="flex flex-wrap gap-2">
                    {confirmedPreferences.map((preference) => (
                      <span
                        key={preference}
                        className="bg-blue-500 text-white px-3 py-1 rounded-full"
                      >
                        {preference}
                      </span>
                    ))}
                  </div>
                </div>
              )}
          </div>
        </div>
      </div>

      
    )}

    {/* Modal para seleccionar intereses */}
    {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-5 w-full max-w-lg min-w-[700px] ">
            <h2 className="text-2xl font-bold mb-4">Selecciona tus intereses</h2>
            <div className="grid grid-cols-5 gap-4 ">
              {intereses.map((interest) => (
                <button
                  type="button"
                  key={interest}
                  onClick={() => toggleInterest(interest)}
                  className={` px-4 py-2 rounded-lg ${
                    tempSelectedInterests.includes(interest)
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-200 text-black'
                  }`}
                  
                >
                  
                  {interest}
                </button>
              ))}
            </div>
            <div className="flex justify-end p-5">
              <button
                onClick={confirmInterests}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg mr-2"
              >
                Confirmar
              </button>
              <button
                onClick={closeModal}
                className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-lg"
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal para seleccionar preferencias */}
      {isModalOpenP && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-5 w-full max-w-lg min-w-[1000px] ">
            <h2 className="text-2xl font-bold mb-4">Selecciona tus Preferencias de convivencia</h2>
            <div className="grid grid-cols-5 gap-2 ">
              {preferences.map((preference) => (
                <button
                  type="button"
                  key={preference}
                  onClick={() => togglePrefrerences(preference)}
                  className={` px-4 py-2 rounded-lg ${
                    tempSelectedPreferences.includes(preference)
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-200 text-black'
                  }`}
                  
                >
                  
                  {preference}
                </button>
              ))}
            </div>
            <div className="flex justify-end p-5">
              <button
                onClick={confirmPreferences }
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg mr-2"
              >
                Confirmar
              </button>
              <button
                onClick={closeModalP}
                className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-lg"
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
  </aside>
);
}
export default Profile;