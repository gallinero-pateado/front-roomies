import React, { useState,useContext } from 'react';
import comunas from '../Const/comunas';
import intereses from '../Const/intereses';
import preferencias from '../Const/preferences';
import carreras from '../Const/carreras';
import { ThemeContext } from "../../context/ThemeContext";
import themeStyles from "../Const/themes"

const Filter = ({ onFilter }) => {

  const { theme } = useContext(ThemeContext);
  const styles = themeStyles[theme]; // Obtener estilos según el tema

  const [selectedComuna, setSelectedComuna] = useState('');
  const [selectedIntereses, setSelectedIntereses] = useState([]);
  const [selectedPreferencias, setSelectedPreferencias] = useState([]);
  const [selectedCarrera, setSelectedCarrera] = useState('');
  const [showIntereses, setShowIntereses] = useState(false);
  const [showPreferencias, setShowPreferencias] = useState(false);

  const handleComunaChange = (e) => setSelectedComuna(e.target.value);

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
  }
  const handleFilter = () => {
    onFilter({
      comuna: selectedComuna,
      intereses: selectedIntereses,
      preferencias: selectedPreferencias,
      carrera: selectedCarrera,
    });
  
    // Resetar estados de forma consistente
    setSelectedCarrera('');
    setSelectedComuna('');
    setSelectedIntereses([]); // Reinicia como un array vacío
    setSelectedPreferencias([]); // Reinicia como un array vacío
  };
  
  return (
    <div className={`${styles.card}  w-64  ${styles.inputBorder} rounded-lg p-4 shadow-md`}>
      <h2 className={`${styles.text} text-xl font-semibold mb-4 `}>Filtrar Roomies</h2>

      <div className="mb-4">
        <label className={`${styles.text} block text-md `}>Comuna:</label>
        <select
          value={selectedComuna}
          onChange={handleComunaChange}
          className={`${styles.inputText} ${styles.inputBg} w-full mt-1 p-2 border border-gray-300 rounded `}
        >
          {comunas.map((comuna, index) => (
            <option key={`comuna-${index}`} value={comuna.value}>
              {comuna.label}
            </option>
          ))}
        </select>
      </div>

      <div className="mb-4">
        <button
          type="button"
          onClick={() => setShowIntereses(!showIntereses)}
          className="w-full text-left text-sm text-gray-600 bg-gray-100 p-2 rounded "
        >
          Intereses {showIntereses ? '▲' : '▼'}
        </button>
        {showIntereses && (
          <div className="mt-2">
            {intereses.map((interes) => (
              <div key={interes} className="flex items-center mt-1">
                <input
                  type="checkbox"
                  value={interes}
                  checked={selectedIntereses.includes(interes)}
                  onChange={handleInteresesChange}
                  className="mr-2"
                />
                <span className={`${styles.text} text-md  `}>{interes}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="mb-4">
        <button
          type="button"
          onClick={() => setShowPreferencias(!showPreferencias)}
          className="w-full text-left text-sm text-gray-600 bg-gray-100 p-2 rounded"
        >
          Preferencias {showPreferencias ? '▲' : '▼'}
        </button>
        {showPreferencias && (
          <div className="mt-2">
            {preferencias.map((preferencia) => (
              <div key={preferencia} className="flex items-center mt-1">
                <input
                  type="checkbox"
                  value={preferencia}
                  checked={selectedPreferencias.includes(preferencia)}
                  onChange={handlePreferenciasChange}
                  className="mr-2"
                />
                <span className={`${styles.text} text-md  `}>{preferencia}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="mb-4">
        <label className={`${styles.text}  block text-md `}>Carrera:</label>
        <select
          value={selectedCarrera}
          onChange={handleCarreraChange}
          className={`${styles.inputText} ${styles.inputBg} w-full mt-1 p-2 border border-gray-300 rounded `}
        >
          {carreras.filter(carrera => carrera.value).map((carrera) => (
            <option key={carrera.value} value={carrera.value}>
              {carrera.label}
            </option>
          ))}
        </select>
      </div>

      <button
        onClick={handleFilter}
        className="bg-[#0092bc] text-white w-full py-2 rounded hover:bg-blue-600 transition"
      >
        Aplicar Filtros
      </button>
    </div>
  );
};

export default Filter;
