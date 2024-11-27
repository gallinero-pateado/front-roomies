import React, { useContext } from 'react';
import { Outlet } from 'react-router-dom';
import { ThemeContext } from '../../context/ThemeContext';

const Layout = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <div className={`flex flex-col min-h-screen font-ubuntu ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-[#DAEDF2] text-black'}`}>
      {/* Header */}
      <header className="bg-[#0092BC] text-white p-6">
        <div className="flex justify-between items-center mx-auto">
          <h1 className="text-5xl font-bold italic">ULINK</h1>
          <button onClick={toggleTheme} className="bg-gray-800 text-white px-4 py-2 rounded">
            {theme === 'dark' ? 'Modo Claro' : 'Modo Oscuro'}
          </button>
        </div>
      </header>

      {/* Body */}
      <main className="flex-grow flex flex-col md:flex-row container mx-auto my-8 items-start justify-center w-full">
        <div className="flex flex-col items-start max-w-2xl w-full">
          <Outlet /> {/* Aquí se renderizarán los componentes de las rutas internas */}
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-[#0092BC] text-white text-center p-2">
        <p>Desarrollado por estudiantes UTEM</p>
        <p>tallersistemasdesoftware@utem.cl / Teléfono (---) --- --- ---</p>
        <p>&copy; 2024 ULINK. Todos los derechos reservados.</p>
      </footer>
    </div>
  );
};

export default Layout;