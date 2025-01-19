import "./App.css";
import CamPage from "./CamPage/CamPage";
import { Routes, Route } from "react-router-dom";
import Layout from "./Layout";
import Profile from "./Profile/Profile";
import Problems from "./Problems/Problems";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route
          index
          element={<CamPage question="tell us about a time you skibidied" />}
        />
        <Route path="/problems/" element={<Problems />} />
        <Route path="/profile/" element={<Profile />} />
      </Route>
    </Routes>
  );
}

export default App;
