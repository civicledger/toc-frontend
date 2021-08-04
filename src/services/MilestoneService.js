import BaseService from './BaseService';

export default class MilestoneService extends BaseService {
  entity = 'milestones';
}

export const milestoneService = new MilestoneService();
