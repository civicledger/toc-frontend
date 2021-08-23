import BaseService from './BaseService';

export default class ActivityService extends BaseService {
  entity = 'activities';
}

export const activityService = new ActivityService();
