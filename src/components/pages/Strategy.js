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
import NewMilestoneModal from '../strategy/NewMilestoneModal';
import StrategyViewList from '../strategy/StrategyViewList';

import { strategyQuery, userQuery } from '../../utilities/queries';

const Strategy = () => {
  const { login } = useContext(LoginContext);

  const { params } = useRouteMatch();
  const { data: strategy } = useQuery(['strategies', params.id], () => strategyQuery(params.id), { keepPreviousData: true });
  const { data: user } = useQuery(['users', login.user.id], () => userQuery(login.user.id), { keepPreviousData: true });

  if (!strategy) return '';

  const longTermOutcomes = strategy.outcomes.filter(({ longTerm }) => longTerm === true);
  const shortTermOutcomes = strategy.outcomes.filter(({ longTerm }) => longTerm === false);

  const initiatives = strategy.outcomes.reduce((initiatives, outcome) => {
    return [...initiatives, ...outcome.initiatives];
  }, []);

  const outputs = initiatives.reduce((outputs, initiative) => {
    return [...outputs, ...initiative.outputs];
  }, []);

  const milestones = outputs.reduce((milestones, output) => {
    milestones = [...milestones, ...output.milestones];
    return milestones;
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

          <div className="p-10">
            {longTermOutcomes.length > 0 && (
              <>
                <h2 className="text-md font-semibold">Goals</h2>
                <div className="p-5 m-5 issues grid grid-cols-4 gap-3">
                  {longTermOutcomes.map(outcome => (
                    <div className="rounded shadow flex flex-col group" key={outcome.id}>
                      <span className="font-medium p-2 bg-gray-400 rounded-t">
                        <Link to={`/outcomes/${outcome.id}`}>{outcome.name}</Link>
                      </span>
                      <div className="flex-grow p-3 bg-gray-50 flex flex-col">
                        <p className="flex-grow">{outcome.description}</p>
                        <div className="text-right relative pb-10">
                          <span
                            className="p-2 px-4 rounded-full font-semibold text-xs absolute bottom-0 right-0"
                            style={{ color: `#${outcome.goal.colour}`, backgroundColor: `#${outcome.goal.secondary_colour}` }}
                          >
                            SDG {outcome.target ? `${outcome.goal.id}.${outcome.target.number}` : `${outcome.goal.id}`}
                          </span>
                        </div>
                      </div>
                      <div className="flex justify-end">
                        <Link
                          to={`/outcomes/${outcome.id}`}
                          className="hidden m-3 mt-0 p-1 px-2 pr-1 text-white w-1/2 bg-blue-400 rounded text-sm group-hover:inline-block hover:bg-blue-500"
                        >
                          View Detail
                          <ChevronRightIcon className="float-right h-5" />
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}

            {longTermOutcomes.length > 0 && (
              <>
                <h2 className="text-md font-semibold">Objectives</h2>
                <div className="p-5 m-5 issues grid grid-cols-4 gap-3">
                  {shortTermOutcomes.map(outcome => (
                    <div className="rounded shadow flex flex-col group" key={outcome.id}>
                      <span className="font-medium p-2 bg-gray-400 rounded-t">
                        <Link to={`/outcomes/${outcome.id}`}>{outcome.name}</Link>
                      </span>
                      <div className="flex-grow p-3 bg-gray-50 flex flex-col">
                        <p className="flex-grow">{outcome.description}</p>
                        <div className="text-right relative pb-10">
                          <span
                            className="p-2 px-4 rounded-full font-semibold text-xs absolute bottom-0 right-0"
                            style={{ color: `#${outcome.goal.colour}`, backgroundColor: `#${outcome.goal.secondary_colour}` }}
                          >
                            SDG {outcome.target ? `${outcome.goal.id}.${outcome.target.number}` : `${outcome.goal.id}`}
                          </span>
                        </div>
                      </div>
                      <div className="flex justify-end">
                        <Link
                          to={`/outcomes/${outcome.id}`}
                          className="hidden m-3 mt-0 p-1 px-2 pr-1 text-white w-1/2 bg-blue-400 rounded text-sm group-hover:inline-block hover:bg-blue-500"
                        >
                          View Detail
                          <ChevronRightIcon className="float-right h-5" />
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>

          <hr className="my-5" />

          <StrategyViewList title="Outputs" items={outputs}>
            {checkOwnership && <NewOutputModal strategy={strategy} />}
          </StrategyViewList>

          <StrategyViewList title="Initiatives" items={initiatives} headerLink="initiatives">
            {checkOwnership && <NewInitiativeModal strategy={strategy} />}
          </StrategyViewList>

          <StrategyViewList title="Issues" items={strategy.issues}>
            {checkOwnership && <NewIssueModal strategy={strategy} />}
          </StrategyViewList>

          <StrategyViewList title="Milestones" items={milestones}>
            {checkOwnership && <NewMilestoneModal strategy={strategy} outputs={outputs} />}
          </StrategyViewList>
        </div>
      </div>

      <div className="mt-10"></div>
    </div>
  );
};

export default Strategy;
