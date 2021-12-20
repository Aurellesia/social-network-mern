import axios from "axios";
import { config } from "../config";

export const userRegister = async (data) => {
  return await axios.post(`${config.api_host}/auth/register`, data);
};

export const userLogin = async (data) => {
  return await axios.post(`${config.api_host}/auth/login`, data);
};

export const userLogout = async () => {
  let token = localStorage.getItem("token")
    ? localStorage.getItem("token")
    : {};
  return await axios
    .post(`${config.api_host}/auth/logout`, null, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    })
    .then((res) => {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      localStorage.removeItem("user_id");
      return res;
    });
};
