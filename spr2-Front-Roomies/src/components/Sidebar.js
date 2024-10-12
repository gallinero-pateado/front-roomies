import React from 'react';
import { Link } from 'react-router-dom'; // Usamos Link para navegar

const Sidebar = () =>{

        

    return(

        <aside className="sidebar">
        <h1>Perfil Roomie</h1>
        <div className="miperfil-sidebar">
            <img src="src\img-prueba.jpeg" alt="Foto de perfil" />{/*hacer lo mismo que con el nombre*/ }
            
        </div>
        <section className="opciones">
            <ul >
                <li>
                    <Link to="/profile">Perfil</Link>
                </li>
                <li>
                    <Link to="/roomielist">Favoritos</Link>
                </li>
            </ul>
    </section>
    </aside>
    )

}

export default Sidebar;