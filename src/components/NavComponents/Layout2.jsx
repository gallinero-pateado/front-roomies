import React, { useContext,useState, useEffect } from 'react';
import { Outlet, useLocation, NavLink, Link } from 'react-router-dom';
import { ThemeContext } from '../../context/ThemeContext';
import Notification from '../NotificationComponents/Notifications';
import DarkModeToggle from '../DarkModeToggle';
import themeStyles from "../Const/themes";
import { Menu, X, ChevronRight } from 'lucide-react';
import Cookies from 'js-cookie';

const Layout2 = ({children}) => {
  const { theme } = useContext(ThemeContext);
  const styles = themeStyles[theme]; // Obtener estilos según el tema

  const location = useLocation(); // Para conocer la ruta actual

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSubMenuOpen, setIsSubMenuOpen] = useState(false);

  
  
  useEffect(() => {
    const timer = setTimeout(() => {
        setIsMenuOpen(false);
    }, 150);

    return () => clearTimeout(timer);
}, [location.pathname]);

/*useEffect(() => {
  const token = Cookies.get("authToken") || undefined;

  if (!token) {
    // Redirigir si el token no existe
    window.location.href = "https://ulink.tssw.info";
  }
}, []);*/

const toggleMenu = () => {
  setIsMenuOpen(!isMenuOpen);
};

const toggleSubMenu = () => {
  setIsSubMenuOpen(!isSubMenuOpen); // Alternar la visibilidad del submenú
};

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
    <div className={`flex flex-col min-h-screen font-ubuntu  ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-[#DAEDF2] text-black'} transition-colors duration-300`}>
      {/* Header */}
      <header className="bg-[#0092BC] text-white p-6 relative z-20">
        <div className="flex justify-between items-center mx-auto">
          <Link to="/main" className="text-5xl font-bold italic">ULINK</Link>
          
          <div className='flex '>
            <div><DarkModeToggle  /></div>

            <button
                            onClick={toggleMenu}
                            className={`p-2 ${styles.menuButton} rounded-full`}
                        >
                            {isMenuOpen ?
                                <X color={styles.menuButtonIcon} size={32} /> :
                                <Menu color={styles.menuButtonIcon} size={32} />
                            }
            </button>

            {/* Sidebar Menu */}
            {isMenuOpen && (
                <div className="fixed top-0 right-0 h-full w-64 bg-[#0092BC] text-white shadow-lg z-30 flex flex-col p-6 transition-transform duration-300">
                    {/* Perfil con Submenú */}
                <div>
                  <p
                    onClick={toggleSubMenu}
                    className=" cursor-pointer block py-4 px-2 rounded-md transition-colors duration-200 hover:bg-[#DAEDF2] hover:text-[#0092BC] active:bg-[#DAEDF2] active:text-[#0092BC]"
                  >
                    Perfil
                  </p>
                  {isSubMenuOpen && (
                    <div className="pl-4">
                      <Link
                        to="/profile"
                        className="block py-2 px-2 rounded-md transition-colors duration-200 hover:bg-[#DAEDF2] hover:text-[#0092BC] active:bg-[#DAEDF2] active:text-[#0092BC]"
                      >
                        - Mi Perfil
                      </Link>
                      <Link
                        to="/fav"
                        className="block py-2 px-2 rounded-md transition-colors duration-200 hover:bg-[#DAEDF2] hover:text-[#0092BC] active:bg-[#DAEDF2] active:text-[#0092BC]"
                      >
                         - Favoritos
                      </Link>
                      <Link
                        to="/my-messages"
                        className="block py-2 px-2 rounded-md transition-colors duration-200 hover:bg-[#DAEDF2] hover:text-[#0092BC] active:bg-[#DAEDF2] active:text-[#0092BC]"
                      >
                        - Mensajes
                      </Link>
                    </div>
                  )}
                </div>
                    <Link
                        to="/roomies"
                        className="block py-4 px-2 rounded-md transition-colors duration-200 hover:bg-[#DAEDF2] hover:text-[#0092BC] active:bg-[#DAEDF2] active:text-[#0092BC]"
                    >
                        Roomies
                    </Link>
                    <a
                        href="https://ulink.tssw.info/unificacion"
                        className="block py-4 px-2 rounded-md transition-colors duration-200 hover:bg-[#DAEDF2] hover:text-[#0092BC] active:bg-[#DAEDF2] active:text-[#0092BC]"
                    >
                        Volver Atras
                    </a>
                    <Link
                        to="https://ulink.tssw.info"
                        className="block py-4 px-2 rounded-md transition-colors duration-200 hover:bg-[#DAEDF2] hover:text-[#0092BC] active:bg-[#DAEDF2] active:text-[#0092BC]"
                        onClick={Logout}
                    >
                        Salir
                    </Link>

                    <ChevronRight
                        onClick={toggleMenu}
                        className="mt-auto self-end cursor-pointer hover:text-[#DAEDF2] transition duration-300"
                        size={24}
                        color="white"
                    />
                </div>
            )}
          </div>
        </div>
      </header>

      {/* Body */}
      <main className="flex-grow">
                {children}
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