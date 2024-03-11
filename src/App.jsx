import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Header from "../components/Header";
import Articles from "../components/Articles";
import "./App.css";

function App() {
  return (
    <div>
      <Header />
      <Routes>
        <Route path="/" element={<Articles />} />
      </Routes>
    </div>
  );
}

export default App;
