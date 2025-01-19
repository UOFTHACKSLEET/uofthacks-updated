import React from "react";
import ProblemCard from "./ProblemCard";
import "./Problems.css";

const Problems = () => {
  const problemSets = [
    {
      id: 1,
      category: "Leadership",
      description: "Lead and inspire a team towards common goals.",
      color: "#3FE8B0",
      defaultQuestion:
        "Tell me about a situation where you delegated tasks effectively.",
    },
    {
      id: 2,
      category: "Problem Solving",
      description: "Show your analytical skills in solving complex problems.",
      color: "#FFDD99",
      defaultQuestion:
        "Describe a time when you faced an unexpected obstacle on a project. How did you resolve it?",
    },
    {
      id: 3,
      category: "Adaptability",
      description: "Highlight your flexibility in changing environments.",
      color: "#FF99CC",
      defaultQuestion:
        "Describe a time when you had to quickly learn a new skill or adjust to a significant change?",
    },
    {
      id: 4,
      category: "Time Management",
      description: "Illustrate your efficiency in managing time and tasks.",
      color: "#99B3FF",
      defaultQuestion:
        "Tell me of a time when you were managing multiple deadlines. How did you prioritize your tasks?",
    },
    {
      id: 5,
      category: "Conflict Resolution",
      description: "Describe your strategies for resolving conflicts in teams.",
      color: "#FFCCB3",
      defaultQuestion:
        "Describe a situation where you had a disagreement with a colleague. How did you handle it?",
    },
    {
      id: 6,
      category: "Technical",
      description: "Show your technical expertise in relevant tools.",
      color: "#FFD699",
      defaultQuestion:
        "Walk me through your approach to reversing a linked list.",
    },
  ];

  return (
    <div className="problems-container">
      <h1 style={{ fontSize: "3.2em", marginBottom: "15px" }}>
      <span style={{ color: "#17C3B2" }}>Refyne</span> Your Interview Skills
      </h1>
      <p style={{ fontSize: "1.2em" }}>
        Practice behavioral interview questions and get instant feedback to
        improve your responses.
      </p>

      <div className="cards-container">
        {problemSets.map((problem) => (
          <ProblemCard
            key={problem.id}
            category={problem.category}
            description={problem.description}
            color={problem.color}
            defaultQuestion={problem.defaultQuestion}
            link="/"
          />
        ))}
      </div>
    </div>
  );
};

export default Problems;
