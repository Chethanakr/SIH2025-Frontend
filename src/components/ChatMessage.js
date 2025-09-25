import React from "react";

export default function ChatMessage({ role, text }) {
  return (
    <div className={`chat-bubble ${role}`}>
      {text}
    </div>
  );
}
