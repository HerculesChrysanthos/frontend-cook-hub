import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header/Header';
import './App.css';
import Mainpage from './pages/Mainpage';
import Register_handling from './components/Register/Register_handling';
import LoginHandling from './components/Login/LoginHandling';
import ForgotPassword from './components/ForgotPassword/ForgotPassword';
import LoginPage from './pages/Login'
import { AuthProvider } from './components/AuthContext';


function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/*" element={<Mainpage />} />
          <Route path="/Register" element={<Register_handling />} />
          <Route path="/Login" element={< LoginPage/>} />
          <Route path="/forgot-password" element={< ForgotPassword/>} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
