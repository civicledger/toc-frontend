import axios from "axios";

axios.defaults.baseURL = process.env.REACT_APP_API_HOST;

export default class BaseService {
  create(data) {
    const headers = this.getHeaders();
    return axios.post(this.entity, data, { headers });
  }

  update(id, data) {
    const headers = this.getHeaders();
    return axios.put(`${this.entity}/${id}`, data, { headers });
  }

  delete(id) {
    const headers = this.getHeaders();
    return axios.delete(`${this.entity}/${id}`, { headers });
  }

  async getAll(params = {}) {
    const headers = this.getHeaders();
    return await axios.get(this.entity, { headers, params });
  }

  async getOne(id) {
    const headers = this.getHeaders();
    const item = await axios.get(`${this.entity}/${id}`, { headers });
    return item;
  }

  getHeaders() {
    const token = localStorage.getItem("token");

    if (!token) return {};

    return { Authorization: `Bearer ${token}` };
  }
}
