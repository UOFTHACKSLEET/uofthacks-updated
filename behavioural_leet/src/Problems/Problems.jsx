import React from "react";
import ProblemCard from "./ProblemCard"; // Make sure to create and import ProblemCard component
import "./Problems.css";

const Problems = () => {
  const problemSets = [
    {
      id: 1,
      category: "Leadership",
      description: "Speak confidently about experiences",
    },
    {
      id: 2,
      category: "Problem Solving",
      description: "Communicate critical thinking abilities",
    },
    {
      id: 3,
      category: "Teamwork",
      description: "Interpersonal and collaboration skills",
    },
  ];

  return (
    <div className="problems-container">
      <h1>Master Your Interview Skills</h1>
      <p>
        Practice behavioral interview questions and get instant feedback to
        improve your responses.{" "}
      </p>
      <div className="cards-container">
        {problemSets.map((problem) => (
          <ProblemCard
            key={problem.id}
            category={problem.category}
            description={problem.description}
          />
        ))}
      </div>
    </div>
  );
};

export default Problems;
