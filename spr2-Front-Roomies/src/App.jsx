import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css'
import {Sidebar} from './components/Sidebar'
import {Profile} from './components/Profile'
import { RoomiesList } from './components/RoomieFavList';

export function App(){

    const id_roomie = localStorage.getItem('id_roomie'); // Recuperar el ID del usuario almacenado, suponiendo que esta en localStorage

    

    return (
        <React.Fragment>
            
            <Router>
                <div>
                <div >
                {/* Sidebar siempre visible */}
                <Sidebar />
                
                {/* Contenido dinámico cambia según la ruta */}
                <div >
                <Routes>
                    <Route path="/profile" element={<Profile />} />
                    <Route path="/roomielist" element={<RoomiesList />} />
                    {/* Puedes agregar más rutas aquí */}
                </Routes>
                </div>
            </div>
                </div>
            
            </Router>
        </React.Fragment>
    )
}

