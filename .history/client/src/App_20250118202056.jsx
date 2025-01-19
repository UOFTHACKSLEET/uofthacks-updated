import "./App.css";
import CamPage from "./CamPage/CamPage";
import { Routes, Route } from "react-router-dom";
import Layout from "./Layout";
import Profile from "./Profile/Profile";
import { useState, useEffect } from 'react'; 

function App() {

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



  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route
          index
          element={<CamPage question="tell us about a time you skibidied" />}
        />
        <Route path="/profile" element={<Profile />} />
      </Route>
    </Routes>
  );
}

export default App;
