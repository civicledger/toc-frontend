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
      <div className="mt-6">
        <div className="grid grid-cols-4">
          <div className="col-span-3">
            <div className="font-semibold">Description</div>
            <div>{outcome.description}</div>
          </div>
          <div className="flex flex-col items-center">
            <img
              className="w-20 float-left mr-5"
              alt={`SDG ${outcome.goalId} Icon`}
              src={`https://ig-indicators.sgp1.digitaloceanspaces.com/sdg/goal-${outcome.goalId.toString().padStart(2, '0')}.png`}
            />
            <span className="text-xl pr-3 font-bold" style={{ color: `#${outcome.goal.colour}` }}>
              {outcome.goalId}.{outcome.target.number}
            </span>
          </div>
        </div>
      </div>

      <div className="mt-6 flex gap-5">
        <div className="flex-1">
          <div className="mb-5 text-xl font-bold leading-7">Initiatives</div>

          <div className="border divide-y divide-gray-200">
            {outcome.initiatives.map(initiative => (
              <Link key={initiative.id} to={`/initiatives/${initiative.id}`} className="p-3 flex bg-gray-50 justify-between group hover:bg-gray-200">
                <div>
                  <span className="block font-bold">{initiative.name}</span>

                  {initiative.description}
                </div>
                <div className="flex-shrink">
                  <ChevronRightIcon className="h-6 text-gray-400 group-hover:text-gray-800" />
                </div>
              </Link>
            ))}
          </div>
        </div>
        <div className="flex-1"></div>
      </div>
    </div>
  );
};

export default Outcome;