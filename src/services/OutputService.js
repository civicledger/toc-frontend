import BaseService from './BaseService';

export default class OutputService extends BaseService {
  entity = 'outputs';
}

export const outputService = new OutputService();
