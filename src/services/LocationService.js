import BaseService from './BaseService';

export default class LocationService extends BaseService {
  entity = 'locations';
}

export const locationService = new LocationService();
