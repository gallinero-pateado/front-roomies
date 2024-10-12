import React from 'react';
import { Outlet } from 'react-router-dom';


const Layout = () => {
  return (
    <div className="flex flex-col min-h-screen bg-sky-100">
      {/* Header */}
      <header className="bg-blue-600 text-white p-7">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-5xl font-bold italic">ULINK</h1>
          <div>
            <a href="/" className="bg-blue-800 text-white px-8 py-3 rounded mr-5 font-bold italic text-lg hover:bg-sky-400 transition duration-300">
              Practicas
            </a>
            <a href="/" className="bg-blue-800 text-white px-9 py-3 rounded mr-5 font-bold italic text-lg hover:bg-blue-400 transition duration-300">
              Roomies
            </a>
            <a href="/" className="bg-blue-800 text-white px-9 py-3 rounded mr-5 font-bold italic text-lg hover:bg-blue-400 transition duration-300">
              Descuentos
            </a>
            <a href="/" className="bg-blue-800 text-white px-9 py-3 rounded mr-5 font-bold italic text-lg hover:bg-blue-400 transition duration-300">
              Log In
            </a>
          </div>
        </div>
      </header>

      {/* Body */}
      <main className="flex-grow container mx-auto my-8 flex flex-col md:flex-row items-start justify-between px-4">
        <div className="flex flex-col items-start max-w-2xl w-full">
          <Outlet /> {/* Aquí se renderizarán los componentes de las rutas internas */}
        </div>
        
      </main>

      {/* Footer */}
      <footer className="bg-blue-600 text-white text-center p-6">
        <p>Desarrollado por estudiantes UTEM</p>
        <p>tallersistemasdesoftware@utem.cl / Teléfono (---) --- --- ---</p>
        <p>&copy; 2024 ULINK. Todos los derechos reservados.</p>
      </footer>
    </div>
  );
};

export default Layout;