import React, { useState, useEffect } from "react";
import { fetchAllArticles, fetchArticlesByTopic } from "../api";
import "./Articles.css";
import { Link, useNavigate, useParams } from "react-router-dom";
import FormatTime from "../util/FormatTime";
import Topics from "./Topics";
import Sort from "./Sort";
import NotFound from "./NotFound";

export default function Articles() {
  const [articles, setArticles] = useState([]);
  const [sorting, setSorting] = useState({ field: "date", order: "desc" }); // Default sorting order set to "desc"
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

  if (articles.length === 0) {
    return (
      <NotFound
        type="Topic"
        message="No articles found for this topic or the topic does not exist."
      />
    );
  }

  const handleSortChange = (field) => {
    setSorting({ ...sorting, field });
  };

  const toggleSortOrder = () => {
    setSorting({
      ...sorting,
      order: sorting.order === "asc" ? "desc" : "asc",
    });
  };

  const sortedArticles = articles.slice().sort((a, b) => {
    if (sorting.field === "date") {
      return sorting.order === "asc"
        ? new Date(a.created_at) - new Date(b.created_at)
        : new Date(b.created_at) - new Date(a.created_at);
    } else if (sorting.field === "votes") {
      return sorting.order === "asc" ? a.votes - b.votes : b.votes - a.votes;
    } else if (sorting.field === "comment_count") {
      return sorting.order === "asc"
        ? a.comment_count - b.comment_count
        : b.comment_count - a.comment_count;
    }
    return 0;
  });

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
        <Sort
          onSortChange={handleSortChange}
          toggleSortOrder={toggleSortOrder}
        />
      </div>
      {sortedArticles.length > 0 ? (
        sortedArticles.map((article) => (
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
