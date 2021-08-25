import BaseService from './BaseService';

export default class DefinitionService extends BaseService {
  entity = 'definitions';
}

export const definitionService = new DefinitionService();
