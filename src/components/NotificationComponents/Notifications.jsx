import React, { useState, useEffect } from 'react';
import axios from "axios";
import Cookies from 'js-cookie';

const Notification = () => {
  const [show, setShow] = useState(false);
  const [message, setMessage] = useState('');
  const [recibidos, setRecibidos] = useState(0);

  const id = parseInt(localStorage.getItem('roomieId')); // PARA PROBAR SIN LOGIN

  // DESCOMENTAR EN VERSIÓN FINAL
  // const id = parseInt(Cookies.get('roomieId'));

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/Mensajes/Recibidos/${id}`); // Mensajes recibidos
        const mensajes = response.data;

        // Filtrar los mensajes con estado "No leido"
        const cantMessage = mensajes.filter(mensaje => mensaje.Estado === "No leido").length;

        setRecibidos(cantMessage); // Guardar la cantidad en el estado

        // Si hay mensajes no leídos, mostrar la notificación
        if (cantMessage > 0) {
          setMessage(`Tienes ${cantMessage} mensaje(s) sin leer`);
          setShow(true);
        }
      } catch (error) {
        console.error("Error al obtener los mensajes", error);
      }
    };

    fetchMessages();
  }, [id]);

  const handleClose = () => {
    setShow(false);
  };

  return (
    show && (
      <div className="fixed bottom-4 right-4 bg-blue-500 text-white p-4 rounded shadow-lg">
        <div className="flex justify-between items-center">
          <span>{message}</span>
          <button onClick={handleClose} className="ml-4 text-lg font-bold">
            &times;
          </button>
        </div>
      </div>
    )
  );
};

export default Notification;
