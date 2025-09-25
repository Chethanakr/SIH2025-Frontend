import React from "react";
import { Link } from "react-router-dom";

export default function Navbar({ user, onLogout }) {
  return (
    <nav className="navbar">
      <div className="navbar-left">
        <h2>Internship Assistant 🤖</h2>
      </div>
      <div className="navbar-right">
        <span className="navbar-user">Welcome, {user?.name || "Guest"}</span>
        <button className="logout-btn" onClick={onLogout}>Logout</button>
      </div>
    </nav>
  );
}
