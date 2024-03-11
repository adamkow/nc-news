import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./Articles.css";

const instance = axios.create({
  baseURL: "https://news-945o.onrender.com/api/",
});

export default function Articles() {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await instance.get("/articles");
        setArticles(response.data.article);
      } catch (error) {
        console.error("Error fetching articles:", error);
      }
    };

    fetchArticles();
  }, []);

  return (
    <div className="articles-container">
      <h2>Articles</h2>
      {articles.map((article) => (
        <div key={article.article_id}>
          <h3>{article.title}</h3>
          <Link to={`/articles/${article.article_id}`}>
            <img
              src={article.article_img_url}
              alt={article.title}
              className="article-image"
              style={{ cursor: "pointer" }}
            />
          </Link>
          <h3>{article.created_at}</h3>
          <h3>{article.votes}</h3>
        </div>
      ))}
    </div>
  );
}
