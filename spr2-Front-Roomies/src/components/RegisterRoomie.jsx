import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import intereses from './Const/intereses'
import preferences from './Const/preferences'


const RegisterRoomie = () => {
  const [formData, setFormData] = useState({
    Nombres: 'Sebastian  poblete',
    Correo:'spobletec@utem.cl',
    Fecha_Nacimiento: '09/02/2003',
    Ano_ingreso : '2021',
    Universidad:'Universidad Tecnolgoica Metropolitana',
    Carrera: 'Ingenieria informatica', // verificar como es este tipo de dato
    Genero: '',
    Biografia:'',
    Intereses: [],
    Preferencias: [],
  });

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    console.log('Register attempt with:', formData);

    /*Registro utilizando localStorage*/
     // Guardar los datos en localStorage
    localStorage.setItem('roomieProfile', JSON.stringify(formData));

    // Aquí iría la lógica de registro
    /* agregar el metodo post para crear el usuario como roomie*/
    /*try {
      // Aquí debes ajustar la URL a la ruta de tu API que maneje el registro
      const response = await fetch('/api/C_Usuario_Roomie', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
  
      if (!response.ok) {
        throw new Error('Error al registrar el usuario'); // Lanza un error si la respuesta no es exitosa
      }
  
      const data = await response.json(); // Aquí puedes obtener datos adicionales del servidor
  
      console.log('Registro exitoso:', data);
      setSuccess('Registro exitoso');
      
      // Redirigir al perfil de roomie
      navigate('/profile');
    } catch (error) {
      console.error('Error en el registro:', error);
      setError('Error en el registro. Por favor, intenta de nuevo.'); // Mostrar el error
    } */
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
    setFormData({ ...formData, Intereses: tempSelectedInterests });
    setIsModalOpen(false);
  };

  // Confirmar los preferencias seleccionados y cerrar el modal
  const confirmPreferences = () => {
    setConfirmedPreferences(tempSelectedPreferences); // Solo los intereses seleccionados se confirman
    setFormData({ ...formData, Preferencias: tempSelectedPreferences });
    setIsModalOpenP(false);
  };


  // Abrir el modal
  const openModal = () => {
    setTempSelectedInterests(formData.Preferencias); // Cargar los intereses actuales al modal
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
    <div className="min-h-screen bg-sky-100 flex items-center justify-center  ">
      <form onSubmit={handleSubmit} className="bg-white shadow-2xl rounded-3xl px-10 pt-10 pb-12 mb-4 w-full max-w-3xl">
        <div className="text-center">
          <h2 className="text-5xl font-bold mb-12 text-[#0092BC] text-center">Perfil Roomie</h2>
          <span className="text-lg  mb-8 text-center"> Termina de completar tu perfil para buscar un roomie</span>
        </div>
        

        {/* Biografia */}
        <div className="mb-6">
            
          <label className="block text-[#0092BC] text-xl font-bold mb-2" htmlFor="biography">
            Biografia:
          </label>
          <div className="grid grid-cols-2 gap-6 ">
            <textarea
                name="Biografia"
                id="Biografia"
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
          <label className="block text-[#0092BC] text-xl font-bold mb-2">Intereses</label>
          <button
            type="button"
            onClick={openModal}
            className="bg-[#0092BC] hover:bg-[#007a9a] text-white font-bold py-2 px-4 rounded-lg mr-2"
          >
            Seleccionar Intereses
          </button>

          {/* Mostrar intereses confirmados debajo */}
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
        </div>

        {/* Preferencias*/}
        <div className="mb-6">
          <label className="block text-[#0092BC] text-xl font-bold mb-2">Preferencias</label>
          <button
            type="button"
            onClick={openModalPref}
            className="bg-[#0092BC] hover:bg-[#007a9a] text-white font-bold py-2 px-4 rounded-lg mr-2"
          >
            Seleccionar Preferencias
          </button>

          {/* Mostrar Preferenncias confirmados debajo */}
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

          {/*Genero*/ }
          <div className="mb-6">
            
          <label htmlFor="Genero">Género: </label>
            <select
              className="shadow  border rounded  py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-blue-500"
              name="Genero"
              value={formData.Genero}
              onChange={handleChange}
            >
              <option value="">Seleccionar genero</option>
              <option value="Masculino">Masculino</option>
              <option value="Femenino">Femenino</option>
              <option value="Otro">Otro</option>
              <option value=" Prefiero no decir">Prefiero no decir</option>s
            </select>
        </div>
        <div className="flex justify-center mb-8">
        <button
          className="bg-[#0092BC] hover:bg-[#007a9a] text-white font-bold py-4 px-8 rounded-lg focus:outline-none focus:shadow-outline transition duration-300"
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
                className="bg-[#0092BC] hover:bg-[#007a9a] text-white font-bold py-2 px-4 rounded-lg mr-2"
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
                className="bg-[#0092BC] hover:bg-[#007a9a] text-white font-bold py-2 px-4 rounded-lg mr-2"
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
