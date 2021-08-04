import { companyService } from '../services/CompanyService';
import { userService } from '../services/UserService';
import { locationService } from '../services/LocationService';
import { strategyService } from '../services/StrategyService';
import { goalService } from '../services/GoalService';

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

export const strategiesQuery = async companyId => {
  const { data } = await strategyService.getAll({ companyId });
  return data;
};

export const strategyQuery = async id => {
  const { data } = await strategyService.getOne(id);
  return data;
};

export const goalsQuery = async id => {
  const { data } = await goalService.getAll();
  return data;
};
