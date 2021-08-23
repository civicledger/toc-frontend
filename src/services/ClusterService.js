import BaseService from './BaseService';

export default class ClusterService extends BaseService {
  entity = 'clusters';
}

export const clusterService = new ClusterService();
