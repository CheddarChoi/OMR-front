import axios from "axios";

const schedule = axios.create({
  baseURL: process.env.REACT_APP_BASEURL + "/schedule",
  withCredentials: true,
  headers: {
    "Content-type": "application/json",
  },
});

export const getAll = () => schedule.get("");

export const get = (id) => schedule.get(`/${id}`);

export const getByUser = (userid) => schedule.get(`/getByUser/${userid}`);

export const create = (data) => {
  schedule.post("/", {
    name: data.name,
    shortName: data.shortName,
    startTime: data.startTime,
    endTime: data.endTime,
    color: data.color,
  });
};

export const update = (id, data) => schedule.put(`/${id}`, data);

export const deleteOne = (id) => schedule.delete(`/${id}`);

export const deleteAll = () => schedule.delete(``);

export const findByName = (name) => schedule.get(`?name=${name}`);
