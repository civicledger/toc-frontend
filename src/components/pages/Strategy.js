import { useContext, useState } from 'react';
import { useRouteMatch } from 'react-router-dom';
import { useQuery } from 'react-query';
import { Link } from 'react-router-dom';
import { ChevronRightIcon, ExclamationIcon, PlusCircleIcon } from '@heroicons/react/solid';

import { LoginContext } from '../../utilities/reducers';

import PageHeader from '../layout/PageHeader';
import NewIssueModal from '../strategy/NewIssueModal';
import NewOutcomeModal from '../strategy/NewOutcomeModal';
import StrategyViewList from '../strategy/StrategyViewList';
import OutcomeList from '../strategy/OutcomeList';

import { strategyQuery, userQuery } from '../../utilities/queries';

const Strategy = () => {
  const { login } = useContext(LoginContext);
  const [outcomeOpen, setOutcomeOpen] = useState(false);
  const [issueOpen, setIssueOpen] = useState(false);

  const { params } = useRouteMatch();
  const { data: strategy } = useQuery(['strategies', params.id], () => strategyQuery(params.id), { keepPreviousData: true });
  const { data: user } = useQuery(['users', login.user.id], () => userQuery(login.user.id), { keepPreviousData: true });

  if (!strategy || !user) return '';

  const longTermOutcomes = strategy.outcomes.filter(({ longTerm }) => longTerm);
  const shortTermOutcomes = strategy.outcomes.filter(({ longTerm }) => !longTerm);

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

      <NewOutcomeModal strategy={strategy} open={outcomeOpen} setOpen={setOutcomeOpen} />
      <NewIssueModal strategy={strategy} open={issueOpen} setOpen={setIssueOpen} />

      <div className="mt-10">
        <div className="flex flex-col">
          <h2 className="text-lg font-semibold">Vision</h2>
          <div className="text-lg border m-5 p-5 bg-gray-100 vision">{strategy.vision}</div>

          <hr className="my-5" />

          <div className="flex justify-between items-center">
            <h2 className="text-lg font-semibold">Outcomes</h2>
            {checkOwnership && (
              <div>
                <button className="p-2 px-4 text-white rounded bg-indigo-500 hover:bg-indigo-600" onClick={() => setOutcomeOpen(true)}>
                  <PlusCircleIcon className="w-5 inline-block mr-2" /> Create new Outcome
                </button>
              </div>
            )}
          </div>

          {!longTermOutcomes.length && !shortTermOutcomes.length && (
            <div className="col-span-4 m-5 text-center border p-5 bg-yellow-100 rounded border-yellow-600 text-yellow-800">
              <ExclamationIcon className="h-6 inline-block text-yellow-600 mr-3" /> There are no outcomes in this strategy. You can create an outcome
              by clicking on the button to the right.
            </div>
          )}

          {strategy.outcomes.length > 0 && (
            <div className="p-10">
              <OutcomeList header="Goals" outcomes={longTermOutcomes} />
              <OutcomeList header="Objectives" outcomes={shortTermOutcomes} />
            </div>
          )}

          <hr className="my-5" />

          <StrategyViewList title="Outputs" items={outputs} checkOwnership={checkOwnership}>
            {!outputs.length && (
              <div className="col-span-4 text-center border p-5 bg-yellow-100 rounded border-yellow-600 text-yellow-800">
                <ExclamationIcon className="h-6 inline-block text-yellow-600 mr-3" /> There are no outputs in this strategy. You can create outputs
                from the initiative once your have created it.
              </div>
            )}
          </StrategyViewList>

          <StrategyViewList title="Initiatives" items={initiatives} headerLink="initiatives" checkOwnership={checkOwnership}>
            {!initiatives.length && (
              <div className="col-span-4 text-center border p-5 bg-yellow-100 rounded border-yellow-600 text-yellow-800">
                <ExclamationIcon className="h-6 inline-block text-yellow-600 mr-3" /> There are no current initiatives. You can create initiatives
                directly from any outcome, or{' '}
                <span className="text-link cursor-pointer" onClick={() => setOutcomeOpen(true)}>
                  create a new outcome
                </span>
                .
              </div>
            )}
          </StrategyViewList>

          <StrategyViewList
            title="Issues"
            items={strategy.issues}
            checkOwnership={checkOwnership}
            button={
              <button className="bg-indigo-500 p-2 px-4 text-white rounded hover:bg-indigo-600" onClick={() => setIssueOpen(true)}>
                <PlusCircleIcon className="w-5 inline-block mr-2" /> Create new Issue
              </button>
            }
          >
            {!strategy.issues.length && (
              <div className="col-span-4 text-center border p-5 bg-yellow-100 rounded border-yellow-600 text-yellow-800">
                <ExclamationIcon className="h-6 inline-block text-yellow-600 mr-3" />
                There are no issues listed on this strategy.
              </div>
            )}
          </StrategyViewList>

          <StrategyViewList title="Milestones" items={milestones} checkOwnership={checkOwnership}>
            {!milestones.length && (
              <div className="col-span-4 text-center border p-5 bg-yellow-100 rounded border-yellow-600 text-yellow-800">
                <ExclamationIcon className="h-6 inline-block text-yellow-600 mr-3" />
                There are no current milestones. To create milestones, first add initiatives and navigate to the initiative view.
              </div>
            )}
          </StrategyViewList>
        </div>
      </div>

      <div className="mt-10"></div>
    </div>
  );
};

export default Strategy;
