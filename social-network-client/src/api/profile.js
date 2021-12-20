import axios from "axios";
import { config } from "../config";

export const fetchProfile = async () => {
  let token = localStorage.getItem("token")
    ? localStorage.getItem("token")
    : {};
  return await axios.get(`${config.api_host}/api/profile`, {
    headers: {
      authorization: `Bearer ${token}`,
    },
  });
};

export const editProfile = async (data) => {
  let token = localStorage.getItem("token")
    ? localStorage.getItem("token")
    : {};
  return await axios.put(`${config.api_host}/api/profile/edit`, data, {
    headers: {
      authorization: `Bearer ${token}`,
    },
  });
};

export const editProfilePict = async (data) => {
  let token = localStorage.getItem("token")
    ? localStorage.getItem("token")
    : {};
  return await axios.put(`${config.api_host}/api/profile-picture/edit`, data, {
    headers: {
      authorization: `Bearer ${token}`,
    },
  });
};

export const deleteProfilePict = async () => {
  let token = localStorage.getItem("token")
    ? localStorage.getItem("token")
    : {};
  return await axios.delete(`${config.api_host}/api/profile-picture/delete`, {
    headers: {
      authorization: `Bearer ${token}`,
    },
  });
};

export const fetchFollowers = async (id) => {
  let token = localStorage.getItem("token")
    ? localStorage.getItem("token")
    : {};
  return await axios.get(`${config.api_host}/api/followers/${id}`, {
    headers: {
      authorization: `Bearer ${token}`,
    },
  });
};

export const fetchFollowing = async (id) => {
  let token = localStorage.getItem("token")
    ? localStorage.getItem("token")
    : {};
  return await axios.get(`${config.api_host}/api/following/${id}`, {
    headers: {
      authorization: `Bearer ${token}`,
    },
  });
};

export const fetchFriendProfile = async (id) => {
  let token = localStorage.getItem("token")
    ? localStorage.getItem("token")
    : {};
  return await axios.get(`${config.api_host}/api/profile/${id}`, {
    headers: {
      authorization: `Bearer ${token}`,
    },
  });
};

export const follow = async (id) => {
  let token = localStorage.getItem("token")
    ? localStorage.getItem("token")
    : {};
  return await axios.post(`${config.api_host}/api/follows/${id}`, null, {
    headers: {
      authorization: `Bearer ${token}`,
    },
  });
};
