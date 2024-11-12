import React, { useState } from 'react';
import comunas from './Const/comunas';
import intereses from './Const/intereses';
import preferencias from './Const/preferences';
import carreras from './Const/carreras';

const Filter = ({ onFilter }) => {
  const [selectedComuna, setSelectedComuna] = useState('');
  const [selectedIntereses, setSelectedIntereses] = useState([]);
  const [selectedPreferencias, setSelectedPreferencias] = useState([]);
  const [selectedCarrera, setSelectedCarrera] = useState('');

  const handleComunaChange = (e) => {
    setSelectedComuna(e.target.value);
  };

  const handleInteresesChange = (e) => {
    const value = e.target.value;
    setSelectedIntereses((prev) =>
      prev.includes(value) ? prev.filter((i) => i !== value) : [...prev, value]
    );
  };

  const handlePreferenciasChange = (e) => {
    const value = e.target.value;
    setSelectedPreferencias((prev) =>
      prev.includes(value) ? prev.filter((p) => p !== value) : [...prev, value]
    );
  };

  const handleCarreraChange = (e) => {
    setSelectedCarrera(e.target.value);
  };

  const handleFilter = () => {
    onFilter({
      comuna: selectedComuna,
      intereses: selectedIntereses,
      preferencias: selectedPreferencias,
      carrera: selectedCarrera,
    });
  };

  return (
    <div className="p-4 bg-white rounded shadow-md mb-4">
      <h2 className="text-xl font-bold mb-4">Filtrar Roomies</h2>
      <div className="mb-4">
        <label className="block text-gray-700">Comuna:</label>
        <select
          value={selectedComuna}
          onChange={handleComunaChange}
          className="w-full p-2 border border-gray-300 rounded mt-1"
        >
          {comunas.map((comuna) => (
            <option key={comuna.value} value={comuna.value}>
              {comuna.label}
            </option>
          ))}
        </select>
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Intereses:</label>
        {intereses.map((interes) => (
          <div key={interes} className="flex items-center">
            <input
              type="checkbox"
              value={interes}
              checked={selectedIntereses.includes(interes)}
              onChange={handleInteresesChange}
              className="mr-2"
            />
            {interes}
          </div>
        ))}
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Preferencias:</label>
        {preferencias.map((preferencia) => (
          <div key={preferencia} className="flex items-center">
            <input
              type="checkbox"
              value={preferencia}
              checked={selectedPreferencias.includes(preferencia)}
              onChange={handlePreferenciasChange}
              className="mr-2"
            />
            {preferencia}
          </div>
        ))}
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Carrera:</label>
        <select
          value={selectedCarrera}
          onChange={handleCarreraChange}
          className="w-full p-2 border border-gray-300 rounded mt-1"
        >
          {carreras.map((carrera) => (
            <option key={carrera.value} value={carrera.value}>
              {carrera.label}
            </option>
          ))}
        </select>
      </div>
      <button
        onClick={handleFilter}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 transition duration-300"
      >
        Aplicar Filtros
      </button>
    </div>
  );
};

export default Filter;