import React, { useState, useEffect } from "react";
import { fetchTopics } from "../api";
import "./Topics.css";
const Topics = ({ onSelectTopic }) => {
  const [topics, setTopics] = useState([]);

  useEffect(() => {
    const fetchTopicsData = async () => {
      try {
        const topicsData = await fetchTopics();
        if (topicsData) {
          setTopics(topicsData.topics);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchTopicsData();
  }, []);

  return (
    <div className="topics-buttons">
      <button onClick={() => onSelectTopic(null)}>ALL</button>
      {topics.map((topic) => (
        <button key={topic.slug} onClick={() => onSelectTopic(topic.slug)}>
          {topic.slug.toUpperCase()}
        </button>
      ))}
    </div>
  );
};

export default Topics;
