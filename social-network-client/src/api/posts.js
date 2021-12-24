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
