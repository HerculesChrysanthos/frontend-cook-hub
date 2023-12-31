import React, { useState } from 'react';
import axios from 'axios';
import RegisterForm from './RegisterForm';
import { useAuth } from '../AuthContext';
import { useNavigate } from 'react-router-dom';

const Register_handling = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const { setLoggedInUser } = useAuth();
  const navigate = useNavigate();

  const handleRegister = async (e, formData) => {
    e.preventDefault();

    setSuccessMessage(null);

    const { name, surname, email, password, passwordConfirmation } = formData;

    // Define headers
    const headers = {
      'Content-Type': 'application/json',
      Accept: '*/*',
      'Cache-Control': 'no-cache',
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
          passwordConfirmation,
        },
        { headers }
      );

      console.log(response);

      // Registration success
      setSuccessMessage('Επιτυχημένη Εγγραφή!');

      if (setSuccessMessage) {
        // Store the token in localstorage
        window.localStorage.setItem('token', response.data.token);

        // Set the user in the authentication context
        setLoggedInUser({
          id: response.data.user._id,
          name: response.data.user.name,
          surname: response.data.user.surname,
        });

        setTimeout(() => {
          // Navigate to the main page or any other page after successful registration
          navigate('/');
        }, 3000); // 3000 milliseconds (adjust as needed)
      }
      // // Log local storage
      // const localStorageKeys = Object.keys(localStorage);
      // localStorageKeys.forEach((key) => {
      //   const value = localStorage.getItem(key);
      //   console.log(`${key}: ${value}`);
      // });

      const greekTranslations = {
        'length must be at least 8 characters long':
          'το μήκος πρέπει να είναι τουλάχιστον 8 χαρακτήρες',
        // Add more translations as needed
      };

      const translateError = (englishError) => {
        return greekTranslations[englishError] || englishError;
      };
    } catch (error) {
      // Registration error
      console.error('Registration error:', error);

      if (error.response) {
        const statusCode = error.response.status;
        console.log('HTTP status code:', statusCode);

        if (statusCode === 409) {
          setError('Yπάρχει ήδη χρήστης με αυτό το email');
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
              const errorMessages = validationErrors.map((error) => {
                if (
                  error.path === 'body.passwordConfirmation' &&
                  error.message === 'does not match'
                ) {
                  return 'Οι κωδικοί δεν ταιριάζουν';
                }
                return `${error.message}`;
              });

              console.log('Formatted Error Messages:', errorMessages);

              setError(errorMessages.join(', '));
              const errorMessageval = errorMessages.join(', ');
              if (
                errorMessageval === 'length must be at least 8 characters long'
              ) {
                setError('Το μήκος του κωδικού πρέπει να είναι 8 χαρακτήρες');
              }
            } else {
              setError(
                'Ωχ κάτι πήγε στραβά ανανεώστε την σελίδα σας και προσπαθήστε ξανά'
              );
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
        setError(
          'Ωχ κάτι πήγε στραβά ανανεώστε την σελίδα σας και προσπαθήστε ξανά'
        );
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <RegisterForm
        onSubmit={handleRegister}
        loading={loading}
        error={error}
        successMessage={successMessage}
      />
    </div>
  );
};

export default Register_handling;
