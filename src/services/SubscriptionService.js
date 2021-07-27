import axios from "axios";
import BaseService from "./BaseService";

axios.defaults.baseURL = process.env.REACT_APP_API_HOST;

export default class SubscriptionService extends BaseService {
  entity = "subscriptions";
}
