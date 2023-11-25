import React, { useState } from 'react';
import axios from 'axios';
import LoginForm from './LoginForm';

const LoginHandling = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  // Define email and password state variables
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      setError(null);

      const headers = {
        'Content-Type': 'application/json',
      };
      // Perform the login request
      const response = await axios.post(
        '/api/users/login',
        {
          email,
          password,
        },
        headers
      );

      console.log(response);

      // Login success
      setSuccessMessage(response.data.message);
    } catch (error) {
      console.log(error);
      // Registration error
      setError(
        error.response ? error.response.data.message : 'An error occurred'
      );
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
