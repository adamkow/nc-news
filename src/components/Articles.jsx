import React, { useState, useEffect } from "react";
import { fetchAllArticles, fetchArticlesByTopic } from "../api";
import "./Articles.css";
import { Link, useNavigate, useParams } from "react-router-dom";
import FormatTime from "../util/FormatTime";
import Topics from "./Topics";

export default function Articles() {
  const [articles, setArticles] = useState([]);
  const navigate = useNavigate();
  const { topicSlug } = useParams();

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        let articlesData;
        if (topicSlug) {
          articlesData = await fetchArticlesByTopic(topicSlug);
        } else {
          articlesData = await fetchAllArticles();
        }
        if (articlesData && articlesData.article) {
          setArticles(articlesData.article);
          console.log(articlesData.article);
        } else {
          setArticles([]);
        }
      } catch (error) {
        console.error(error);
        setArticles([]);
      }
    };

    fetchArticles();
  }, [topicSlug]);

  const onSelectTopic = (topicSlug) => {
    if (topicSlug === null) {
      navigate(`/`);
    } else {
      navigate(`/topics/${topicSlug}`);
    }
  };

  return (
    <div className="articles-list">
      <div className="row">
        <Topics onSelectTopic={onSelectTopic} />
      </div>
      {articles.length > 0 ? (
        articles.map((article) => (
          <div key={article.article_id} className="single-article">
            <h1>{article.title}</h1>
            <Link to={`/articles/${article.article_id}`}>
              <img src={article.article_img_url} alt={article.title} />
            </Link>
            <p>{article.content}</p>
            <FormatTime dateString={article.created_at} />
            <p>Votes: {article.votes}</p>
            <p>Comments: {article.comment_count}</p>
          </div>
        ))
      ) : (
        <div>No articles found.</div>
      )}
    </div>
  );
}
