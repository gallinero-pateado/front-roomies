import React, { useContext } from "react";
import { Outlet,NavLink } from "react-router-dom";
import { ThemeContext } from "../../context/ThemeContext";
import DarkModeToggle from "../DarkModeToggle";
import themeStyles from "../Const/themes"
const apiurl = "https://api-roomies.tssw.info";



const Layout = () => {
  const { theme } = useContext(ThemeContext);
  const styles = themeStyles[theme]; // Obtener estilos según el tema
  return (
    <div
      className={`flex flex-col min-h-screen font-ubuntu ${styles.background} ${styles.text}`}
    >
      {/* Header */}
      <header className="bg-[#0092BC] text-white p-6">
        <div className="flex justify-between items-center mx-auto">
          <h1 className="text-5xl font-bold italic">ULINK</h1>
          <DarkModeToggle />
          <NavLink
              to="main"
              className={({ isActive }) =>
                isActive
                  ? 'border-b-4 border-[#7B4B94] text-[#1D4157] bg-[#A3D9D3] px-5 py-3 rounded  ml-5 font-bold italic text-lg'
                  : 'text-[#1D4157] px-8 py-3 rounded ml-5 font-bold italic text-lg hover:bg-[#A3D9D3] transition duration-300'
              }
            >
              Volver
            </NavLink>
        </div>
      </header>
      {/* Body */}
      <main className="flex-grow flex flex-col md:flex-row container mx-auto my-8 items-start justify-center w-full">
        <div className="flex flex-col items-start max-w-2xl w-full">
          <Outlet />{" "}
          {/* Aquí se renderizarán los componentes de las rutas internas */}
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
