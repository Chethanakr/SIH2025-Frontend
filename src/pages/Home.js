import React from "react";
import InternshipCard from "../components/InternshipCard";
import InternshipPlaceholder from "../components/InternshipPlaceholder";
import Navbar from "../components/Navbar";

export default function Home({
  user,
  conversation,
  internships,
  isLoading,
  userInput,
  setUserInput,
  handleSubmit,
  chatEndRef,
  onLogout,
}) {
  return (
    <div className="home-container">
      <Navbar onLogout={onLogout} />

      <div className="app-container">
        {/* Internship panel */}
        <aside className="internship-panel">
          <header className="internship-header">
            <h1>Internship Matches</h1>
            <p>Based on your conversation</p>
          </header>
          <div className="internship-list">
            {internships.length > 0
              ? internships.map((i, idx) => <InternshipCard key={idx} internship={i} />)
              : <InternshipPlaceholder />}
          </div>
        </aside>

        {/* Chat panel */}
        <main className="chat-panel">
          <div className="chat-messages">
            {conversation.map((msg, i) => (
              <div key={i} className={`chat-message ${msg.role === "user" ? "chat-user" : "chat-bot"}`}>
                {msg.text}
              </div>
            ))}
            <div ref={chatEndRef} />
          </div>

          <form onSubmit={handleSubmit} className="chat-input-container">
            <input
              type="text"
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              className="chat-input"
              placeholder="Tell me about your skills, experience, interests..."
              disabled={isLoading}
            />
            <button type="submit" className="chat-button" disabled={isLoading}>
              {isLoading ? <div className="loader"></div> : "Send"}
            </button>
          </form>
        </main>
      </div>
    </div>
  );
}
