import React, { useEffect, useState } from "react";
import axios from "axios";

const ReportList = ({ userId }) => {
  const [reports, setReports] = useState([]);

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const response = await axios.get(
          `${apiurl}/Reportes/Enviados/${userId}`
        );
        setReports(response.data);
      } catch (error) {
        console.error("Error al obtener los reportes", error);
      }
    };
    fetchReports();
  }, [userId]);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Reportes</h2>
      {reports.length === 0 ? (
        <p>No hay reportes para este usuario.</p>
      ) : (
        <ul>
          {reports.map((report) => (
            <li
              key={report.ID}
              className="mb-4 p-4 border border-gray-300 rounded"
            >
              <p>
                <strong>Motivo:</strong> {report.Motivo}
              </p>
              <p>
                <strong>Descripción:</strong> {report.Descripcion}
              </p>
              <p>
                <strong>Estado:</strong> {report.Estado}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ReportList;
