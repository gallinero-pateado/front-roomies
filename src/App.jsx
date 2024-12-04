import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Navigate } from 'react-router-dom';
import Layout from './components/NavComponents/Layout';
import Layout2 from './components/NavComponents/Layout2';
import RegisterRoomie from './components/RegisterComponents/RegisterRoomie';
import PageProfile from './components/ProfileComponents/ProfilePage';
import FavPage from './components/FavComponents/FavPage'
import Messpage from './components/MessageComponents/MessPage'
import MainPage from './mainpage'; // Importa el componente principal con opciones
import RoomiesList from './components/RoomieComponents/Roomies'
import './App.css'




function App() {
  return (
    <Router>
    <Routes>
      {/*Rutas para el primer Layout*/}
    <Route path="/" element={<Layout />}>
        <Route path="/" element={<Navigate to="/main" replace />} />
        <Route path="/register" element={<RegisterRoomie />} />
        <Route  index element={<RegisterRoomie/>} />
    </Route>

  
      <Route path="/profile" element={<Layout2><PageProfile /></Layout2> } /> 
      <Route path="fav" element={<Layout2><FavPage /></Layout2>} />
      <Route path="roomies" element={<Layout2><RoomiesList /></Layout2>} />
      <Route path="my-messages" element={<Layout2><Messpage /></Layout2>} />
  </Routes>
  </Router>
  );
}

export default App;
