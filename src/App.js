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

  // Welcome message after login
  useEffect(() => {
    if (user) {
      const welcomeMessage = `👋 Hello ${user.name || user.email}! I'm your AI internship assistant. Tell me about your skills and interests.`;
      setConversation([{ role: "bot", text: welcomeMessage }]);
    }
  }, [user]);

  // Auto scroll to bottom
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [conversation]);

  // Mock internships fetch
  const fetchInternships = async () => {
    setIsLoading(true);
    setConversation((prev) => [...prev, { role: "bot", text: "🔎 Finding internships for you..." }]);

    setTimeout(() => {
      const mockData = [
        {
          title: "AI Research Intern",
          company: "Tech Innovations",
          stipend: "$800/month",
          deadline: "Nov 15, 2025",
          description: "Work on AI projects with guidance from senior researchers.",
        },
        {
          title: "Frontend Developer Intern",
          company: "Startup Hub",
          stipend: "$600/month",
          deadline: "Dec 10, 2025",
          description: "Build React-based applications and contribute to UI/UX design.",
        },
        {
          title: "Data Science Intern",
          company: "Global Analytics",
          stipend: "$750/month",
          deadline: "Jan 5, 2026",
          description: "Assist in analyzing datasets and building ML models.",
        },
      ];
      setInternships(mockData);
      setConversation((prev) => [
        ...prev,
        { role: "bot", text: `✅ I found ${mockData.length} internships that may suit you!` },
      ]);
      setIsLoading(false);
    }, 1500);
  };

  // Handle chat input submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!userInput.trim() || isLoading) return;
    const newUserMessage = { role: "user", text: userInput };
    setConversation((prev) => [...prev, newUserMessage]);
    setUserInput("");
    await fetchInternships();
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
