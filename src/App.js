import React, { useState, useEffect, useRef } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import "./index.css";

export default function App() {
  const [user, setUser] = useState(null);
  const [conversation, setConversation] = useState([]);
  const [internships, setInternships] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [userInput, setUserInput] = useState("");
  const chatEndRef = useRef(null);

  // Welcome message after login (bold)
  useEffect(() => {
    if (user) {
      const welcomeMessage = (
        <strong>
          👋 Hello {user.name || user.email}! I'm your AI internship assistant. 
          Tell me about your skills and interests.
        </strong>
      );
      setConversation([{ role: "bot", text: welcomeMessage }]);
    }
  }, [user]);

  // Auto scroll to bottom
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [conversation]);

  // Fetch internships from backend
  const fetchInternships = async (query) => {
    setIsLoading(true);
    setConversation((prev) => [
      ...prev,
      { role: "bot", text: "🔎 Finding internships for you..." },
    ]);

    try {
      // Example API call — replace URL with your backend endpoint
      const response = await fetch("http://localhost:5000/api/internships", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query }), // send user input to backend
      });

      const data = await response.json();

      // Update state with backend data
      setInternships(data.internships || []);
      setConversation((prev) => [
        ...prev,
        {
          role: "bot",
          text: (
            <strong>
              ✅ I found {data.internships?.length || 0} internships that may suit you!
            </strong>
          ),
        },
      ]);
    } catch (error) {
      console.error("Error fetching internships:", error);
      setConversation((prev) => [
        ...prev,
        { role: "bot", text: "❌ Sorry, something went wrong while fetching internships." },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle chat input submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!userInput.trim() || isLoading) return;

    const newUserMessage = { role: "user", text: userInput };
    setConversation((prev) => [...prev, newUserMessage]);

    const query = userInput; // store input for API call
    setUserInput("");

    await fetchInternships(query);
  };

  // Logout handler
  const handleLogout = () => {
    setUser(null);
    setConversation([]);
    setInternships([]);
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login setUser={setUser} />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/app"
          element={
            user ? (
              <Home
                user={user}
                conversation={conversation}
                internships={internships}
                isLoading={isLoading}
                userInput={userInput}
                setUserInput={setUserInput}
                handleSubmit={handleSubmit}
                chatEndRef={chatEndRef}
                onLogout={handleLogout}
              />
            ) : (
              <Navigate to="/" />
            )
          }
        />
      </Routes>
    </Router>
  );
}
