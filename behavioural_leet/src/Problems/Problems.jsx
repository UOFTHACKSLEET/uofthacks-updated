import React from "react";
import ProblemCard from "./ProblemCard";
import "./Problems.css";

const Problems = () => {
  const problemSets = [
    {
      id: 1,
      category: "Leadership",
      description: "Lead and inspire a team towards common goals.",
      color: "#3FE8B0", // Even brighter color
      link: "/camera",
    },
    {
      id: 2,
      category: "Problem Solving",
      description: "Show your analytical skills in solving complex problems.",
      color: "#FFDD99", // Even brighter color
      link: "/camera",
    },
    {
      id: 3,
      category: "Adaptability",
      description: "Highlight your flexibility in changing environments.",
      color: "#FF99CC", // Even brighter color
      link: "/camera",
    },
    {
      id: 4,
      category: "Time Management",
      description: "Illustrate your efficiency in managing time and tasks.",
      color: "#99B3FF", // Even brighter color
      link: "/camera",
    },
    {
      id: 5,
      category: "Conflict Resolution",
      description: "Describe your strategies for resolving conflicts in teams.",
      color: "#FFCCB3", // Even brighter color
      link: "/camera",
    },
    {
      id: 6,
      category: "Technical",
      description: "Show your technical expertise in relevant tools.",
      color: "#FFD699", // Even brighter color
      link: "/camera",
    },
  ];

  return (
    <div className="problems-container">
      <h1 style={{ fontSize: "3.5em" }}>
        Master Your <span style={{ color: "#17C3B2" }}>Interview</span> Skills
      </h1>
      <p style={{ fontSize: "1.5em" }}>
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
            link={problem.link} // Pass the link prop to ProblemCard
          />
        ))}
      </div>
    </div>
  );
};

export default Problems;
