import BaseService from './BaseService';

export default class IssueService extends BaseService {
  entity = 'issues';
}

export const issueService = new IssueService();
