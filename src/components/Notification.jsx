// src/components/Notification.jsx
import React, { useState, useEffect } from 'react';

const Notification = () => {
  const [show, setShow] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    // Simula la llegada de una notificación después de 5 segundos
    setTimeout(() => {
      setMessage('Tienes un nuevo mensaje');
      setShow(true);
    }, 5000);
  }, []);

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