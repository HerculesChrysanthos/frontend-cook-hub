import React, { useState } from 'react';
import axios from 'axios';
import RegisterForm from './RegisterForm';

const Register_handling = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  const handleRegister = async (e, formData) => {
    e.preventDefault();
  
    const { name, surname, email, password, passwordConfirmation } = formData;

        // Define headers
        const headers = {
          'Content-Type': 'application/json',
          'Accept': '*/*',
         'Cache-Control': 'no-cache',      
         'Accept-Encoding': 'gzip, deflate, br',
         'Connection': 'keep-alive'
        };
    
    try {
      setLoading(true);
      setError(null);
  
      console.log('Sending request with data:', formData);
  
      // Perform the registration request
      const response = await axios.post(
        '/api/users/register',
        {
          name,
          surname,
          email,
          password,
          passwordConfirmation
        },
        headers
      );

      console.log(response);
  
      // Registration success
      setSuccessMessage(response.data.message);
    } catch (error) {
      // Registration error
      console.error('Registration error:', error);
  
      if (error.response) {
        const statusCode = error.response.status;
        console.log('HTTP status code:', statusCode);
    
        if (statusCode === 409) {
          setError("Email already exists");
        } else if (statusCode === 422) {
          setError("Password does not match");
        } else {
          // For other errors, use a generic message
          setError(error.response.data.message || 'An error occurred');
        }
      } else {
        // Handle non-response errors
        setError('An error occurred');
      }
    
      // Rethrow the error to handle it at the calling site
    //  throw error;
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
