import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();

    if (!name || !email || !password) {
      setError("All fields are required.");
      return;
    }

    // ✅ Check if user already exists in localStorage
    const users = JSON.parse(localStorage.getItem("users")) || [];
    if (users.find((u) => u.email === email)) {
      setError("User already exists. Please login.");
      return;
    }

    // ✅ Save user in localStorage
    users.push({ name, email, password });
    localStorage.setItem("users", JSON.stringify(users));

    alert("🎉 Registration successful! Please login.");
    navigate("/"); // redirect to login
  };

  return (
    <div className="login-page">
      <div className="login-box">
        <h1>Register</h1>
        <p className="login-subtitle">Create an account to find scholarships</p>

        <form onSubmit={handleRegister} className="login-form">
          <label>Name</label>
          <input
            type="text"
            placeholder="Your full name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <label>Email</label>
          <input
            type="email"
            placeholder="student@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <label>Password</label>
          <input
            type="password"
            placeholder="Choose a password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {error && <p className="error-msg">{error}</p>}

          <button type="submit" className="login-btn">Register</button>
        </form>

        <p className="form-switch">
          Already have an account? <Link to="/">Login</Link>
        </p>
      </div>
    </div>
  );
}
