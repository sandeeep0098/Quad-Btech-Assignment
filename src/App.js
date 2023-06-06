import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomeScreen from "./components/HomeScreen/HomeScreen";
import ShowDetailsScreen from "./components/ShowDetails/ShowDetailScreen";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomeScreen />} />
        <Route path="/show/:id" element={<ShowDetailsScreen />} />
      </Routes>
    </Router>
  );
}

export default App;
