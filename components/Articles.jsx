import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Articles.css";
export default function Articles() {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    console.log("Fetching articles...");
    axios
      .get("https://news-945o.onrender.com/api/articles")
      .then((res) => {
        setArticles(res.data.article);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  console.log("Articles:", articles[0]);
  return (
    <div className="articles-container">
      <h2>Articles</h2>
      {articles.map((article) => (
        <div key={article.article_id}>
          <h3>{article.title}</h3>
          <button>
            <img src={article.article_img_url} alt={article.title} />
          </button>
        </div>
      ))}
    </div>
  );
}
