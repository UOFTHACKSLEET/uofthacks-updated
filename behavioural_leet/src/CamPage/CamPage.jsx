import React from "react";
import CameraFeed from "./CameraFeed";
import { useState, useEffect } from "react";

const CamPage = ({ question }) => {
  const [timeLeft, setTimeLeft] = useState(30);

  useEffect(() => {
    if (timeLeft === 0) return;
    const timerId = setInterval(() => {
      setTimeLeft(timeLeft - 1);
    }, 1000);

    return () => clearInterval(timerId);
  }, [timeLeft]);

  return (
    <div className="interview-container">
      <h1>Question: {question}</h1>
      <CameraFeed />
      <h2>Time left: {timeLeft} seconds</h2>
    </div>
  );
};

export default CamPage;
