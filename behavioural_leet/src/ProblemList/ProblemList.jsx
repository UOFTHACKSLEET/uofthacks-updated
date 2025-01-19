import React from "react";
import CamPage from "../CamPage/CamPage";
import { useState } from "react";
import { useQuestion } from "../CamPage/QuestionProvider";
import "./ProblemList.css";
import { useNavigate } from "react-router-dom";
// import { problems } from "../assets/problems.jsx";

const ProblemList = () => {
  // const [currentProblem, setCurrentProblem] = useState("");
  const [interviewOn, setInterviewOn] = useState(false);
  const navigate = useNavigate();
  const { question, setQuestion } = useQuestion();

  const problems = [
    "Tell me about a time you had a conflict with a team member.",
    "Tell me about a time you made a mistake at work.",
    "Describe an occasion when you had to manage your time to complete a task.",
    "Tell me about a time you took the initiative in your career.",
    "Share an example of a career goal you had. What steps did you take to achieve it?",
    "Give an example of a time when you had to make a difficult decision.",
    "Describe your process for solving problems. ",
    "Describe a time when you successfully led a team to achieve a challenging goal.",
    "Share an example of how you motivated others to accomplish a task or pro",
    "Discuss a time when you delegated responsibilities effectively.",
    "Share a time when you identified an inefficiency and implemented a solution.",
  ];

  const handleProblemClick = (problem) => {
    setQuestion(problem);
    // setInterviewOn(true);
    navigate("/");
  };

  return (
    <>
      {!interviewOn && (
        <div className="problem-list">
          <h1>Problem List</h1>
          <ul>
            {problems.map((problem, index) => (
              <li key={index} onClick={() => handleProblemClick(problem)}>
                {problem}
              </li>
            ))}
          </ul>
        </div>
      )}
      {interviewOn && <CamPage onBack={() => setInterviewOn(false)} />}
    </>
  );
};

export default ProblemList;
