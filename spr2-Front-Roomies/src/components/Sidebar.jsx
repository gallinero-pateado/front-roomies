import React from 'react';
import { Link } from 'react-router-dom'; // Usamos Link para navegar

const Sidebar = () =>{

        

    return(

        <aside className="bg-[#0092BC] rounded-lg p-5 h-[450px] w-[250px] text-center float-left">
        <div className="miperfil-sidebar">
            <img src="src\img-prueba.jpeg" alt="Foto de perfil" className="rounded-full max-w-[40%] h-auto"/>{/*hacer lo mismo que con el nombre*/ }
            
        </div>
        <section className="pt-7 text-xl">
            <ul className='list-none'>
                <li className='pb-4 font-bold text-left'>
                    <Link to="/profile" className="text-black hover:text-white">Perfil</Link>
                </li>
                <li className='pb-4 font-bold text-left'>
                    <Link to="/fav" className="text-black hover:text-white">Favoritos</Link>
                </li>
            </ul>
    </section>
    </aside>
    )

}

export default Sidebar;