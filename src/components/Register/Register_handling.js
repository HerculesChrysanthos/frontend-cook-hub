import React, { useState } from 'react';
import axios from 'axios';
import RegisterForm from './RegisterForm';

const Register_handling = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  const handleRegister = async (e, formData) => {
    e.preventDefault();

    setSuccessMessage(null);
    
    const { name, surname, email, password, passwordConfirmation } = formData;

    // Define headers
    const headers = {
      'Content-Type': 'application/json',
      'Accept': '*/*',
      'Cache-Control': 'no-cache'
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
        { headers }
      );

      console.log(response);

      // Registration success
      setSuccessMessage('Registration successful!');

    } catch (error) {
      // Registration error
      console.error('Registration error:', error);

      if (error.response) {
        const statusCode = error.response.status;
        console.log('HTTP status code:', statusCode);

        if (statusCode === 409) {
          setError("Email already exists");
        } else if (statusCode === 422) {
          // Handle validation errors
          const responseText = error.response.data; // Use 'data' instead of 'responseText'

          console.log('Response Text:', responseText);

          try {
            const responseJson = responseText;
            const validationErrors = responseJson.errors;

            console.log('Validation Errors:', validationErrors);
            console.log('here', validationErrors);

            if (validationErrors && Array.isArray(validationErrors)) {
              const errorMessages = validationErrors.map(error => {
                if (error.path === 'body.passwordConfirmation' && error.message === 'does not match') {
                  return 'Password confirmation does not match';
                }
                return `${error.message}`;
              });

              console.log('Formatted Error Messages:', errorMessages);

              setError(errorMessages.join(', '));
            } else {
              setError('Validation error format is unexpected');
            }
          } catch (jsonError) {
            console.error('Error parsing JSON from responseText:', jsonError);
            setError('An error occurred while parsing the server response');
          }
        } else {
          // For other errors, use a generic message
          setError(error.response.data.message || 'An error occurred');
        }
      } else {
        // Handle non-response errors
        setError('An error occurred');
      }
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
