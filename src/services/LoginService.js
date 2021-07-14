import axios from "axios";
import BaseService from "./BaseService";

axios.defaults.baseURL = process.env.REACT_APP_API_HOST;

export default class LoginService extends BaseService {
  entity = "users";
  logIn(email, password) {
    return axios.post("login", { email, password });
  }

  saveUser({ user, token }) {
    localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem("token", token);
  }
}
