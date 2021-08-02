import BaseService from './BaseService';

export default class StrategyService extends BaseService {
  entity = 'strategies';
}

export const strategyService = new StrategyService();
