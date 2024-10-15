import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import RegisterRoomie from './components/RegisterRoomie';
import PageProfile from './components/ProfilePage';
import FavPage from './components/FavPage'
import MainPage from './mainpage'; // Importa el componente principal con opciones
import {RoomiesList} from './components/Roomies'



function App() {
  return (
    <Router>
      <Routes>
      <Route path='/main'  index element={<MainPage />} />
      <Route path="/" element={<Layout />}>
          {/* Mostrar RegisterRoomie como la página principal */}
          {/*Al unificar con practicas y descuentos, index element = {<RegisterRoomie />}, el de abajo se boora, igual que el index de arriba,
          en el front de practicas esta para redirigir a cada celula*/}
          <Route path="/registRoomie" element={<RegisterRoomie />} />
          <Route path = "/profile" element={<PageProfile />} />
          <Route path = '/fav' element={< FavPage/>} />
          <Route path = '/roomies' element={< RoomiesList/>} />

          
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
