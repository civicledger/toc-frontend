import CompanyService from "../services/CompanyService";
import UserService from "../services/UserService";
import LocationService from "../services/LocationService";

const companyService = new CompanyService();
const userService = new UserService();
const locationService = new LocationService();

export const companiesQuery = async (id) => {
  const { data } = await companyService.getAll();
  return data;
};

export const companyQuery = async (id) => {
  const { data } = await companyService.getOne(id);
  return data;
};

export const userQuery = async (id) => {
  const { data } = await userService.getOne(id);
  return data;
};

export const locationsQuery = async (id) => {
  const { data } = await locationService.getAll();
  return data;
};
