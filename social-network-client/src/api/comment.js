import axios from "axios";
import { config } from "../config";

export const createComment = async (data, id) => {
  let token = localStorage.getItem("token")
    ? localStorage.getItem("token")
    : {};
  return await axios.post(`${config.api_host}/api/comments/${id}`, data, {
    headers: {
      "content-type": "application/x-www-form-urlencoded",
      authorization: `Bearer ${token}`,
    },
  });
};

export const readComment = async (id) => {
  let token = localStorage.getItem("token")
    ? localStorage.getItem("token")
    : {};
  return await axios.get(`${config.api_host}/api/comments/${id}`, {
    headers: {
      authorization: `Bearer ${token}`,
    },
  });
};

export const viewComment = async (id) => {
  let token = localStorage.getItem("token")
    ? localStorage.getItem("token")
    : {};
  return await axios.get(`${config.api_host}/api/comments/view/${id}`, {
    headers: {
      authorization: `Bearer ${token}`,
    },
  });
};

export const deleteComment = async (id) => {
  let token = localStorage.getItem("token")
    ? localStorage.getItem("token")
    : {};
  return await axios.delete(`${config.api_host}/api/comments/${id}`, {
    headers: {
      authorization: `Bearer ${token}`,
    },
  });
};

export const likeComment = async (id) => {
  let token = localStorage.getItem("token")
    ? localStorage.getItem("token")
    : {};
  return await axios.post(`${config.api_host}/api/comments/likes/${id}`, null, {
    headers: {
      authorization: `Bearer ${token}`,
    },
  });
};
