import axios from "axios";

const auth = axios.create({
  baseURL: "http://localhost:8081/api/users",
  withCredentials: true,
  headers: {
    "Content-type": "application/json",
  },
});

export const register = ({ name, email, password }) =>
  auth.post(`/register`, { name, email, password }, { withCredentials: true });

export const login = ({ email, password }) =>
  auth.post(`/login`, { email, password });

export const check = (options) => auth.get(`/check`, options);

export const logout = () => auth.get(`/logout`);
