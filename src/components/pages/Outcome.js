import { Link, useRouteMatch } from 'react-router-dom';
import { useQuery } from 'react-query';
import { ChevronRightIcon } from '@heroicons/react/solid';

import PageHeader from '../layout/PageHeader';

import { outcomeQuery } from '../../utilities/queries';

const Outcome = () => {
  const { params } = useRouteMatch();
  const { data: outcome } = useQuery(['outcomes', params.id], () => outcomeQuery(params.id), { keepPreviousData: true });

  if (!outcome) return '';

  return (
    <div className="p-10">
      <PageHeader title={outcome.name}>
        <li>
          <div>
            <Link to={`/strategies/${outcome.strategy.id}`} className="text-sm font-medium text-gray-500 hover:text-gray-700">
              Strategy: {outcome.strategy.name}
            </Link>
          </div>
        </li>
        <li>
          <div className="flex items-center">
            <ChevronRightIcon className="flex-shrink-0 h-5 w-5 text-gray-400" />
            <span className="ml-4 text-sm font-medium text-gray-500">Outcome: {outcome.name}</span>
          </div>
        </li>
      </PageHeader>
      <div></div>
    </div>
  );
};

export default Outcome;
