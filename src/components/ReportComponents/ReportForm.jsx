import React, { useState,useContext } from "react";
import { ThemeContext } from "../../context/ThemeContext";
import themeStyles from "../Const/themes"
import axios from "axios";

const ReportForm = ({ reportedUserId, reportingUserId, onClose }) => {
  const [reason, setReason] = useState("");
  const [description, setDescription] = useState("");

  const { theme } = useContext(ThemeContext);
  const styles = themeStyles[theme]; // Obtener estilos según el tema

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("${apiurl}/Reportes", {
        UsuarioReportadoID: reportedUserId,
        UsuarioReportanteID: reportingUserId,
        Motivo: reason,
        Descripcion: description,
        Estado: "Pendiente",
      });
      onClose();
    } catch (error) {
      console.error("Error al enviar el reporte", error);
    }
  };
return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className={`${styles.card}  rounded-lg shadow-lg p-5 w-full max-w-lg`}>
        <h2 className="text-2xl font-bold mb-4">Reportar Usuario</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-bold mb-2">
              Motivo del reporte:
            </label>
            <select
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              className={`${styles.inputBg} bg-gray-300 shadow  border rounded  py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline focus:border-blue-500`}
              required
            >
              <option value="" disabled>Selecciona un motivo</option>
              <option value="contenido inapropiado">
                Contenido inapropiado
              </option>
              <option value="lenguaje ofensivo">Lenguaje ofensivo</option>
              <option value="spam">Spam</option>
              <option value="acoso">Acoso</option>
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-bold mb-2">
              Descripción detallada:
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className={`${styles.inputText} bg-gray-300 rounded p-2 text-lg border border-gray-300 w-full box-border resize-none max`}
              rows="4"
              required
            ></textarea>
          </div>
          <div className="flex justify-end">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-500 text-white font-bold py-2 px-4 rounded mr-2"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="bg-blue-500 text-white font-bold py-2 px-4 rounded"
            >
              Enviar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ReportForm;
