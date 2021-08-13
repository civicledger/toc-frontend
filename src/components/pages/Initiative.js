import { Link, useRouteMatch } from 'react-router-dom';
import { useQuery } from 'react-query';
import { ChevronRightIcon } from '@heroicons/react/solid';

import PageHeader from '../layout/PageHeader';

import { intiativeQuery } from '../../utilities/queries';

const Initiative = () => {
  const { params } = useRouteMatch();
  const { data: initiative } = useQuery(['initiatives', params.id], () => intiativeQuery(params.id), { keepPreviousData: true });
  const outcome = initiative.outcomes[0];
  const strategy = outcome.strategy;

  return (
    <div className="p-10">
      <PageHeader title={initiative.name}>
        <li>
          <div>
            <Link to={`/strategies/${strategy.id}`} className="text-sm font-medium text-gray-500 hover:text-gray-700">
              Strategy: {strategy.name}
            </Link>
          </div>
        </li>
        <li>
          <div className="flex items-center">
            <ChevronRightIcon className="flex-shrink-0 h-5 w-5 text-gray-400" />
            <Link to={`/outcomes/${outcome.id}`} className="text-sm font-medium text-gray-500 hover:text-gray-700">
              Outcome: {outcome.name}
            </Link>
          </div>
        </li>
        <li>
          <div className="flex items-center">
            <ChevronRightIcon className="flex-shrink-0 h-5 w-5 text-gray-400" />
            <span className="ml-4 text-sm font-medium text-gray-500">{initiative.name}</span>
          </div>
        </li>
      </PageHeader>
    </div>
  );
};

export default Initiative;
