import { Fragment } from 'react';
import { useQuery } from 'react-query';

import { placeQuery } from '../../utilities/queries';
import ArrangmentInitiatives from './ArrangmentInitiatives';

const ArrangementView = ({ placeId, goals }) => {
  const { data: place } = useQuery('getPlace', () => placeQuery(placeId), { keepPreviousData: true });

  if (!place) return '';

  const outcomes = place.strategies.reduce((outcomes, strategy) => {
    outcomes = [...outcomes, ...strategy.outcomes];
    return outcomes;
  }, []);

  const targets = goals.reduce((targets, goal) => {
    return [...targets, ...goal.targets];
  }, []);

  const goalOutcomes = outcomes.reduce((goals, outcome) => {
    if (!goals[outcome.goalId]) {
      goals[outcome.goalId] = {};
    }
    const target = targets.find(({ id }) => id === outcome.targetId);
    if (!goals[outcome.goalId][target.number]) {
      goals[outcome.goalId][target.number] = [];
    }
    goals[outcome.goalId][target.number].push(outcome);
    return goals;
  }, {});

  return (
    <>
      {Object.entries(goalOutcomes).map(([key, keyedOutcomes]) => {
        const goal = goals.find(({ id }) => +id === +key);
        return (
          <div className="grid grid-cols-4 gap-0 rounded-sm" key={key}>
            <div className="col-span-4 p-3 rounded-sm text-white font-semibold" style={{ backgroundColor: `#${goal.colour}` }}>
              <div>{goal.name}</div>
            </div>

            {Object.entries(keyedOutcomes).map(([number, outcomes]) => {
              return (
                <Fragment key={number}>
                  <div className="p-5" style={{ color: `#${goal.colour}` }}>
                    SDG {goal.id}.{number}
                  </div>
                  <div className="bg-gray-50"></div>
                  <div className=""></div>
                  <div className="bg-gray-50"></div>

                  {outcomes.map(outcome => {
                    return (
                      <Fragment key={outcome.id}>
                        <div className="p-3">
                          <div className="bg-white rounded-sm flex flex-col bg-gray-50">
                            <span className="p-2 rounded-sm-t bg-gray-200">{outcome.name}</span>
                            <p className="p-2">{outcome.description}</p>
                          </div>
                        </div>
                        <div className="bg-gray-50 p-3">
                          <ArrangmentInitiatives year="2021" initiatives={outcome.initiatives} />
                        </div>
                        <div className="p-3">
                          <ArrangmentInitiatives year="2022" initiatives={outcome.initiatives} />
                        </div>
                        <div className="bg-gray-50 p-3">
                          <ArrangmentInitiatives year="2023" initiatives={outcome.initiatives} />
                        </div>
                      </Fragment>
                    );
                  })}
                </Fragment>
              );
            })}
          </div>
        );
      })}
    </>
  );
};

export default ArrangementView;
