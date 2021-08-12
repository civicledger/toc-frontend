import BaseService from './BaseService';

export default class PlaceService extends BaseService {
  entity = 'places';
}

export const placeService = new PlaceService();
