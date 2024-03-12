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
    return response.data.article;
  } catch (error) {
    console.log(error);
  }
};
