// Sort.jsx
import React from "react";
import "./Sort.css";
const Sort = ({ onSortChange, toggleSortOrder }) => {
  const handleSortChange = (event) => {
    console.log("Sort field changed:", event.target.value);
    onSortChange(event.target.value);
  };

  return (
    <div>
      <label htmlFor="sort-select">Sort By:</label>
      <select id="sort-select" onChange={handleSortChange}>
        <option value="date">Date</option>
        <option value="comment_count">Comment Count</option>
        <option value="votes">Votes</option>
      </select>
      <button onClick={toggleSortOrder}>Asc/Desc</button>
    </div>
  );
};

export default Sort;
