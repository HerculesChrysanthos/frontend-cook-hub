import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
//import Header from './components/Header/Header';
import './App.css';
import Mainpage from './pages/Mainpage';
import Registerhandling from './pages/Register/Registerhandling';
import LoginHandling from './components/Login/LoginHandling';

function App() {
  return (
    <Router>
      <div>
        <Mainpage />
        <Routes>
          <Route path="/Register" element={<Registerhandling />} />
          <Route path="/Login" element={< LoginHandling/>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
