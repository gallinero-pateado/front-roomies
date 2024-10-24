import React from 'react';
import { Outlet } from 'react-router-dom';


const Layout = () => {
  return (
    <div className="flex flex-col min-h-screen bg-[#DAEDF2] font-ubuntu">
      {/* Header */}
      <header className="bg-[#0092BC] text-white p-6">
        <div className="flex justify-between items-center mx-auto">
          <h1 className="text-5xl font-bold italic">ULINK</h1>
          <div>
            <a href="/roomies" className="bg-[#A3D9D3] text-[#0092BC] px-8 py-3 rounded mr-5 font-bold italic text-lg hover:bg-[#0092BC] hover:text-white
            transition duration-300">
              Roomies
            </a>
            <a href="/profile" className="bg-[#A3D9D3] text-[#0092BC] px-8 py-3 rounded mr-5 font-bold italic text-lg hover:bg-[#0092BC] hover:text-white
            transition duration-300">
              Perfil
            </a>
            <a href="main" className="bg-[#A3D9D3] text-[#0092BC] px-8 py-3 rounded mr-5 font-bold italic text-lg hover:bg-[#0092BC] hover:text-white
            transition duration-300">
              Volver
            </a>
            
          </div>
        </div>
      </header>

      {/* Body */}
      <main className="flex-grow flex flex-col md:flex-row container mx-auto my-8 items-start justify-between px-4 w-full">
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