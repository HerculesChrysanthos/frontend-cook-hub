import React, { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const initialUserState = { id: "", name: "", surname: "" };

  const [isLoggedIn, setLoggedIn] = useState(false);
  const [userObject, setUserObject] = useState(initialUserState);

  useEffect(() => {
    const storedUser = localStorage.getItem("userObject");
    if (storedUser) {
      setLoggedIn(true);
      setUserObject(JSON.parse(storedUser));
    }
  }, []);

  const setLoggedInUser = (user) => {
    setLoggedIn(true);
    setUserObject(user);
    localStorage.setItem("userObject", JSON.stringify(user));
  };

  const logout = () => {
    setLoggedIn(false);
    setUserObject(initialUserState);
    localStorage.removeItem("token");
    localStorage.removeItem("userID");
    localStorage.removeItem("userObject");
    // // Log local storage
    // const localStorageKeys = Object.keys(localStorage);
    // localStorageKeys.forEach((key) => {
    //   const value = localStorage.getItem(key);
    //   console.log(`${key}: ${value}`);
    // });
  };

  return (
    <AuthContext.Provider
      value={{ isLoggedIn, userObject, setLoggedInUser, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
