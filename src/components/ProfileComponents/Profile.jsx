import { useState, useEffect,useContext } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { toast, ToastContainer } from "react-toastify"; //
import "react-toastify/dist/ReactToastify.css";
import carreras from "../Const/carreras";
import Intereses from "../Const/intereses";
import Preferencias from "../Const/preferences";
import comunas from "../Const/comunas";
import { ThemeContext } from "../../context/ThemeContext";
import themeStyles from "../Const/themes"
const apiurl = "https://api-roomies.tssw.info";

const Profile = () => {

  const { theme } = useContext(ThemeContext);
  const styles = themeStyles[theme]; // Obtener estilos según el tema

  // Estado para los datos del perfil
  const [profileData, setProfileData] = useState({});
  const [roomieData, setRoomieData] = useState({});
  const [inte, setIntereses] = useState([]);
  const [pref, setPreferencias] = useState([]);

  const [isLoading, setIsLoading] = useState(true);

  const uid = Cookies.get('uid');
  const roomieId = Cookies.get("roomieId");
  const authToken = Cookies.get("authToken");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [userResponse, roomieResponse] = await Promise.all([
          axios.get(`${apiurl}/Usuario/${uid}`),
          axios.get(`${apiurl}/UsuarioRoomie/${roomieId}`),
        ]);

        const userData = userResponse.data.usuario;
        console.log(userData);
        const finalProfileData = {
          ...userData,
          NombreCarrera: getCarrera(userData.Id_carrera),
        };

        const roomieData = roomieResponse.data;
        const interesesArray = roomieData.Intereses.split(",");
        const preferencesArray = roomieData.Preferencias.split(",");

        // Actualizar los estados
        setProfileData(finalProfileData);
        setRoomieData(roomieData);
        setIntereses(interesesArray);
        setPreferencias(preferencesArray);
        console.log(profileData);
        console.log(roomieData);  
      } catch (error) {
        console.error("Error al obtener los datos", error);
      }finally {
        setIsLoading(false); // Finaliza la carga
      }
    };

    fetchData();
  }, [uid, roomieId]);

  //obtener el nmobre de la carrera
  const getCarrera = (Id_carrera) => {
    const data = carreras.find((c) => c.value === Id_carrera);
    return data ? data.label : "Carrera no encontrada";
  };

  //obtener el id de la carrera
  const getId = (nombre) => {
    const data = carreras.find((c) => c.label === nombre);
    return data ? data.value : "Carrera no encontrada";
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
      [name]: value,
    });
    
  };

  // Función para manejar el envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();
    let i = 0; //contador para los errores
    try {
      const userData = {
        Id:profileData.Id,
        Firebase_usuario: profileData.Firebase_usuario,
        Nombres: profileData.Nombres,
        Apellidos: profileData.Apellidos,
        Correo: profileData.Correo,
        Fecha_Nacimiento: profileData.Fecha_Nacimiento,
        Ano_Ingreso: profileData.Ano_Ingreso,
        Id_Carrera: parseInt(profileData.Id_carrera),
        Foto_Perfil: profileData.Foto_Perfil,
        Id_Estado_Usuario: profileData.Id_Estado_Usuario,
        Rol:profileData.Rol,
      };

      //actualizar info del perfil
      await axios.put(`${apiurl}/Usuario/${roomieId}`, userData, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`,
        },
      });

    } catch (error) {
      console.error("Error al editar el perfil", error);
      i += 1;
      toast.error("Error al editar el perfil", {
        position: "top-right",
        autoClose: 1000, // El toast desaparecerá después de 1 segundos
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        progress: undefined,
      });
    }

    try {
      //Actualizar datos como roomie
      const newroomieData = {
        Genero: roomieData.Genero,
        Biografia: roomieData.Biografia,
        Intereses: inte.join(","),
        Preferencias: pref.join(","),
        Ubicacion: roomieData.Ubicacion,
      };

      //actualizar info de roomie
      await axios.put(`${apiurl}/UsuarioRoomie/${roomieId}`, newroomieData, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`,
        },
      });

    } catch (error) {
      console.error("Error al editar la informacion de roomie", error);
      i += 1;
      toast.error("Error al editar el perfil", {
        position: "top-right",
        autoClose: 1000, // El toast desaparecerá después de 1 segundos
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        progress: undefined,
      });
    }
    toggleEdit();

    //si hay 0 errrores, mostrar la confirmacion de la edicion
    if (i < 1) {
      // Mostrar un toast en lugar de una alerta, solo si no hay ningun error
      toast.success("Perfil editado correctamente", {
        position: "top-right",
        autoClose: 1000, // El toast desaparecerá después de 1 segundos
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
      setTempSelectedInterests(
        tempSelectedInterests.filter((i) => i !== interest)
      );
    } else {
      setTempSelectedInterests([...tempSelectedInterests, interest]);
    }
  };

  // Manejar los preferencias temporales en el modal
  const togglePrefrerences = (preference) => {
    if (tempSelectedPreferences.includes(preference)) {
      setTempSelectedPreferences(
        tempSelectedPreferences.filter((i) => i !== preference)
      );
    } else {
      setTempSelectedPreferences([...tempSelectedPreferences, preference]);
    }
  };

  // Confirmar los intereses seleccionados y cerrar el modal
  const confirmInterests = () => {
    setConfirmedInterests(tempSelectedInterests); // Solo los intereses seleccionados se confirman
    setIntereses(tempSelectedInterests);
    setIsModalOpen(false);
  };

  // Confirmar los preferencias seleccionados y cerrar el modal
  const confirmPreferences = () => {
    setConfirmedPreferences(tempSelectedPreferences); // Solo los intereses seleccionados se confirman
    setPreferencias(tempSelectedPreferences);
    setIsModalOpenP(false);
  };

  // Abrir el modal
  const openModal = () => {
    setTempSelectedInterests(inte); // Cargar los intereses actuales al modal
    setIsModalOpen(true);
  };

  const openModalPref = () => {
    setTempSelectedPreferences(pref); // Cargar los intereses actuales al modal
    setIsModalOpenP(true);
  };

  // Cerrar el modal
  // Cerrar el modal de intereses sin confirmar cambios
const closeModal = () => {
  setTempSelectedInterests(confirmedInterests); // Restaura los intereses confirmados
  setIsModalOpen(false); // Cierra el modal
};

// Cerrar el modal de preferencias sin confirmar cambios
const closeModalP = () => {
  setTempSelectedPreferences(confirmedPreferences); // Restaura las preferencias confirmadas
  setIsModalOpenP(false); // Cierra el modal
};


  // Estado para almacenar el perfil antes de editar
  const [perfilBackup, setPerfilBackup] = useState(null);
  const [roomieBackup, setRoomieBackup] = useState(null);
  const [interesesBackup, setInteresesBackup] = useState(null)
  const [preferenciasBackup, setPreferenciasBackup] = useState(null)

  // Estado para controlar la vista de formulario/perfil
  const [isEditing, setIsEditing] = useState(false);

  // Función para alternar entre perfil y formulario
  const toggleEdit = () => {
    if (!isEditing) {
      setPerfilBackup({ ...profileData }); // Crea una copia del perfil actual
      setRoomieBackup({ ...roomieData }); // Crea una copia de roomieData
      setInteresesBackup({ ...inte }); // Crea una copia actual
      setPreferenciasBackup({ ...pref }); //crea una copia actua
      
    }
    setIsEditing(!isEditing); // Alterna entre vista y edición
  };
  

  // Función para manejar el clic en el botón de cancelar
  const handleCancel = (e) => {
    e.preventDefault();
  
    // Si tienes backups de los intereses (confirmados antes de la edición), restaura esos
    if (perfilBackup) {
      setProfileData(perfilBackup); // Restaura el perfil a su estado original
      setRoomieData(roomieBackup); 
      setIntereses(interesesBackup);
      setConfirmedPreferences(preferenciasBackup);
    }
  
    // Aquí se asegura de restaurar los intereses y preferencias confirmados antes de la edición.
    setTempSelectedInterests(confirmedInterests); // Restauramos los intereses previos a la edición
    setTempSelectedPreferences(confirmedPreferences); // Restauramos las preferencias previas a la edición
    
    // También puedes limpiar cualquier cambio temporal en otros datos si es necesario
    setIsEditing(false); // Salir del modo de edición
  };
  
  if (isLoading) {
    return <div>cargando perfil de roomie</div>; // Mostrar un indicador de carga mientras verifica
  }

  return (
    <main className={`${styles.card} shadow-md rounded-lg p-4 sm:p-8 lg:p-20 w-full`}  >  
      <ToastContainer />
      {/*si isEditing es true, mostrara el formulario*/}
      {isEditing ? (
        <form onSubmit={handleSubmit} className="max-w-3xl mx-auto p-4" >
          <div className="flex flex-col sm:flex-row items-center gap-8 ">
            <img
              src={profileData.Foto_Perfil }
              alt="imagen de perfil"
              className="w-24 h-24 sm:w-32 sm:h-32 rounded-full border border-gray-300 object-cover mb-4"
            />
            <div className="flex flex-col flex-1">
              <h2 className={`${styles.text}  font-bold text-lg mb-1`}>
                {profileData.Nombres} {profileData.Apellidos}
              </h2>
              <p className="text-gray-500">{profileData.Correo}</p>
            </div>
            <div>
              
            </div>
            <div className="flex flex-col">
            <button
              type="submit"
              className="bg-[#0091BD] hover:bg-[#0B6985FF] mb-2 text-white font-bold py-4 px-4 rounded-lg focus:outline-none focus:shadow-outline transition duration-300"
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
            
          </div>
  
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <section className="w-full  flex flex-col pr-10">
              <h2 className={`${styles.accent} font-bold mb-6 text-xl text-center`}>Información Personal</h2>
              <h3 className={`${styles.text} font-bold text-lg mb-1`}>Fecha de nacimiento:</h3>
              <p className="text-lg">{profileData.Fecha_Nacimiento}</p>
  
              <label htmlFor="Genero" className="font-bold text-lg py-2">
                Género:
              </label>
              <select
                className={`${styles.inputBg} shadow border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-blue-500`}
                name="Genero"
                value={roomieData.Genero}
                onChange={handleChange}
              >
                <option value="Masculino">Masculino</option>
                <option value="Femenino">Femenino</option>
                <option value="Otro">Otro</option>
                <option value=" Prefiero no decir">Prefiero no decir</option>
              </select>
  
              <label htmlFor="Ubicacion" className="font-bold text-lg py-2">
                Ubicacion:
              </label>
              <select
                className={`${styles.inputBg} shadow border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-blue-500`}
                name="Ubicacion"
                value={roomieData.Ubicacion}
                onChange={handleChange}
                disabled={comunas.value === ""}
              >
                {comunas.map((comuna) => (
                  <option key={comuna.value} value={comuna.value}>
                    {comuna.label}
                  </option>
                ))}
              </select>
            </section>
  
            <section className="w-full  flex flex-col">
              <h2 className={`${styles.accent} font-bold mb-6 text-xl text-center`}>Información académica</h2>
              <h3 className={`${styles.text} font-bold text-lg mb-1`}>Universidad:</h3>
              <p className="text-lg">Universidad Tecnologica Metropolitana</p>
  
              <label htmlFor="Id_Carrera" className="font-bold text-lg py-2">
                Carrera
              </label>
              <select
                className={`${styles.inputBg} shadow border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-blue-500`}
                name="Id_carrera"
                id="Id_carrera"
                value={profileData.Id_carrera}
                onChange={handleChange}
              >
                {carreras.map((carreraa) => (
                  <option key={carreraa.value} value={carreraa.value}>
                    {carreraa.label}
                  </option>
                ))}
              </select>
  
              <label htmlFor="Ano_Ingreso" className="font-bold text-lg py-2">
                Año de ingreso
              </label>
              <input
                name="Ano_Ingreso"
                type="number"
                id="Ano_Ingreso"
                min="1900"
                max={new Date().getFullYear()}
                value={profileData.Ano_Ingreso}
                onChange={handleChange}
                className={`${styles.inputBg} ${styles.inputText} w-full p-2 rounded border border-gray-300`}
  
              />
            </section>
          </div>
  
          <div className="pt-5">
            <div className="bio">
              <label htmlFor="biografia" className={`${styles.accent} font-bold text-xl py-2`}>
                Biografía:
              </label>
              <textarea
                name="Biografia"
                id="Biografia"
                rows="7"
                cols="50"
                maxLength={400}
                value={roomieData.Biografia}
                onChange={handleChange}
                className={`${styles.inputText} bg-gray-300 rounded p-2 text-lg border border-gray-300 w-full box-border resize-none max`}
              />
            </div>
  
            <div className="flex justify-between gap-5 mt-5">
              {/* Intereses */}
              <div className=" w-1/2 mb-10">
                <label className={`${styles.accent} block font-bold mb-2 text-xl `}>
                  Intereses
                </label>
                <button
                  type="button"
                  onClick={openModal}
                  className="bg-[#0092BC] hover:bg-[#0B6985FF] text-white font-bold py-2 px-4 rounded-lg focus:outline-none focus:shadow-outline"
                >
                  Seleccionar Intereses
                </button>
  
                {/* Mostrar intereses confirmados debajo */}
                {inte.length > 0 && (
                  <div className="mt-4">
                    <h3 className={`${styles.accent} font-bold mb-2`}>
                      Intereses seleccionados:
                    </h3>
                    <div className="flex flex-wrap gap-4">
                      {inte.map((Intereses) => (
                        <span
                          key={Intereses}
                          className="bg-[#0092BC] font-bold text-center text-white px-3 py-1 mb-2 rounded-xl"
                        >
                          {Intereses}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
  
              {/* preferncias */}
              <div className="w-1/2 mb-10">
                <label className={`${styles.accent} block font-bold mb-2 text-xl `}>
                  Preferencias
                </label>
                <button
                  type="button"
                  onClick={openModalPref}
                  className="bg-[#0092BC] hover:bg-[#0B6985FF] text-white font-bold py-2 px-4 rounded-lg focus:outline-none focus:shadow-outline"
                >
                  Seleccionar Preferencias
                </button>
  
                {/* Mostrar preferencias confirmados debajo */}
                {pref.length > 0 && (
                  <div className="mt-4">
                    <h3 className={`${styles.accent} font-bold mb-2`}>
                      Preferencias seleccionadas:
                    </h3>
                    <div className="flex flex-wrap gap-4">
                      {pref.map((Preferencias) => (
                        <span
                          key={Preferencias}
                          className="bg-[#0092BC] font-bold text-center text-white px-3 py-1 mb-2 rounded-xl"
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
          
        <div className="flex flex-col sm:flex-row items-center gap-8">
          <img src={profileData.Foto_Perfil } alt="" className='w-24 h-24 sm:w-32 sm:h-32 rounded-full border border-gray-300 object-cover mb-4'/>
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
  
        <div className="flex flex-col sm:flex-row justify-between py-5">
          <section className="w-full sm:w-1/2">
          <h2 className={`${styles.accent} font-bold mb-6 text-xl text-center`}>Información Personal</h2>
          <h3 className="font-bold text-lg " >Fecha de nacimiento:</h3>
          <p className="text-xl mb-3" >{profileData.Fecha_Nacimiento}</p>
  
          <h3 className="font-bold text-lg ">Género:</h3>
          <p className="text-xl mb-3" >{roomieData.Genero}</p>
  
          <h3 className="font-bold text-lg ">Ubicacion:</h3>
          <p className="text-xl mb-3" >{roomieData.Ubicacion}</p>
          </section>
  
          <section className="w-full sm:w-1/2">
            <h2 className={`${styles.accent} font-bold mb-6 text-xl text-center`}>Información académica</h2>
            <h3 className="font-bold text-lg ">Universidad:</h3>
            <p className="text-xl mb-3">Universidad Tecnologica Metropolitana</p>
  
            <h3 className="font-bold text-lg">Carrera:</h3>
            <p className={`  text-xl mb-3`}>{profileData.NombreCarrera}</p>
  
            <h3 className="font-bold text-lg">Año de ingreso:</h3>
            <p className={`text-xl mb-3`}>{profileData.Ano_Ingreso}</p>
          </section>
        </div>
  
        <div className="pt-5 ">
          <div className="Biografia">
            <h2 className={`${styles.accent} font-bold text-xl mb-2 `}>Biografía</h2>
            <p className={`text-black break-words bg-gray-300 rounded p-2 text-lg border border-gray-300 w-full max-w-[700px]`}>{roomieData.Biografia}</p>
          </div>
          
          <div className="flex justify-between gap-5 mt-5">
            {/* Intereses */}
          <div className="w-1/2 mb-10">
            <label className={`${styles.accent} block font-bold mb-2 text-xl `}>Intereses</label>
            
  
          {/* Mostrar intereses confirmados debajo */}
          {inte.length > 0 && (
                <div className="mt-4 ">
                  <div className="flex flex-wrap gap-4">
                  {inte.map((intereses) => (
                  <span
                    key={intereses}
                    className="bg-[#0092BC] font-bold text-center text-white px-3 py-1 mb-2 rounded-xl"
                  >
                    {intereses}
                  </span>
                ))}
                  </div>
                </div>
              )}
          </div>
              
            
  
            { /*preferncias*/ }
       <div className="w-1/2 mb-10">
          <label className={`${styles.accent} block font-bold mb-2 text-xl `}>Preferencias</label>
          
  
          {/* Mostrar intereses confirmados debajo */}
          {pref.length > 0 && (
                  <div className="mt-4">
                    <h3 className={`${styles.accent} font-bold mb-2`}>
                      Preferencias seleccionadas:
                    </h3>
                    <div className="flex flex-wrap gap-4">
                      {pref.map((Preferencias) => (
                        <span
                          key={Preferencias}
                          className="bg-[#0092BC] font-bold text-center text-white px-3 py-1 mb-2 rounded-xl"
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
      </div>
  
      
    )}
  
    {/* Modal para seleccionar intereses */}
    {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
           <div className= {`${styles.card} rounded-lg shadow-lg p-5 w-full max-w-lg min-w-[700px] `}>
            <h2 className={`${styles.accent} text-2xl font-bold mb-4"`}>Selecciona tus intereses</h2>
            <div className="grid grid-cols-5 gap-4 ">
            {Intereses.map((interest) => (
                <button
                  type="button"
                  key={interest}
                  onClick={() => toggleInterest(interest)}
                  className={`flex justify-center items-center text-center px-4 py-2 rounded-xl whitespace-normal break-words ${
                    tempSelectedInterests.includes(interest)
                      ? "bg-[#0092BC] text-white"
                      : `${styles.btn} text-white`
                  }`}
                >
                  
                  {interest}
                </button>
              ))}
            </div>
            <div className="flex justify-end p-5">
              <button
                onClick={confirmInterests}
                className="bg-[#0092BC]  hover:bg-[#007a9a] text-white font-bold py-1 text-center px-6 rounded-xl mr-2"
              >  
                Confirmar
              </button>
              <button
                onClick={() => {
                  closeModal(); // Restablece los intereses seleccionados al estado inicial
                }}
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
         <div className= {`${styles.card} rounded-lg shadow-lg p-5 w-full max-w-lg min-w-[900px] `}>
            <h2 className={`${styles.accent} text-2xl font-bold mb-4"`}>Selecciona tus preferencias</h2>
            <div className="grid grid-cols-5 gap-4 ">
            {Preferencias.map((preference) => (
                <button
                  type="button"
                  key={preference}
                  onClick={() => togglePrefrerences(preference)}
                  className={`flex justify-center items-center text-center px-4 py-2 rounded-xl whitespace-normal break-words ${
                    tempSelectedPreferences.includes(preference)
                      ? "bg-[#0092BC] text-white"
                      : `${styles.btn} text-white`
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
    </main>
  );
  };
  export default Profile;
  