import BaseService from './BaseService';

export default class InitiativeService extends BaseService {
  entity = 'initiatives';
}

export const initiativeService = new InitiativeService();
