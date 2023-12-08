import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';

const LoginForm =  ({ onSubmit, loading, error, successMessage }) => {
  const [email, setEmail] = useState("");
  const [password, setPass] = useState("");
  const navigate = useNavigate();

  const handleRegisterClick = () => {
    // navigation to Register page if no account created
    navigate("/Register");
  };

  const handleEmailChange = () => {
    // navigation to Forgot your password page
    navigate("/forgot-password");
  };

  return (
    <div className="login-form-container">
      <h2>Σύνδεση Χρήστη</h2>
      {error && <div className="error">{error}</div>}
      {successMessage && <div className="success">{successMessage}</div>}
      <form className="login-form" onSubmit={(e) => onSubmit(e, { email, password, })}>
        <label htmlFor="email">email</label>
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          placeholder="youremail@gmail.com"
          id="email"
          name="email"
        />
        <label htmlFor="password">Κωδικός</label>
        <input
          value={password}
          onChange={(e) => setPass(e.target.value)}
          type="password"
          placeholder="********"
          id="password"
          name="password"
        />
        {/* <button type="submit">Log In</button> */}
        <button type="submit" disabled={loading}>
          {loading ? 'Logging in...' : 'Σύνδεση'}
        </button>
      </form>
      <button className="link-btn" onClick={handleRegisterClick}>
        Δεν έχεις λογαριασμό; Συνδέσου εδώ.
      </button>
      <button className="link-btn" onClick={handleEmailChange}>
        Ξέχασες τον κωδικό σου;
      </button>
    </div>
  );
};

export default LoginForm;