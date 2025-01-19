import "./App.css";
import CamPage from "./CamPage/CamPage";
import { Routes, Route } from "react-router-dom";
import Layout from "./Layout";
import Profile from "./Profile/Profile";
import Problems from "./Problems/Problems";
import ProblemList from "./ProblemList/ProblemList";
import FeedbackPage from "./Feedback/Feedback";
import { useState } from "react";
import { QuestionProvider } from "./CamPage/QuestionProvider";

function App() {
  return (
    <QuestionProvider>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<CamPage />} />
          <Route path="/problems/" element={<Problems />} />
          <Route path="/problem-list/" element={<ProblemList />} />
          <Route path="/feedback/" element={<FeedbackPage />} />
          <Route path="/profile/" element={<Profile />} />
        </Route>
      </Routes>
    </QuestionProvider>
  );
}

export default App;
