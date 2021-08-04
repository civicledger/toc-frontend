import BaseService from './BaseService';

export default class GoalService extends BaseService {
  entity = 'goals';
}

export const goalService = new GoalService();
