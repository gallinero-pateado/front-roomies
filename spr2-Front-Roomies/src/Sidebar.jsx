
export function Sidebar(){

        

    return(

        <aside className="sidebar">
            <h1>Perfil Roomie</h1>
            <div className="miperfil-sidebar">
                <img src="src\img-prueba.jpeg" alt="Foto de perfil" />{/*hacer lo mismo que con el nombre*/ }
                
            </div>
            <section className="opciones">
                <ul >
                    <li><a href="">Perfil</a></li>
                    <li><a href="">Favoritos</a></li>
                    <li><a href="">Mensajes</a></li>
                </ul>
        </section>
        </aside>
    )

}

