import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./SingleArticle.css";
import NotFound from "./NotFound";
import {
  fetchArticleById,
  fetchCommentsByArticleId,
  updateVotes,
  postComment,
  deleteComment,
} from "../api";
import FormatTime from "../util/FormatTime";

export default function SingleArticle() {
  const [article, setArticle] = useState(null);
  const [comments, setComments] = useState(null);
  const [commentBody, setCommentBody] = useState("");
  const [commentsLoading, setCommentsLoading] = useState(true);
  const [disabledDelete, setDisabledDelete] = useState({});
  const { articleId } = useParams();

  useEffect(() => {
    fetchArticleAndComments();
  }, [articleId]);

  const fetchArticleAndComments = async () => {
    setCommentsLoading(true);
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
    setCommentsLoading(false);
  };

  const handleVote = async (incVotes) => {
    try {
      const updatedArticleResponse = await updateVotes(articleId, incVotes);
      setArticle((prevArticle) => ({
        ...prevArticle,
        votes: updatedArticleResponse.article.votes,
      }));
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmitComment = async (e) => {
    e.preventDefault();
    try {
      await postComment(articleId, commentBody);
      setCommentBody("");
      await fetchArticleAndComments();
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteComment = async (commentId) => {
    setDisabledDelete((prev) => ({ ...prev, [commentId]: true }));

    try {
      await deleteComment(commentId);
      await fetchArticleAndComments();
    } catch (error) {
      console.error(error);
    } finally {
      setTimeout(() => {
        setDisabledDelete((prev) => ({ ...prev, [commentId]: false }));
      }, 2000);
    }
  };

  if (!article) {
    return (
      <NotFound
        type="Article"
        message="The article you are looking for does not exist."
      />
    );
  }

  return (
    <div className="single-article">
      <h1>{article.title}</h1>
      <img src={article.article_img_url} alt={article.title} />
      <p>{article.content}</p>
      <div className="description">{article.body}</div>
      <FormatTime dateString={article.created_at} />
      <p>Votes: {article.votes}</p>
      <button onClick={() => handleVote(article.votes + 1)}>Upvote</button>
      <button onClick={() => handleVote(article.votes - 1)}>Downvote</button>
      <div className="comment-form">
        <form onSubmit={handleSubmitComment}>
          <input
            type="text"
            value={commentBody}
            onChange={(e) => setCommentBody(e.target.value)}
            placeholder="Add a comment..."
            required
          />
          <button type="submit">Send</button>
        </form>
      </div>
      <div className="comments-section">
        <h2>Comments</h2>
        {commentsLoading ? (
          <p>Loading comments...</p>
        ) : comments && comments.length > 0 ? (
          comments.map((comment) => (
            <div key={comment.comment_id} className="comment">
              <h3>{comment.author}</h3>
              <p>{comment.body}</p>
              {comment.author === "cooljmessy" && (
                <button
                  onClick={() => handleDeleteComment(comment.comment_id)}
                  disabled={disabledDelete[comment.comment_id]}
                >
                  Delete
                </button>
              )}
            </div>
          ))
        ) : (
          <p>No comments to display.</p>
        )}
      </div>
    </div>
  );
}
