import BaseService from './BaseService';

export default class MembershipService extends BaseService {
  entity = 'memberships';
}

export const membershipService = new MembershipService();
