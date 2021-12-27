import axios from "axios";
import { config } from "../config";

export const createPosts = async (data) => {
  let token = localStorage.getItem("token")
    ? localStorage.getItem("token")
    : {};
  return await axios.post(`${config.api_host}/api/posts`, data, {
    headers: {
      authorization: `Bearer ${token}`,
    },
  });
};

export const readPosts = async () => {
  let token = localStorage.getItem("token")
    ? localStorage.getItem("token")
    : {};
  return await axios.get(`${config.api_host}/api/posts`, {
    headers: {
      authorization: `Bearer ${token}`,
    },
  });
};

export const editPosts = async (data, id) => {
  let token = localStorage.getItem("token")
    ? localStorage.getItem("token")
    : {};
  return await axios.put(`${config.api_host}/api/posts/${id}`, data, {
    headers: {
      authorization: `Bearer ${token}`,
    },
  });
};

export const viewPosts = async (id) => {
  let token = localStorage.getItem("token")
    ? localStorage.getItem("token")
    : {};
  return await axios.get(`${config.api_host}/api/posts/${id}`, {
    headers: {
      authorization: `Bearer ${token}`,
    },
  });
};

export const deletePosts = async (id) => {
  let token = localStorage.getItem("token")
    ? localStorage.getItem("token")
    : {};
  return await axios.delete(`${config.api_host}/api/posts/${id}`, {
    headers: {
      authorization: `Bearer ${token}`,
    },
  });
};

export const like = async (id) => {
  let token = localStorage.getItem("token")
    ? localStorage.getItem("token")
    : {};
  return await axios.post(`${config.api_host}/api/likes/${id}`, null, {
    headers: {
      authorization: `Bearer ${token}`,
    },
  });
};

export const getLike = async (id) => {
  let token = localStorage.getItem("token")
    ? localStorage.getItem("token")
    : {};
  return await axios.get(`${config.api_host}/api/likes/${id}`, null, {
    headers: {
      authorization: `Bearer ${token}`,
    },
  });
};
