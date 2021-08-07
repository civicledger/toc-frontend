import { useContext } from 'react';
import { useRouteMatch } from 'react-router-dom';
import { useQuery } from 'react-query';
import { Link } from 'react-router-dom';
import { ChevronRightIcon } from '@heroicons/react/solid';

import { LoginContext } from '../../utilities/reducers';

import PageHeader from '../layout/PageHeader';
import NewInitiativeModal from '../strategy/NewInitiativeModal';
import NewIssueModal from '../strategy/NewIssueModal';
import NewOutcomeModal from '../strategy/NewOutcomeModal';
import NewOutputModal from '../strategy/NewOutputModal';

import { strategyQuery, userQuery } from '../../utilities/queries';

const Strategy = () => {
  const { login } = useContext(LoginContext);

  const { params } = useRouteMatch();
  const { data: strategy } = useQuery(['strategies', params.id], () => strategyQuery(params.id), { keepPreviousData: true });
  const { data: user } = useQuery(['users', login.user.id], () => userQuery(login.user.id), { keepPreviousData: true });

  if (!strategy) return '';

  const outcomes = strategy.outcomes;
  console.log(outcomes);

  const initiatives = strategy.outcomes.reduce((initiatives, outcome) => {
    return [...initiatives, ...outcome.initiatives];
  }, []);

  const outputs = initiatives.reduce((outputs, initiative) => {
    return [...outputs, ...initiative.outputs];
  }, []);

  const checkOwnership = user.companies.some(company => {
    if (company.id !== strategy.company.id) return false;
    if (company.relationship.type === 1) return true;
    if (company.relationship.type === 2 && !company.relationship.pending) return true;
    return false;
  });

  return (
    <div className="p-10">
      <PageHeader title={strategy.name}>
        <li>
          <div>
            <Link to={`/entities/${strategy.company.id}`} className="text-sm font-medium text-gray-500 hover:text-gray-700">
              {strategy.company.name}
            </Link>
          </div>
        </li>
        <li>
          <div className="flex items-center">
            <ChevronRightIcon className="flex-shrink-0 h-5 w-5 text-gray-400" />
            <span className="ml-4 text-sm font-medium text-gray-500">{strategy.name}</span>
          </div>
        </li>
      </PageHeader>

      <div className="mt-10">
        <div className="flex flex-col">
          <h2 className="text-lg font-semibold">Vision</h2>
          <div className="text-lg border m-5 p-5 bg-gray-100 vision">{strategy.vision}</div>

          <hr className="my-5" />
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-semibold">Outcomes</h2>
            {checkOwnership && <NewOutcomeModal strategy={strategy} />}
          </div>
          <h2 className="text-lg font-semibold"></h2>
          <div className="m-5 issues grid grid-cols-4 gap-3">
            {outcomes.map(outcome => (
              <div className="rounded shadow flex flex-col" key={outcome.id}>
                <span className="font-medium p-2 bg-gray-400 rounded-t">{outcome.name}</span>
                <div className="flex-grow p-3 bg-gray-50 flex flex-col">
                  <p className="flex-grow">{outcome.description}</p>
                  <div className="text-right relative pb-10">
                    <span
                      className="p-2 px-4 rounded-full font-semibold text-xs absolute bottom-0 right-0"
                      style={{ color: `#${outcome.goal.colour}`, backgroundColor: `#${outcome.goal.secondary_colour}` }}
                    >
                      SDG Target {outcome.goal.id}.{outcome.target.number}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <hr className="my-5" />
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-semibold">Outputs</h2>
            {checkOwnership && <NewOutputModal strategy={strategy} />}
          </div>
          <div className="m-5 issues grid grid-cols-4 gap-3">
            {outputs.map(output => (
              <div className="rounded shadow flex flex-col" key={output.id}>
                <span className="font-medium p-2 bg-gray-300 rounded-t">{output.name}</span>
                <p className="p-3">{output.description}</p>
              </div>
            ))}
          </div>

          <hr className="my-5" />
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-semibold">Initiatives</h2>
            {checkOwnership && <NewInitiativeModal strategy={strategy} />}
          </div>
          <div className="m-5 issues grid grid-cols-4 gap-3">
            {initiatives.map(initiative => (
              <div className="rounded shadow flex flex-col" key={initiative.id}>
                <span className="font-medium p-2 bg-gray-200 rounded-t">{initiative.name}</span>
                <p className="p-3">{initiative.description}</p>
              </div>
            ))}
          </div>

          <hr className="my-5" />

          <div className="flex justify-between items-center">
            <h2 className="text-lg font-semibold">Issues</h2>
            {checkOwnership && <NewIssueModal strategy={strategy} />}
          </div>
          <div className="m-5 issues grid grid-cols-4 gap-3">
            {strategy.issues.map(issue => (
              <div className="rounded shadow flex flex-col" key={issue.id}>
                <span className="font-medium p-2 bg-gray-100 rounded-t">{issue.name}</span>
                <p className="p-3">{issue.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-10"></div>
    </div>
  );
};

export default Strategy;
