import React, { useState } from "react";
import axios from "axios";
import LoginForm from "./LoginForm";
import { useAuth } from "../AuthContext";
import { useNavigate } from 'react-router-dom';

const LoginHandling = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const { isLoggedIn, userObject ,setLoggedInUser} = useAuth();
  const navigate = useNavigate();


  //TODO SET USER ON CONTEXT


  const handleLogin = async (e, formData) => {
    e.preventDefault();

    const { email, password } = formData;
    const headers = {
      "Content-Type": "application/json",
    };

    try {
      setLoading(true);
      setError(null);

      // Perform the login request
      const response = await axios.post(
        "/api/users/login",
        {
          email,
          password,
        },
        headers
      );
      //TODO ANALOGOS TO RESPONSE FTIAKSE ANALOGO INITIAL STATE


      console.log(response.data)

      // Login success
      setSuccessMessage(response.data.message);
      setLoggedInUser(response.data.user.name, response.data.user.surname);
      
      if (setSuccessMessage) {
        // Navigate to the main page or any other page after successful login
        navigate("/");
      }


    } catch (error) {
      console.log(error);
      // Handle specific HTTP status codes
      if (error.response) {
        const statusCode = error.response.status;
        console.log("HTTP status code:", statusCode);

        switch (statusCode) {
          case 401:
            setError(
              "Invalid credentials. Please check your email and password."
            );
            break;
          case 404:
            setError("User not found. Please check your email.");
            break;
          case 422:
            setError("Password length must be at least 8 characters long");
            break;
          default:
            // For other errors, use a generic messa
            setError(error.response.data.message || "An error occurred");
        }
        
      } else {
        // Handle non-response errors
        setError("An error occurred");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <LoginForm
      onSubmit={handleLogin}
      loading={loading}
      error={error}
      successMessage={successMessage}
    />
  );
};

export default LoginHandling;
