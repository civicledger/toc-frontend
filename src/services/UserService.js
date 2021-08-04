import BaseService from './BaseService';

export default class UserService extends BaseService {
  entity = 'users';
}

export const userService = new UserService();
