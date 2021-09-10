import { useContext } from 'react';
import { Link, useRouteMatch } from 'react-router-dom';
import { useQuery } from 'react-query';
import { ChevronRightIcon } from '@heroicons/react/solid';

import PageHeader from '../layout/PageHeader';
import NewOutputModal from '../strategy/NewOutputModal';
import { LoginContext } from '../../utilities/reducers';
import { intiativeQuery, userQuery } from '../../utilities/queries';

const Initiative = () => {
  const { login } = useContext(LoginContext);
  const { params } = useRouteMatch();
  const { data: initiative } = useQuery(['initiatives', params.id], () => intiativeQuery(params.id), { keepPreviousData: true });
  const { data: user } = useQuery(['users', login.user.id], () => userQuery(login.user.id), { keepPreviousData: true });

  if (!initiative || !user) return <></>;
  const outcome = initiative.outcome;
  const strategy = outcome.strategy;

  const checkOwnership = user.companies.some(({ id, relationship }) => {
    if (outcome.strategy.companyId !== id) return false;
    if (relationship.type === 1) return true;
    if (relationship.type === 2 && !relationship.pending) return true;
    return false;
  });

  return (
    <div className="p-10">
      <PageHeader title={`Initiative: ${initiative.name}`}>
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
      <div className="mt-6">
        <div className="grid grid-cols-4">
          <div className="col-span-3">
            <div className="font-semibold">Description</div>
            <div>{initiative.description}</div>
          </div>
        </div>
      </div>
      <div className="mt-5">
        <div className="flex justify-between">
          <h3 className="mb-5 text-xl font-bold leading-7">Outputs</h3>
          {checkOwnership && <NewOutputModal initiative={initiative} />}
        </div>
        <div className="grid grid-cols-4 gap-5">
          {initiative.outputs.length === 0 && (
            <div className="col-span-4 border text-center p-3 bg-gray-50">There are currently no outputs for this initiative</div>
          )}
          {initiative.outputs.map(output => (
            <div key={output.id} className="shadow p-3">
              <div className="text-xl">{output.name}</div>
              <div className="p-2">{output.description}</div>
              <span className="block text-lg mt-5">Milestones</span>
              <ul className="divide-y divide-gray-200 bg-gray-50 border mt-2 text-sm">
                {output.milestones.map(milestone => (
                  <li key={milestone.id} className="p-2">
                    <span className="block">{milestone.name}</span>
                    <span className="block text-right">{milestone.date}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Initiative;
