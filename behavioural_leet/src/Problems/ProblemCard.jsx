import React from "react";
import { Link } from "react-router-dom";
import "./Problems.css";

const ProblemCard = ({ category, description }) => {
  return (
    <div className="problem-card">
      <h2>{category}</h2>
      <p>{description}</p>
      <Link to="/">Start Interview</Link>
    </div>
  );
};

export default ProblemCard;
