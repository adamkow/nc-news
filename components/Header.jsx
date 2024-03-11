import React from "react";
import "./Header.css";

export default function Header() {
  return (
    <div className="header">
      <h1></h1>
      <button className="news-button">NC News</button>
      <button className="image-button">
        <img src="path/to/your/image.png" alt="Icon" />
      </button>
    </div>
  );
}
