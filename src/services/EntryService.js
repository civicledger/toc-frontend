import BaseService from './BaseService';

export default class EntryService extends BaseService {
  entity = 'entries';
}

export const entryService = new EntryService();
