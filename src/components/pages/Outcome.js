import { Link, useRouteMatch } from 'react-router-dom';
import { useQuery } from 'react-query';
import { ChevronRightIcon } from '@heroicons/react/solid';
import { useContext } from 'react';

import PageHeader from '../layout/PageHeader';

import { outcomeQuery, userQuery } from '../../utilities/queries';
import ClusterOutcomeList from '../outcome/ClusterOutcomeList';
import DefinitionList from '../outcome/DefinitionList';
import NewDefinitionModal from '../outcome/NewDefinitionModal';
import NewInitiativeModal from '../strategy/NewInitiativeModal';
import { LoginContext } from '../../utilities/reducers';

const Outcome = () => {
  const { params } = useRouteMatch();
  const { login } = useContext(LoginContext);
  const { data: outcome } = useQuery(['outcomes', params.id], () => outcomeQuery(params.id), { keepPreviousData: true });
  const { data: user } = useQuery(['users', login.user.id], () => userQuery(login.user.id), { keepPreviousData: true });

  if (!outcome || !user) return '';

  const checkOwnership = user.companies.some(({ id, relationship }) => {
    if (outcome.strategy.companyId !== id) return false;
    if (relationship.type === 1) return true;
    if (relationship.type === 2 && !relationship.pending) return true;
    return false;
  });

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
              {outcome.target ? `${outcome.goal.id}.${outcome.target.number}` : `${outcome.goal.id}`}
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
          <NewInitiativeModal outcome={outcome} />
        </div>

        <div className="flex-1">
          <div className="mb-5 text-xl font-bold leading-7">KPI</div>
          <div className="flex justify-end"></div>

          <div className="border divide-y divide-gray-200">
            <DefinitionList outcome={outcome} checkOwnership={checkOwnership} />
          </div>

          {checkOwnership && <NewDefinitionModal outcome={outcome} />}
        </div>
      </div>

      <div className="mt-6 flex gap-5">
        <div className="flex-1"></div>
        <div className="flex-1"></div>
      </div>

      {outcome.clusters.length > 0 && (
        <div className="mt-6 flex gap-5">
          <ClusterOutcomeList outcome={outcome} />
        </div>
      )}
    </div>
  );
};

export default Outcome;
