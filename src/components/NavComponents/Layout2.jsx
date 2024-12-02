import React, { useContext } from 'react';
import { Outlet, useLocation, NavLink } from 'react-router-dom';
import { ThemeContext } from '../../context/ThemeContext';
import Notification from '../NotificationComponents/Notifications';
import DarkModeToggle from '../DarkModeToggle';
import Cookies from 'js-cookie';

const Layout2 = () => {
  const { theme } = useContext(ThemeContext);
  const location = useLocation(); // Para conocer la ruta actual

  // Verifica si la ruta actual pertenece a alguna sección del Sidebar
  const isSidebarActive = ['/profile', '/fav', '/my-messages'].some((path) =>
    location.pathname.startsWith(path)
  );

 


  const Logout =() =>{

    console.log('Tokens antes de eliminar:', {
      authToken: Cookies.get('authToken'),
      uid: Cookies.get('uid'),
      roomieId: Cookies.get('roomieId')
  });

    const cookieOptions = {
      path: '/',
      secure: true ,
      sameSite: 'Strict',
      domain: ".tssw.info"
    };

    Cookies.remove('authToken', cookieOptions);
    Cookies.remove('uid', cookieOptions);
    Cookies.remove('roomieId', cookieOptions);

    console.log('Tokens después de eliminar:', {
      authToken: Cookies.get('authToken'),
      uid: Cookies.get('uid'),
      roomieId: Cookies.get('roomieId')
  });
  }
  return (
    <div className={`flex flex-col min-h-screen font-ubuntu ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-[#DAEDF2] text-black'}`}>
      {/* Header */}
      <header className="bg-[#0092BC] text-white p-6">
        <div className="flex justify-between items-center mx-auto">
          <h1 className="text-5xl font-bold italic">ULINK</h1>
          
          <div className='flex '>
            <DarkModeToggle  />     
            <NavLink
              to="/roomies"
              className={({ isActive }) =>
                isActive
                  ? 'border-b-4 border-[#7B4B94] text-[#1D4157] bg-[#A3D9D3] px-5 py-3 rounded  ml-5 font-bold italic text-lg'
                  : 'text-[#1D4157] px-8 py-3 rounded ml-5 font-bold italic text-lg hover:bg-[#A3D9D3] transition duration-300'
              }
            >
              Roomies
            </NavLink>
            <NavLink
              to="/profile"
              className={() =>
                isSidebarActive
                  ? 'border-b-4 border-[#7B4B94] text-[#1D4157] bg-[#A3D9D3] px-8 py-3 rounded ml-5 font-bold italic text-lg'
                  : 'text-[#1D4157] px-8 py-3 rounded ml-5 font-bold italic text-lg hover:bg-[#A3D9D3] transition duration-300'
              }
            >
              Perfil
            </NavLink>
            <NavLink
              to="/main"
              className={({ isActive }) =>
                isActive
                  ? 'border-b-4 border-[#7B4B94] text-[#1D4157] bg-[#A3D9D3] px-8 py-3 rounded ml-5 font-bold italic text-lg'
                  : 'text-[#1D4157] px-8 py-3 rounded ml-5 font-bold italic text-lg hover:bg-[#A3D9D3] transition duration-300'
              }
            >
              Volver
            </NavLink>

            <NavLink
              to="https://ulink.tssw.info"
              className="block py-4 px-2 rounded-md transition-colors duration-200 hover:bg-[#DAEDF2] hover:text-[#0092BC] active:bg-[#DAEDF2] active:text-[#0092BC]"
              onClick={Logout}>
              Cerrar sesion
              </NavLink>
          </div>
        </div>
      </header>

      {/* Body */}
      <main className="flex-grow flex flex-col md:flex-row container mx-auto my-8 w-full">
        <div className="flex flex-col items-start max-w-3xl w-full">
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

export default Layout2;