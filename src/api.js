import axios from "axios";

const instance = axios.create({
  baseURL: "https://news-945o.onrender.com/api/",
});

export const fetchAllArticles = async () => {
  try {
    const response = await instance.get("articles");

    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const fetchArticleById = async (articleId) => {
  try {
    const response = await instance.get(`articles/${articleId}`);
    return response.data.article;
  } catch (error) {
    console.log(error);
  }
};

export const fetchCommentsByArticleId = async (articleId) => {
  try {
    const response = await instance.get(`articles/${articleId}/comments`);
    return response.data.article || [];
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const updateVotes = async (articleId, incVotes) => {
  try {
    const response = await instance.patch(`articles/${articleId}`, {
      inc_votes: incVotes,
    });

    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const postComment = async (articleId, commentBody) => {
  try {
    const response = await instance.post(`articles/${articleId}/comments`, {
      username: "cooljmessy",
      body: commentBody,
    });

    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const deleteComment = async (commentId) => {
  try {
    const response = await instance.delete(`comments/${commentId}`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const fetchTopics = async () => {
  try {
    const response = await instance.get("topics");
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const fetchArticlesByTopic = async (topicSlug) => {
  try {
    const endpoint = topicSlug ? `articles?topic=${topicSlug}` : "articles";
    const response = await instance.get(endpoint);

    return response.data;
  } catch (error) {
    console.error(error);
  }
};
