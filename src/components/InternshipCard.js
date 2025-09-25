import React from "react";

export default function InternshipCard({ internship }) {
  return (
    <div className="internship-card">
      <h2>{internship.title}</h2>
      <p><strong>Company:</strong> {internship.company}</p>
      <p><strong>Stipend:</strong> {internship.stipend}</p>
      <p><strong>Deadline:</strong> {internship.deadline}</p>
      <p>{internship.description}</p>
    </div>
  );
}
