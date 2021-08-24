import BaseService from './BaseService';

export default class BenchmarkService extends BaseService {
  entity = 'benchmarks';
}

export const benchmarkService = new BenchmarkService();
