import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Articles from "./components/Articles";
import SingleArticle from "./components/SingleArticle";
import "./App.css";

function App() {
  return (
    <div>
      <Header />
      <Routes>
        <Route path="/" element={<Articles />} />
        <Route path="/topics/:topicSlug" element={<Articles />} />
        <Route path="/articles/:articleId" element={<SingleArticle />} />{" "}
      </Routes>
    </div>
  );
}

export default App;
