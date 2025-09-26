import React from "react";
import { Link } from "react-router-dom";

export default function Navbar({ user, onLogout }) {
  return (
    <nav className="navbar">
      {/* Left side - App Title */}
      <div className="navbar-left">
        <h2>
          <Link to="/app" className="navbar-title">
            Internship Assistant
          </Link>
        </h2>
      </div>

      {/* Right side - Navigation + User info */}
      <div className="navbar-right">
        <Link to="/app" className="nav-link">Home</Link>
        <Link to="/profile" className="nav-link">Profile</Link>
        <Link to="/dashboard" className="nav-link">Dashboard</Link>

        <span className="navbar-user">Welcome, {user?.name || "Guest"}</span>
        <button className="logout-btn" onClick={onLogout}>Logout</button>
      </div>
    </nav>
  );
}
