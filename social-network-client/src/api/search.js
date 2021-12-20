import axios from "axios";
import { config } from "../config";

export const fetchSearch = async (params) => {
  let token = localStorage.getItem("token")
    ? localStorage.getItem("token")
    : {};
  return await axios.get(`${config.api_host}/api/search`, {
    params,
    headers: {
      authorization: `Bearer ${token}`,
    },
  });
};
