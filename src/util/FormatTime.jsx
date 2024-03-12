import React from "react";

const FormatTime = ({ dateString }) => {
  const formatDate = (dateString) => {
    return new Date(dateString)
      .toLocaleString("en-US", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
      })
      .replace(",", " |");
  };

  return <p>Published on: {formatDate(dateString)}</p>;
};

export default FormatTime;
