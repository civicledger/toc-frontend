import BaseService from './BaseService';

export default class OutcomeService extends BaseService {
  entity = 'outcomes';
}

export const outcomeService = new OutcomeService();
