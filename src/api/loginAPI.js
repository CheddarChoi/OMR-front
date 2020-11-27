import axios from "axios";

const auth = axios.create({
  baseURL: "http://localhost:8081/auth",
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

export const check = (options) => auth.get(`/check`, options);

export const logout = () => auth.get(`/logout`);
