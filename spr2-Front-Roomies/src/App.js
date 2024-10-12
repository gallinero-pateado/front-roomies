import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import RegisterRoomie from './components/RegisterRoomie';
import PageProfile from './components/ProfilePage';



function App() {
  return (
    <Router>
      <Routes>
      <Route path="/" element={<Layout />}>
          {/* Mostrar RegisterRoomie como la página principal */}
          <Route index element={<RegisterRoomie />} />
          <Route path = "/profile" element={<PageProfile />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
