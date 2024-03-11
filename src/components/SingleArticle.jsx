import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./SingleArticle.css";

const instance = axios.create({
  baseURL: "https://news-945o.onrender.com/api/",
});

export default function SingleArticle() {
  const [article, setArticle] = useState(null);
  const { articleId } = useParams();

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const response = await instance.get(`articles/${articleId}`);
        setArticle(response.data.article);
      } catch (error) {
        console.log(error);
      }
    };

    fetchArticle();
  }, [articleId]);

  return (
    <div className="single-article">
      {article ? (
        <>
          <h1>{article.title}</h1>
          <img src={article.article_img_url} alt={article.title} />
          <p>{article.content}</p>
          <p>Published on: {article.created_at}</p>
          <p>Votes: {article.votes}</p>
        </>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
}
