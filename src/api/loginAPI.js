import axios from "axios";

const auth = axios.create({
  baseURL: process.env.REACT_APP_BASEURL + "/auth",
  withCredentials: true,
  headers: {
    "Content-type": "application/json",
  },
});

export const register = ({ name, username, password }) =>
  auth.post(
    `/register`,
    { name, username, password },
    { withCredentials: true }
  );

export const login = ({ username, password }) =>
  auth.post(`/login`, { username, password });

export const check = () => auth.get(`/check`);

export const logout = () => auth.get(`/logout`);
