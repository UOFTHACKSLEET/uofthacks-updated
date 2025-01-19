import React from "react";
import "./Feedback.css";

const FeedbackPage = () => {
  const feedbackBox = [
    {
      id: 1,
      category: "Overall Score",
      description: "Description for problem set 1",
    },
    {
      id: 2,
      category: "Feedback/Tips",
      description: "Description for problem set 2",
    },
    {
      id: 3,
      category: "Sound",
      description: "Description for problem set 3",
    },
    {
      id: 4,
      category: "Transcript",
      description: "Description for problem set 3",
    },
    {
      id: 5,
      category: "AI Enhanced Transcript",
      description: "Description for problem set 3",
    },
  ];
  return (
    <div>
      <div className="title">
        <h1>Feedback</h1>
      </div>
      <div className="grid-container">
        {feedbackBox.map((feedback) => (
          <div className="feedback-card card" key={feedback.id}>
            <h2 className="card-title">{feedback.category}</h2>
            <p>{feedback.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeedbackPage;
