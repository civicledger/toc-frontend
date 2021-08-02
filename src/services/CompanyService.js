import BaseService from './BaseService';

export default class CompanyService extends BaseService {
  entity = 'companies';
}

export const companyService = new CompanyService();
