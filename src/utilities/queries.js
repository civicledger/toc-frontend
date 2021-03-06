import {
  companyService,
  userService,
  placeService,
  goalService,
  strategyService,
  outcomeService,
  initiativeService,
  clusterService,
  definitionService,
  activityService,
} from '../services';

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

export const placesQuery = async () => {
  const { data } = await placeService.getAll();
  return data;
};

export const placeQuery = async placeId => {
  const { data } = await placeService.getOne(placeId);
  return data;
};

export const strategiesQuery = async (companyId, placeId) => {
  const { data } = await strategyService.getAll({ companyId, placeId });
  return data;
};

export const strategyQuery = async id => {
  const { data } = await strategyService.getOne(id);
  return data;
};

export const goalsQuery = async () => {
  const { data } = await goalService.getAll();
  return data;
};

export const outcomeQuery = async id => {
  const { data } = await outcomeService.getOne(id);
  return data;
};

export const intiativeQuery = async id => {
  const { data } = await initiativeService.getOne(id);
  return data;
};

export const clusterQuery = async id => {
  const { data } = await clusterService.getOne(id);
  return data;
};

export const definitionsQuery = async outcomeId => {
  const { data } = await definitionService.getAll({ outcomeId });
  return data;
};

export const definitionQuery = async id => {
  const { data } = await definitionService.getOne(id);
  return data;
};

export const activitiesQuery = async () => {
  const { data } = await activityService.getAll();
  return data;
};
