import axios from "axios";
import BaseService from "./BaseService";

axios.defaults.baseURL = process.env.REACT_APP_API_HOST;

export default class AuthService extends BaseService {
  entity = "users";
  logIn(email, password) {
    return axios.post("login", { email, password });
  }

  signup(name, email, password, confirmPassword) {
    return axios.post("signup", { name, email, password, confirmPassword });
  }

  saveUser({ user, token }) {
    localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem("token", token);
  }

  logout() {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
  }

  static getLoggedInUser() {
    const userString = localStorage.getItem("user");
    const token = localStorage.getItem("token");
    if (!userString || userString === "undefined" || !token) {
      return { user: null, token: null, loggedIn: false };
    }
    const user = JSON.parse(userString);

    user.createdAt = new Date(user.createdAt);

    return { user, token, loggedIn: true };
  }
}
