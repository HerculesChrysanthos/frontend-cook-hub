import React, { useState } from 'react';
import axios from 'axios';
import RegisterForm from './RegisterForm';

const Register_handling = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  // Define email and password state variables
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      setError(null);

      // Perform the registration request
      const response = await axios.post('http://localhost:8080/api/users/register', {
        email,
        password,
      });

      // Registration success
      setSuccessMessage(response.data.message);
    } catch (error) {
      // Registration error
      setError(error.response ? error.response.data.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <RegisterForm
      onSubmit={handleRegister}
      loading={loading}
      error={error}
      successMessage={successMessage}
    />
  );
};

export default Register_handling;
