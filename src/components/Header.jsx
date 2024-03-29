import React from "react";
import { Link } from "react-router-dom";
import "./Header.css";

export default function Header() {
  return (
    <div className="header">
      <h1></h1>
      <Link to="/">
        <button className="news-button">NC News</button>
      </Link>
    </div>
  );
}
