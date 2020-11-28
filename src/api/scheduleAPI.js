import axios from "axios";

const schedule = axios.create({
  baseURL: "http://localhost:8081/schedule",
  withCredentials: true,
  headers: {
    "Content-type": "application/json",
  },
});

export const getAll = () => schedule.get("");

export const get = (id) => schedule.get(`/${id}`);

export const create = (data) => schedule.post("", data);

export const update = (id, data) => schedule.put(`/${id}`, data);

export const deleteOne = (id) => schedule.delete(`/${id}`);

export const deleteAll = () => schedule.delete(``);

export const findByName = (name) => schedule.get(`?name=${name}`);
