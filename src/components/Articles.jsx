import React, { useState, useEffect } from "react";
import { fetchAllArticles } from "../api";
import "./Articles.css";
import { Link } from "react-router-dom";
import FormatTime from "../util/FormatTime";

export default function Articles() {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const articlesData = await fetchAllArticles();
        if (articlesData) {
          setArticles(articlesData.article);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchArticles();
  }, []);

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

  return (
    <div className="articles-list">
      {articles.length > 0 ? (
        articles.map((article) => (
          <div key={article.article_id} className="single-article">
            <h1>{article.title}</h1>
            <Link to={`/articles/${article.article_id}`}>
              <img src={article.article_img_url} alt={article.title} />
            </Link>
            <p>{article.content}</p>
            <FormatTime dateString={article.created_at} />{" "}
            <p>Votes: {article.votes}</p>
          </div>
        ))
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
}
