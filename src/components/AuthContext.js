import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const initialUserState = {id:'', name:'', surname:''};

  const [isLoggedIn, setLoggedIn] = useState(false);
  const [userObject, setUserObject] = useState(initialUserState);

  const setLoggedInUser = (user) => {
    setLoggedIn(true);
    setUserObject(user);
    console.log("userObject:", userObject)
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