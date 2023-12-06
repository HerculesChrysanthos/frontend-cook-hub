import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const initialUserState = {name:'', surname:''};

  const [isLoggedIn, setLoggedIn] = useState(true);
  const [userObject, setUserObject] = useState(initialUserState);

  const setLoggedInUser = (user) => {
    setLoggedIn(true);
    setUserObject(user);
  };

  const logout = () => {
    setLoggedIn(false);
    setUserObject(initialUserState);
    localStorage.clear()
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, userObject, setLoggedInUser, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);