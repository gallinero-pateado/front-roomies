import React from 'react';
import './App.css'
import {Sidebar} from './Sidebar'
import {Profile} from './Profile'

export function App(){

    const id_roomie = localStorage.getItem('id_roomie'); // Recuperar el ID del usuario almacenado, suponiendo que esta en localStorage


    return (
        <React.Fragment>
            
            <section className='App'>
                <Sidebar/>
                <Profile id={id_roomie}/> 
            </section>
        </React.Fragment>
    )
}

