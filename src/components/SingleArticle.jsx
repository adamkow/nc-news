import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./SingleArticle.css";
import { fetchArticleById, fetchCommentsByArticleId } from "../api";
import FormatTime from "../util/FormatTime";

export default function SingleArticle() {
  const [article, setArticle] = useState(null);
  const [comments, setComments] = useState(null);
  const { articleId } = useParams();

  useEffect(() => {
    const fetchArticleAndComments = async () => {
      try {
        const articleData = await fetchArticleById(articleId);
        setArticle(articleData);
      } catch (error) {
        console.log(error);
      }

      try {
        const commentsData = await fetchCommentsByArticleId(articleId);
        setComments(commentsData);
      } catch (error) {
        console.log(error);
      }
    };

    fetchArticleAndComments();
  }, [articleId]);

  return (
    <div className="single-article">
      {article ? (
        <>
          <h1>{article.title}</h1>
          <img src={article.article_img_url} alt={article.title} />
          <p>{article.content}</p>
          <FormatTime dateString={article.created_at} />{" "}
          <p>Votes: {article.votes}</p>
          <div className="comments-section">
            <h2>Comments</h2>
            {comments && comments.length > 0 ? (
              comments.map((comment) => (
                <div key={comment.comment_id} className="comment">
                  <h3>{comment.author}</h3>
                  <p>{comment.body}</p>
                </div>
              ))
            ) : (
              <p>No comments to display.</p>
            )}
          </div>
        </>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
}
