import http from "../http-common";

class SchdeuleAPI {
  getAll() {
    return http.get("/schedule");
  }

  get(id) {
    return http.get(`/schedule/${id}`);
  }

  create(data) {
    return http.post("/schedule", data);
  }

  update(id, data) {
    return http.put(`/schedule/${id}`, data);
  }

  delete(id) {
    return http.delete(`/schedule/${id}`);
  }

  deleteAll() {
    return http.delete(`/schedule`);
  }

  findByName(name) {
    return http.get(`/schedule?name=${name}`);
  }
}

export default new SchdeuleAPI();
