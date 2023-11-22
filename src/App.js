import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header/Header';
import './App.css';
import Mainpage from './pages/Mainpage';
import Register_handling from './components/Register/Register_handling';

function App() {
  return (
    <Router>
      <div>
        <Mainpage />
        <Routes>
          <Route path="/Register" element={<Register_handling />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
