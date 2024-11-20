import React from 'react';
import { NavLink } from 'react-router-dom'; // Usamos NavLink para estilos dinámicos

const Sidebar = () => {
  return (
    <aside className="bg-[#0092BC] rounded-lg p-5 h-[450px] w-[250px] text-center float-left">
      <section className="pt-7 text-xl">
        <ul className="list-none">
          <li className="pb-4 font-bold text-left">
            <NavLink
              to="/profile"
              className={({ isActive }) =>
                isActive
                  ? 'text-white border-l-4 border-white pl-2'
                  : 'text-[#1D4157] hover:text-white'
              }
            >
              Perfil
            </NavLink>
          </li>
          <li className="pb-4 font-bold text-left">
            <NavLink
              to="/fav"
              className={({ isActive }) =>
                isActive
                  ? 'text-white border-l-4 border-white pl-2'
                  : 'text-[#1D4157] hover:text-white'
              }
            >
              Favoritos
            </NavLink>
          </li>
          <li className="pb-4 font-bold text-left">
            <NavLink
              to="/my-messages"
              className={({ isActive }) =>
                isActive
                  ? 'text-white border-l-4 border-white pl-2'
                  : 'text-[#1D4157] hover:text-white'
              }
            >
              Mensajes
            </NavLink>
          </li>
        </ul>
      </section>
    </aside>
  );
};

export default Sidebar;
