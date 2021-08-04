import BaseService from './BaseService';

export default class SubscriptionService extends BaseService {
  entity = 'subscriptions';
}

export const subscriptionService = new SubscriptionService();
