import React, { useState,useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import intereses from '../Const/intereses'
import preferencias from '../Const/preferences'


const RegisterRoomie = () => {
  const [formData, setFormData] = useState({
    //Datos referenciados al perfil de roomie
    Genero: '',
    Biografia: '',
    Intereses: '',
    Preferencias: '',
  });

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  useEffect(()=>{

    //obtener el uid  del usuario
    const id = 202 // id para probar con usuario de la bd, en proyecto final esta se obtendra al iniciar sesion y traer por localstorage

    const checkRoomieProfile = async()=>{
      try{
          const response = await axios.get(`http://localhost:8080/Usuario/${id}`,{
            
          });
         
          //redirigue si existe el perfil de roomie
          if(response.data.Nombres){
            console.log(response);
            //navigate('/profile');
          }

      }catch(error){
        console.error('Error al verificar la completación del perfil:', error);
      }
    }

    checkRoomieProfile();
  },[navigate]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Función de validación
  const validateForm = () => {
    let error = {};

    // Validar que la biografía no esté vacía
    if (!formData.Biografia.trim()) {
        error.Biografia = 'La biografía no puede estar vacía.';
    }

    // Validar que haya al menos un interés seleccionado
    if (formData.Intereses.length < 1) {
        error.Intereses = 'Debe seleccionar al menos un interés.';
    }

    // Validar que haya al menos una preferencia seleccionada
    if (formData.Preferencias.length < 1) {
        error.Preferencias = 'Debe seleccionar al menos una preferencia.';
    }

    // Validar que el género sea uno de los valores permitidos
    const allowedGenders = ['Masculino', 'Femenino', 'Otro', 'Prefiero no decir'];
    if (!allowedGenders.includes(formData.Genero)) {
        error.Genero = 'Debe seleccionar un género válido.';
    }

    setError(error);
    // Si no hay errores, devuelve true, de lo contrario false
    return Object.keys(error).length === 0;
};


  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if(validateForm()){

      //const profileFormData = {
        
    //};
      console.log('Register attempt with:', formData);

    

    
    navigate('/profile');

    }
    else{
      alert('Por favor, Complete todos los campos antes de enviar el formulario.');
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
  setConfirmedInterests(tempSelectedInterests); // Solo los intereses seleccionados se confirman
  const updatedProfile = { ...formData, Intereses: tempSelectedInterests };
  setFormData(updatedProfile);

  // Guardar los datos actualizados en localStorage
  localStorage.setItem('roomieProfile', JSON.stringify(updatedProfile));


  setIsModalOpen(false);
};

// Confirmar los preferencias seleccionados y cerrar el modal
const confirmPreferences = () => {
  setConfirmedPreferences(tempSelectedPreferences); // Solo los intereses seleccionados se confirman
  const updatedProfile = { ...formData, Preferencias: tempSelectedPreferences };
  setFormData(updatedProfile);

  // Guardar los datos actualizados en localStorage
  localStorage.setItem('roomieProfile', JSON.stringify(updatedProfile))

  setIsModalOpenP(false);
};


// Abrir el modal
const openModal = () => {
  setTempSelectedInterests(formData.Intereses); // Cargar los intereses actuales al modal
  setIsModalOpen(true);
};

const openModalPref = () => {
  setTempSelectedPreferences(formData.Preferencias); // Cargar los intereses actuales al modal
  setIsModalOpenP(true);
};

// Cerrar el modal
const closeModal = () => {
  setIsModalOpen(false);
};

const closeModalP = () => {
  setIsModalOpenP(false);
};






  return (
    <div className="min-h-screen  flex items-center justify-center  ">
      <form onSubmit={handleSubmit} className="bg-white shadow-2xl rounded-3xl px-10 pt-10 pb-12 mb-4 w-full max-w-3xl">
        <div className="text-center">
          <h2 className="text-5xl font-bold mb-12 text-[#0092BC] text-center">Perfil Roomie</h2>
          <span className="text-lg  mb-8 text-center"> Termina de completar tu perfil para buscar un roomie</span>
        </div>
        {/* Biografia */}
        <div className="mb-6">

          <label className="block text-[#0092BC] text-xl font-bold mb-2 max-" htmlFor="biography">
            Biografía:
          </label>
          {error.Biografia && <p style={{ color: 'red' }}>{error.Biografia}</p>}
          <div className="grid grid-cols-2 gap-6 ">
            <textarea
              
              name="Biografia"
              id="Biografia"
              rows="8"
              cols="50"
              maxLength={400}
              placeholder='Escribe una biografia para que los posibles roomies te conozcan un poco mas'
              onChange={handleChange}
              className="bg-gray-300 p-2 rounded w-full md:w-[600px] min-w-[300px] resize-none "
            />
          </div>
        </div>

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
          {confirmedInterests.length > 0 && (
            <div className="mt-4">
              <h3 className="text-black font-bold mb-2">Intereses seleccionados:</h3>
              <div className="flex flex-wrap gap-4">
                {confirmedInterests.map((Intereses) => (
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
          {error.Intereses && <p style={{ color: 'red' }}>{error.Intereses}</p>}
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

          {/* Mostrar intereses confirmados debajo */}
          {confirmedPreferences.length > 0 && (
            <div className="mt-4">
              <h3 className="text-black font-bold mb-2">Preferencias seleccionadas:</h3>
              <div className="flex flex-wrap gap-4">
                {confirmedPreferences.map((Preferencias) => (
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
          {error.Preferencias && <p style={{ color: 'red' }}>{error.Preferencias}</p>}
        </div>

        {/*Genero*/}
        <div className="mb-6">

          <label htmlFor="Genero">Género: </label>
          <select
            className="shadow  border rounded  py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-blue-500"
            name="Genero"
            value={formData.Genero}
            onChange={handleChange}
          >
            <option value="" disabled selected>Selecciona un género</option>
            <option value="Masculino">Masculino</option>
            <option value="Femenino">Femenino</option>
            <option value="Otro">Otro</option>
            <option value="Prefiero no decir">Prefiero no decir</option>
          </select>
          {error.Genero && <p style={{ color: 'red' }}>{error.Genero}</p>}
        </div>
        <div className="flex justify-center mb-8">
          <button
            className="bg-[#0092BC] hover:bg-[#007a9a] text-white font-bold py-4 px-8 rounded-lg focus:outline-none focus:shadow-outline transition duration-300"
          >
            Finalizar
          </button>
        </div>

      </form>

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


      {isModalOpenP && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-5 w-full max-w-lg min-w-[700px] ">
            <h2 className="text-2xl font-bold mb-4">Selecciona tus preferencias</h2>
            <div className="grid grid-cols-5 gap-4 ">
              {preferencias.map((preference) => (
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
    </div>
  );
};

export default RegisterRoomie;
