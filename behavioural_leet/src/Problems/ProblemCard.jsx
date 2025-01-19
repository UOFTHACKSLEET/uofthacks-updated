import React from "react";
import { useNavigate } from "react-router-dom";
import { useQuestion } from "../CamPage/QuestionProvider";
import "./ProblemCard.css";

const ProblemCard = ({
  category,
  description,
  color,
  defaultQuestion,
  link,
}) => {
  const navigate = useNavigate();
  const { question, setQuestion } = useQuestion();

  const handleNavigation = () => {
    setQuestion(defaultQuestion);
    navigate(link); // Navigate to the link provided
  };

  return (
    <div className="problem-card">
      <div className="problem-circle" style={{ backgroundColor: color }} />
      <div className="problem-content">
        <div className="problem-header">
          <h2>{category}</h2>
          <button className="problems-button">Problems</button>
        </div>
        <p className="problem-description">{description}</p>
        <button
          className="start-interview-button"
          onClick={handleNavigation} // Navigate to camera page
        >
          Start interview
        </button>
      </div>
    </div>
  );
};

export default ProblemCard;
