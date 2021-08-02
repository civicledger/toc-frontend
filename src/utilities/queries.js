import CompanyService from '../services/CompanyService';
import UserService from '../services/UserService';
import LocationService from '../services/LocationService';
import StrategyService from '../services/StrategyService';

const companyService = new CompanyService();
const userService = new UserService();
const locationService = new LocationService();
const strategyService = new StrategyService();

export const companiesQuery = async () => {
  const { data } = await companyService.getAll();
  return data;
};

export const companyQuery = async id => {
  const { data } = await companyService.getOne(id);
  return data;
};

export const userQuery = async id => {
  const { data } = await userService.getOne(id);
  return data;
};

export const locationsQuery = async id => {
  const { data } = await locationService.getAll();
  return data;
};

export const strategiesQuery = async () => {
  const { data } = await strategyService.getAll();
  return data;
};

export const strategyQuery = async id => {
  const { data } = await strategyService.getOne(id);
  return data;
};
