import React from "react";
import { Link } from "react-router-dom";
import "./NotFound.css";

const NotFound = ({ type, message }) => {
  return (
    <div className="not-found">
      <h1>{type ? `404 - ${type} Not Found` : `404 - Page Not Found`}</h1>

      <p>{message || "The page you are looking for does not exist."}</p>
      <button>
        <Link to="/" className="go-home-link">
          Go Home
        </Link>
      </button>
    </div>
  );
};

export default NotFound;
