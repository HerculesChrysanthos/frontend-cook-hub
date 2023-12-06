import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const initialUserState = {name:'', lastname:''};

  const [isLoggedIn, setLoggedIn] = useState(true);
  const [userObject, setUserObject] = useState(initialUserState);

  const login = (user) => {
    setLoggedIn(true);
    setUserObject(user);
  };

  const logout = () => {
    setLoggedIn(false);
    setUserObject(null);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, userObject, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);