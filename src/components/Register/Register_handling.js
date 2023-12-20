import React, { useState } from "react";
import axios from "axios";
import RegisterForm from "./RegisterForm";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";

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
      "Content-Type": "application/json",
      Accept: "*/*",
      "Cache-Control": "no-cache",
    };

    try {
      setLoading(true);
      setError(null);

      console.log("Sending request with data:", formData);

      // Perform the registration request
      const response = await axios.post(
        "/api/users/register",
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
      setSuccessMessage("Επιτυχημένη Εγγραφή!");

      const greekTranslations = {
        "length must be at least 8 characters long":
          "το μήκος πρέπει να είναι τουλάχιστον 8 χαρακτήρες",
        // Add more translations as needed
      };

      const translateError = (englishError) => {
        return greekTranslations[englishError] || englishError;
      };
    } catch (error) {
      // Registration error
      console.error("Registration error:", error);

      if (error.response) {
        const statusCode = error.response.status;
        console.log("HTTP status code:", statusCode);

        if (statusCode === 409) {
          setError("Yπάρχει ήδη χρήστης με αυτό το email");
        } else if (statusCode === 422) {
          // Handle validation errors
          const responseText = error.response.data; // Use 'data' instead of 'responseText'

          console.log("Response Text:", responseText);

          try {
            const responseJson = responseText;
            const validationErrors = responseJson.errors;

            console.log("Validation Errors:", validationErrors);
            console.log("here", validationErrors);

            if (validationErrors && Array.isArray(validationErrors)) {
              const errorMessages = validationErrors.map((error) => {
                if (
                  error.path === "body.passwordConfirmation" &&
                  error.message === "does not match"
                ) {
                  return "Οί κωδικοί δεν ταιριάζουν";
                }
                return `${error.message}`;
              });

              console.log("Formatted Error Messages:", errorMessages);

              setError(errorMessages.join(", "));
              const errorMessageval = errorMessages.join(", ");
              if (
                errorMessageval === "length must be at least 8 characters long"
              ) {
                setError("το μηκος του κωδικου πρεπει να ειναι 8 χαρακτήρες");
              }
            } else {
              setError(
                "Ωχ κάτι πήγε στραβά ανανεώστε την σελίδα σας και προσπαθήστε ξανά"
              );
            }
          } catch (jsonError) {
            console.error("Error parsing JSON from responseText:", jsonError);
            setError("An error occurred while parsing the server response");
          }
        } else {
          // For other errors, use a generic message
          setError(error.response.data.message || "An error occurred");
        }
      } else {
        // Handle non-response errors
        setError(
          "Ωχ κάτι πήγε στραβά ανανεώστε την σελίδα σας και προσπαθήστε ξανά"
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
