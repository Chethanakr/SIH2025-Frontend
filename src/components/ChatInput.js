import React from "react";

export default function ChatInput({ userInput, setUserInput, handleSubmit, isLoading }) {
  return (
    <form onSubmit={handleSubmit} className="chat-input-container">
      <input
        type="text"
        value={userInput}
        onChange={(e) => setUserInput(e.target.value)}
        className="chat-input"
        placeholder="Tell me about your major,CGPA, etc."
        disabled={isLoading}
      />
      <button type="submit" className="chat-button" disabled={isLoading}>
        {isLoading ? <div className="loader"></div> : "Send"}
      </button>
    </form>
  );
}



