import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/Auth.css";

const SignIn = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = { username, password };

    try {
      const response = await fetch("http://localhost:8085/auth/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });

      if (response.ok) {
        // If the response is the token, treat it as text
        const token = await response.text();
        if (token) {
          localStorage.setItem("authToken", token);
          console.log("Token received and saved:", token); // Debug log for token

          // Navigate to the home page
          navigate("/Home");
        } else {
          setErrorMessage("Failed to receive a valid token");
        }
      } else {
        const errorText = await response.text();
        setErrorMessage(errorText || "Invalid credentials");
      }
    } catch (error) {
      console.error("Error signing in:", error);
      setErrorMessage("Error occurred during sign-in");
    }
  };

  return (
    <div>
      <h2>Sign In</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Sign In</button>

        <div className="signup-link">
          <p>
            Don't have an account? <Link to="/signup">Sign Up</Link>
          </p>
        </div>

        {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
      </form>
    </div>
  );
};

export default SignIn;
