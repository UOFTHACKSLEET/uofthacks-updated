import "./App.css";
import CamPage from "./CamPage/CamPage";
import { Routes, Route } from "react-router-dom";
import Layout from "./Layout";
import Profile from "./Profile/Profile";
import Problems from "./Problems/Problems";
import ProblemList from "./ProblemList/ProblemList";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route
          index
          element={
            <CamPage question="Tell us about a time you resolved a group conflict" />
          }
        />
        <Route path="/problems/" element={<Problems />} />
        <Route path="/problem-list/" element={<ProblemList />} />
        <Route path="/profile/" element={<Profile />} />
      </Route>
    </Routes>
  );
}

export default App;
