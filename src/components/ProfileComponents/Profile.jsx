import { useState, useEffect } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';//
import 'react-toastify/dist/ReactToastify.css';
import carreras from '../Const/carreras';
import Intereses from '../Const/intereses'
import Preferencias from '../Const/preferences'
import comunas from '../Const/comunas';


const Profile= () => {
 
  // Estado para los datos del perfil
  const [profileData, setProfileData] = useState({});
  const [roomieData, setRoomieData] = useState({})
  const [intereses, setIntereses] = useState([]);
  const [preferencias, setPreferencias] = useState([]);

  
    //obtener uid del lcoalstorague,
    const uid = localStorage.getItem('uid');
    const roomieId = localStorage.getItem('roomieId');
  
  useEffect(() => {
  
    const fecthProfile = async()=>{
      try{
        //obtener los datos del usuario
        const userResponse = await axios.get(`http://localhost:8080/Usuario/${uid}`);
        const data = userResponse.data;
  
        const finalData = {
          ...data,
          NombreCarrera : getCarrera(data.Id_carrera)
        }
        console.log(finalData);

        setProfileData(finalData)

        console.log(userResponse.data)
      }catch(error){
        console.error("Error al obtener los datos del perfil",error)
      }
    }

    const fetchRoomie = async()=>{
      try{
        const roomieResponse = await axios.get(`http://localhost:8080/UsuarioRoomie/${roomieId}`);

        const interesesArray = roomieResponse.data.Intereses.split(',');// Convertir el campo 'intereses' a un array
        const preferencesArray = roomieResponse.data.Preferencias.split(',');// Convertir el campo 'preferencias' a un array
        setRoomieData(roomieResponse.data);

        // Agregar el array de intereses al estado 
        setIntereses(interesesArray);
        setPreferencias(preferencesArray);
    }catch(error){
      console.error("Error al obtener perfil de roomie",error);
    }
    }

    fecthProfile();
    fetchRoomie();
  },[uid,roomieId]);

  //obtener el nmobre de la carrera
  const getCarrera = (Id_carrera)=>{
    const data = carreras.find(c => c.value === Id_carrera);
    return data ? data.label: "Carrera no encontrada";
};

//obtener el id de la carrera
const getId = (nombre)=>{
  const data = carreras.find(c => c.label === nombre);
  return data ? data.value: "Carrera no encontrada";
};

  // Función para manejar los cambios en los campos del formulario
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfileData({
      ...profileData, // Crea una copia del estado actual del perfil
      [name]: value, // Actualiza el campo correspondiente
    });
    setRoomieData({
      ...roomieData,
      [name]:value,
    });
  };

  

  // Función para manejar el envío del formulario
  const handleSubmit = async(e) => {
    e.preventDefault();  
    let i = 0;//contador para los errores
    try{

      const userData = {
        Nombres: profileData.Nombres,
        Apellidos: profileData.Apellidos,
        Correo: profileData.Apellidos,
        Fecha_Nacimiento: profileData.Fecha_Nacimiento,
        Ano_Ingreso: profileData.Ano_Ingreso,
        Id_Carrera:parseInt(getId(profileData.NombreCarrera)),
      };
  
      
      //actualizar info del perfil
      await axios.put(`http://localhost:8080/Usuario/${roomieId}`, userData,{
        headers:{
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('authToken')}`
        }
      });

      
    }catch(error){
      console.error("Error al editar el perfil",error);
      i +=1;
      toast.error("Error al editar el perfil",{
        position: "top-right",
        autoClose: 1000,  // El toast desaparecerá después de 1 segundos
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        progress: undefined,
      });
    }

    try{
      
      //Actualizar datos como roomie
      const newroomieData = {
        Genero: roomieData.Genero,
        Biografia: roomieData.Biografia,
        Intereses: roomieData.Intereses,
        Preferencias: roomieData.Preferencias,
        Ubicacion: roomieData.Ubicacion,
      }
      
      //actualizar info de roomie
      await axios.put(`http://localhost:8080/UsuarioRoomie/${roomieId}`,newroomieData,{
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('authToken')}`
        }
      })

      
    }catch(error){
      console.error("Error al editar la informacion de roomie",error);
      i+=1
      toast.error("Error al editar el perfil",{
        position: "top-right",
        autoClose: 1000,  // El toast desaparecerá después de 1 segundos
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        progress: undefined,
      });
    }
    toggleEdit();

    //si hay 0 errrores, mostrar la confirmacion de la edicion
    if(i<1){
      // Mostrar un toast en lugar de una alerta, solo si no hay ningun error
      toast.success("Perfil editado correctamente", {
        position: "top-right",
        autoClose: 1000,  // El toast desaparecerá después de 1 segundos
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        progress: undefined,
      });
    }
  };

//modal para manejar las etiquetas de int y pref
const [isModalOpen, setIsModalOpen] = useState(false); // Estado para controlar el modal
const [isModalOpenP, setIsModalOpenP] = useState(false); // Estado para controlar el modal
const [tempSelectedInterests, setTempSelectedInterests] = useState([]); // Estado temporal para los intereses seleccionados
const [tempSelectedPreferences, setTempSelectedPreferences] = useState([]); // Estado temporal para los preferencias seleccionados
const [confirmedInterests, setConfirmedInterests] = useState([]); // Estado para los intereses confirmados
const [confirmedPreferences, setConfirmedPreferences] = useState([]); // Estado para los preferencias confirmados

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
    setTempSelectedPreferences(tempSelectedPreferences.filter((i) => i !== preference));
  } else {
    setTempSelectedPreferences([...tempSelectedPreferences, preference]);
  }
};


// Confirmar los intereses seleccionados y cerrar el modal
const confirmInterests = () => {
  const interestsString = tempSelectedInterests.join(','); // Convierte el array a un string separado por comas
  console.log(interestsString);
  setConfirmedInterests(tempSelectedInterests); // Mantiene los intereses seleccionados en su forma de array
  setRoomieData(prevUser =>({
    ...prevUser, 
    Intereses : interestsString
  }))
  setIsModalOpen(false);
};


// Confirmar los preferencias seleccionados y cerrar el modal
const confirmPreferences = () => {
  const preferencesString = tempSelectedPreferences.join(','); // Convierte el array a un string separado por comas
  setConfirmedPreferences(tempSelectedPreferences); // Mantiene las preferencias seleccionadas en su forma de array
  setProfileData(prevUser =>({
    ...prevUser, //
    Preferencias: preferencesString
  }));
  setIsModalOpenP(false);
};


// Abrir el modal
const openModal = () => {
  setTempSelectedInterests(intereses); // Cargar los intereses actuales al modal
  setIsModalOpen(true);
};

const openModalPref = () => {
  setTempSelectedPreferences(preferencias); // Cargar los intereses actuales al modal
  setIsModalOpenP(true);
};


// Cerrar el modal
const closeModal = () => {
  setIntereses(confirmedInterests)
  setIsModalOpen(false);
};

const closeModalP = () => {
  setPreferencias(confirmedPreferences)
  setIsModalOpenP(false);
};

// Estado para almacenar el perfil antes de editar
const [perfilBackup, setPerfilBackup] = useState(null);

// Estado para controlar la vista de formulario/perfil
const [isEditing, setIsEditing] = useState(false);

// Función para alternar entre perfil y formulario
const toggleEdit = () => {
  if (!isEditing) {
    setPerfilBackup(profileData); // Guarda una copia del perfil antes de editar
  } else {
    setPerfilBackup(null); // Restablece el backup si se cancela la edición
  }
  setIsEditing(!isEditing); // Cambia entre vista y edición
};

 // Función para manejar el clic en el botón de cancelar
 const handleCancel = (e) => {

  e.preventDefault();
  if (perfilBackup) {
    setProfileData(perfilBackup); // Restaurar el perfil a su estado antes de editar
  }
  setIsEditing(false); // Volver a la vista del perfil
};



return (
<aside className="bg-white shadow-md rounded-lg p-20 min-w-[900px] f ">
  <ToastContainer />
  {/*si isEditing es true, mostrara el formulario*/ }
    {isEditing ? (
      <form onSubmit={handleSubmit}>
        <div className="flex items-center gap-8 ">
          <img src="src\img-prueba.jpeg" alt="imagen de perfil" className="rounded-full w-52 h-52" />
          <div className="flex flex-col">
            <h2 className="font-bold text-lg mb-1">{profileData.Nombres} {profileData.Apellidos}</h2>
            <p className="text-gray-500">{profileData.Correo}</p>
          </div>
          <button type="submit"
          className="bg-[#0091BD] hover:bg-[#0B6985FF] text-white font-bold py-4 px-4 rounded-lg focus:outline-none focus:shadow-outline transition duration-300"
        >
          Confirmar
          {console.log(profileData)}

        </button>
          <button
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-4 px-4 rounded-lg focus:outline-none focus:shadow-outline transition duration-300"
          onClick={handleCancel}
        >
          Cancelar
        </button>
        </div>

        <div className="flex justify-between py-5">
          <section className="w-1/2">
            <h2 className='font-bold mb-2'>Información Personal</h2>
            <h3 className="font-bold text-lg mb-1" >Fecha de nacimiento:</h3>
            <p className="text-lg" >{profileData.Fecha_Nacimiento}</p>

            <label htmlFor="Genero" className="font-bold text-lg py-2">Género: </label>
            <select
              className="shadow border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-blue-500"
              name="Genero"
              value={roomieData.Genero}
              onChange={handleChange}
            >
              
              <option value="Masculino">Masculino</option>
              <option value="Femenino">Femenino</option>
              <option value="Otro">Otro</option>
              <option value=" Prefiero no decir">Prefiero no decir</option>
            </select>

            <label htmlFor="Ubicacion" className="font-bold text-lg py-2">Ubicacion: </label>
            <select
              className="shadow border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-blue-500"
              name="Ubicacion"
              value={roomieData.Ubicacion}
              onChange={handleChange}
              disabled={comunas.value === ''} 
            >
              {comunas.map((comuna)=>(
                <option key={comuna.value} value={comuna.value}>
                  {comuna.label} 
                </option>
              ))}
              
              
            </select>

          </section>

          <section className="w-1/2">
            <h2 className="font-bold mb-2">Información académica</h2>
            <h3 className="font-bold text-lg mb-1">Universidad:</h3>
            <p className="text-lg">Universidad Tecnologica Metropolitana</p>

            <label htmlFor="Id_Carrera" className="font-bold text-lg py-2">Carrera</label>
            <select  className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-blue-500"
            name="Id_Carrera" id="Id_Carrera" value={profileData.Id_Carrera} onChange={handleChange} >
              {carreras.map((carreraa)=>(
                <option key={carreraa.value} value={carreraa.value}>
                  {carreraa.label} 
                </option>
              ))}
            </select>
            

            <label htmlFor="Ano_Ingreso" className="font-bold text-lg py-2">Año de ingreso</label>
            <input
              name="Ano_Ingreso"
              type="number"
              id="Ano_Ingreso"
              min="1900"
              max={new Date().getFullYear()}
              value={profileData.Ano_Ingreso}
              onChange={handleChange}
              className="w-full p-2 rounded border border-gray-300"
            />
          </section>
        </div>

        <div className="pt-5">
          <div className="bio">
            <label htmlFor="biografia" className="font-bold text-lg py-2">Biografía:</label>
            <textarea
              name="Biografia"
              id="Biografia"
              rows="7"
              cols="50"
              maxLength={400}
              value={roomieData.Biografia}
              onChange={handleChange}
              className="bg-gray-300 rounded p-2 text-lg border border-gray-300 w-full box-border resize-none max"
              
            />
          </div>

          <div className="flex justify-between gap-5">
            
          {/* Intereses */}
       <div className="mb-10">
          <label className="block text-[#0092BC] font-bold mb-2">Intereses</label>
          <button
            type="button"
            onClick={openModal}
            className="bg-[#0092BC] hover:bg-[#0B6985FF] text-white font-bold py-2 px-4 rounded-lg focus:outline-none focus:shadow-outline"
          >
            Seleccionar Intereses
          </button>

          {/* Mostrar intereses confirmados debajo */}
          {intereses.length > 0 && (
            <div className="mt-4">
              <h3 className="text-black font-bold mb-2">Intereses seleccionados:</h3>
              <div className="flex flex-wrap gap-4">
                {intereses.map((Intereses) => (
                  <span
                    key={Intereses}
                    className="bg-[#0092BC] text-white px-3 py-2 rounded-3xl"
                  >
                    {Intereses}
                  </span>
                ))}
              </div>
            </div>
          )}

        </div>

        {/* preferncias */}
       <div className="mb-10">
          <label className="block text-[#0092BC] font-bold mb-2">Preferencias</label>
          <button
            type="button"
            onClick={openModalPref}
            className="bg-[#0092BC] hover:bg-[#0B6985FF] text-white font-bold py-2 px-4 rounded-lg focus:outline-none focus:shadow-outline"
          >
            Seleccionar Preferencias
          </button>

          {/* Mostrar preferencias confirmados debajo */}
          {preferencias.length > 0 && (
            <div className="mt-4">
              <h3 className="text-black font-bold mb-2">Preferencias seleccionadas:</h3>
              <div className="flex flex-wrap gap-4">
                {preferencias.map((Preferencias) => (
                  <span
                    key={Preferencias}
                    className="bg-[#0092BC] text-white px-3 py-2 rounded-3xl"
                  >
                    {Preferencias}
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
      <div >
        {/*Si isEditing es false, se mostrara la vista de perfil*/ }
          
        <div className="flex items-center gap-8 ">
          <img src="src\img-prueba.jpeg" alt="Imagen de perfil" className='rounded-full w-52 h-52'/>
          <div className="flex flex-col">
            <h2 className="font-bold text-xl mb-1">{profileData.Nombres} {profileData.Apellidos}</h2>
            <p className="text-gray-500">{profileData.Correo}</p>
          </div>
          
          <button
          className="bg-[#0091BD] hover:bg-[#0B6985FF] text-white font-bold py-4 px-4 rounded-lg focus:outline-none focus:shadow-outline transition duration-300"
          onClick={toggleEdit}
        >
          Editar
        </button>
        </div>

        <div className="flex justify-between py-5">
          <section className="w-1/2">
          <h2 className='font-bold text-lg mb-4'>Información Personal</h2>
          <h3 className="font-bold text-lg mb-2" >Fecha de nacimiento:</h3>
          <p className="text-lg" >{profileData.Fecha_Nacimiento}</p>

          <h3 className="font-bold text-lg mb-3">Género:</h3>
          <p className="text-lg" >{roomieData.Genero}</p>

          <h3 className="font-bold text-lg mb-3">Ubicacion:</h3>
          <p className="text-lg" >{roomieData.Ubicacion}</p>
          </section>

          <section className="w-1/2">
            <h2 className='font-bold text-lg mb-4'>Información académica</h2>
            <h3 className="font-bold text-lg mb-3">Universidad:</h3>
            <p className="text-lg">Universidad Tecnologica Metropolitana</p>

            <h3 className="font-bold text-lg mb-4">Carrera:</h3>
            <p className="text-lg">{profileData.NombreCarrera}</p>

            <h3 className="font-bold text-lg mb-4">Año de ingreso:</h3>
            <p className="text-lg">{profileData.Ano_Ingreso}</p>
          </section>
        </div>

        <div className="pt-5">
          <div className="Biografia">
            <h2 className='font-bold text-lg mb-2'>Biografía</h2>
            <p className="break-words bg-gray-300 rounded p-2 text-lg border border-gray-300 w-full max-w-[700px]">{roomieData.Biografia}</p>
          </div>
          
          <div className="flex justify-between gap-5">
            {/* Intereses */}
          <div className="w-1/2 mb-10">
            <label className="block text-[#0092BC] font-bold mb-2">Intereses</label>
            

          {/* Mostrar intereses confirmados debajo */}
          {intereses.length > 0 &&  (
                <div className="mt-4 ">
                  <div className="grid grid-cols-2 gap-2">
                    {intereses.map((interes) =>(
                      <span
                        key={interes}
                        className="bg-[#0092BC] text-white px-3 py-2 rounded-3xl"
                      >
                        {interes}
                      </span>
                    ))}
                  </div>
                </div>
              )}
          </div>
              
            

            { /*preferncias*/ }
       <div className="w-1/2 mb-10">
          <label className="block text-[#0092BC] font-bold mb-2">Preferencias</label>
          

          {/* Mostrar intereses confirmados debajo */}
          {preferencias.length > 0 && (
                <div className="mt-4 ">
                  <div className="grid grid-cols-2 gap-2">
                  {preferencias.map((preferencia) => (
                  <span
                    key={preferencia}
                    className="bg-[#0092BC] text-white px-3 py-2 rounded-3xl"
                  >
                    {preferencia}
                  </span>
                ))}
              </div>
            </div>
          )}
            </div>

              
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
            {Intereses.map((interest) => (
                <button
                  type="button"
                  key={interest}
                  onClick={() => toggleInterest(interest)}
                  className={` px-4 py-2 rounded-lg ${
                    tempSelectedInterests.includes(interest)
                      ? 'bg-[#0092BC] text-white'
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
                className="bg-[#0092BC]  hover:bg-[#007a9a] text-white font-bold py-2 px-4 rounded-lg mr-2"
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
          <div className="bg-white rounded-lg shadow-lg p-5 w-full max-w-lg min-w-[700px] ">
            <h2 className="text-2xl font-bold mb-4">Selecciona tus preferencias</h2>
            <div className="grid grid-cols-5 gap-4 ">
            {Preferencias.map((preference) => (
                <button
                  type="button"
                  key={preference}
                  onClick={() => togglePrefrerences(preference)}
                  className={` px-4 py-2 rounded-lg ${
                    tempSelectedPreferences.includes(preference)
                      ? 'bg-[#0092BC] text-white'
                      : 'bg-gray-200 text-black'
                  }`}
                  
                >
                  
                  {preference}
                </button>
              ))}
            </div>
            <div className="flex justify-end p-5">
              <button
                onClick={confirmPreferences}
                className="bg-[#0092BC]  hover:bg-[#007a9a] text-white font-bold py-2 px-4 rounded-lg mr-2"
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