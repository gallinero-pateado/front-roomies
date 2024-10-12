import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import comunas from './comunas';
import intereses from './intereses'
import preferences from './preferences'


const RegisterRoomie = () => {
  const [formData, setFormData] = useState({
    ubication:'',
    biography:'',
    interests:'',
    preferences: ''
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Register attempt with:', formData);
    // Aquí iría la lógica de registro
    /* agregar el metodo post para crear el usuario como roomie*/ 

    // Despues de terminar el registro, redirigir al perfil de roomie
    navigate('/profile');
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
    setFormData({ ...formData, interests: tempSelectedInterests });
    setIsModalOpen(false);
  };

  // Confirmar los preferencias seleccionados y cerrar el modal
  const confirmPreferences = () => {
    setConfirmedPreferences(tempSelectedPreferences); // Solo los intereses seleccionados se confirman
    setFormData({ ...formData, preferences: tempSelectedPreferences });
    setIsModalOpenP(false);
  };


  // Abrir el modal
  const openModal = () => {
    setTempSelectedInterests(formData.interests); // Cargar los intereses actuales al modal
    setIsModalOpen(true);
  };

  const openModalPref = () => {
    setTempSelectedPreferences(formData.preferences); // Cargar los intereses actuales al modal
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
    <div className="min-h-screen bg-sky-100 flex items-center justify-center  ">
      <form onSubmit={handleSubmit} className="bg-white shadow-2xl rounded-3xl px-10 pt-10 pb-12 mb-4 w-full max-w-3xl">
        <div className="text-center">
          <h2 className="text-4xl font-bold mb-8 text-blue-800 text-center">Perfil Roomie</h2>
          <span className="text-lg  mb-8 text-center"> Termina de completar tu perfil para buscar un roomie</span>
        </div>
        

        {/* Biografia */}
        <div className="mb-6">
            
          <label className="block text-blue-700  font-bold mb-2 " htmlFor="biography">
            Biografia:
          </label>
          <div className="grid grid-cols-2 gap-6 ">
            <textarea
                name="biography"
                id="biography"
                rows="7"
                cols="50"
                placeholder='Escribe una biografia para que los posibles roomies te conozcan un poco mas'
                onChange={handleChange}
                className="bg-gray-300 p-2 rounded w-full md:w-[600px] min-w-[300px]" // Aquí aplicas el color de fondo gris
            />
          </div>
        </div>
        
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

          {/*Ubicacion*/ }
          <div className="mb-6">
            
          <label className="block text-blue-700  font-bold mb-2" htmlFor="ubication">
            Ubicacion:
          </label>
          <div className="grid grid-cols-2 gap-6">
          <select className="shadow  border rounded  py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-blue-500"
            name="ubication" id="ubication" value={formData.ubication} onChange={handleChange} >
              {comunas.map((ubication)=>(
                <option key={ubication.value} value={ubication.value}>
                  {ubication.label} 
                </option>
              ))}
            </select>
          </div>
        </div>
        <div>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-4 px-8 rounded-lg focus:outline-none focus:shadow-outline transition duration-300"
          onClick={handleSubmit}
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

    </div>
  );
};

export default RegisterRoomie;
