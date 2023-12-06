import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Mainpage from './pages/Mainpage';
import Register_handling from './components/Register/Register_handling';
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
          <Route path="/recipe:id" element={< Reci/>} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
