import { React, useState, useEffect } from "react";
import ProblemCard from "./ProblemCard"; // Make sure to create and import ProblemCard component
import "./Problems.css";

const Problems = () => {
  const [array, setArray] = useState([]);

  fetch('http://127.0.0.1:8000/api/users')
  .then(response => {
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return response.json(); // Parse the response as JSON
  })
  .then(data => {
    setArray(data.users); // Set the array state with the fetched data
  })
  .catch(error => {
    console.error('Error fetching data:', error);
  });

  const problemSets = [
    {
      id: 1,
      category: "Leadership",
      description: "Description for problem set 1",
    },
    {
      id: 2,
      category: "Problem Solving",
      description: "Description for problem set 2",
    },
    {
      id: 3,
      category: "Adaptability",
      description: "Description for problem set 3",
    },
  ];

  return (
    <div className="problems-container">
      <h1>Master Your Interview Skills</h1>
      <p>
        Practice behavioral interview questions and get instant feedback to
        improve your responses.{" "}
      </p>

      <div>
        {array.map((item, index) => (
          <p key={index}>{item}</p>
        ))}
      </div>

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
