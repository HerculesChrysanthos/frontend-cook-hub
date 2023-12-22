import React, { useState } from 'react';
import axios from 'axios';
import LoginForm from './LoginForm';
import { useAuth } from '../AuthContext';
import { useNavigate } from 'react-router-dom';

const LoginHandling = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const { setLoggedInUser } = useAuth();
  const navigate = useNavigate();

  //TODO SET USER ON CONTEXT

  const handleLogin = async (e, formData) => {
    e.preventDefault();

    const { email, password } = formData;
    const headers = {
      'Content-Type': 'application/json',
    };

    try {
      setLoading(true);
      setError(null);

      // Perform the login request
      const response = await axios.post(
        '/api/users/login',
        {
          email,
          password,
        },
        headers
      );
      //TODO ANALOGOS TO RESPONSE FTIAKSE ANALOGO INITIAL STATE

      console.log(response.data);

      // Login success
      setSuccessMessage(response.data.message);

      if (setSuccessMessage) {
        // Store the token in cookies / localstorage
        window.localStorage.setItem('token', response.data.token);

        // Set the user in the authentication context
        setLoggedInUser({
          id: response.data.user._id,
          name: response.data.user.name,
          surname: response.data.user.surname,
        });
        // Navigate to the main page or any other page after successful login
        navigate('/');
      }

      // Log local storage
      const localStorageKeys = Object.keys(localStorage);
      localStorageKeys.forEach((key) => {
        const value = localStorage.getItem(key);
        console.log(`${key}: ${value}`);
      });
    } catch (error) {
      console.log(error);
      // Handle specific HTTP status codes
      if (error.response) {
        const statusCode = error.response.status;
        console.log('HTTP status code:', statusCode);

        switch (statusCode) {
          case 401:
            setError(
              'Mη έγκυρα διαπιστευτήρια. Ελέγξτε το email και τον κωδικό πρόσβασής σας.'
            );
            break;
          case 404:
            setError('Ο χρήστης δεν βρέθηκε. Παρακαλώ ελέγξτε το email σας.');
            break;
          case 422:
            setError('Το μήκος του κωδικού πρέπει να είναι 8 χαρακτήρες');
            break;
          default:
            // For other errors, use a generic messa
            setError(error.response.data.message || 'An error occurred');
        }
      } else {
        // Handle non-response errors
        setError(
          'Ωχ κάτι πήγε στραβά ανανεώστε την σελίδα σας και προσπαθήστε ξανά'
        );
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
