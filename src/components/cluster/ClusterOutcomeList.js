import { Link } from 'react-router-dom';
import { ChevronRightIcon } from '@heroicons/react/solid';
import { useQuery } from 'react-query';
import { clusterQuery } from '../../utilities/queries';

const ClusterOutcomeList = ({ outcome }) => {
  const { data: clusters } = useQuery(['clusters', outcome.clusters[0].id], () => clusterQuery(outcome.clusters[0].id), { keepPreviousData: true });

  return (
    <div className="flex-1">
      <div className="mb-5 text-xl font-bold">Clustered Outcomes</div>
      <div className="p-5">
        <div className="m-5 issues grid grid-cols-4 gap-3">
          {clusters?.outcomes.map(outcome => (
            <div className="rounded shadow flex flex-col group" key={outcome.id}>
              <span className="font-medium p-2 bg-gray-400 rounded-t">
                <Link to={`/outcomes/${outcome.id}`}>{outcome.name}</Link>
              </span>
              <div className="flex-grow p-3 bg-gray-50 flex flex-col">
                <p className="flex-grow">{outcome.description}</p>

                <div className="mt-5 flex-grow text-sm text-gray-500">
                  <p className="align-middle mb-3">
                    From strategy
                    <Link to={`/strategies/${outcome.strategy.id}`} className="text-indigo-600 hover:text-indigo-400 mx-1">
                      {outcome.strategy.name}
                    </Link>
                    by entity
                    <Link to={`/entities/${outcome.strategy.company.id}`} className="text-indigo-600 hover:text-indigo-400 mx-1">
                      {outcome.strategy.company.name}
                    </Link>
                  </p>
                </div>

                <div className="text-right relative pb-10">
                  <span
                    className="p-2 px-4 rounded-full font-semibold text-xs absolute bottom-0 left-0"
                    style={{ color: `#${outcome.goal.colour}`, backgroundColor: `#${outcome.goal.secondary_colour}` }}
                  >
                    SDG {outcome.target ? `${outcome.goal.id}.${outcome.target.number}` : `${outcome.goal.id}`}
                  </span>

                  <span className="rounded-full absolute bottom-0 right-0">
                    <div className="mt-4 flex-shrink-0 sm:mt-0 sm:ml-5">
                      <div className="flex overflow-hidden">
                        <img
                          className="inline-block h-6 w-6 rounded-full ring-2 ring-white"
                          src={outcome.strategy.company.logo}
                          alt={outcome.strategy.company.name}
                        />
                      </div>
                    </div>
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
      </div>
    </div>
  );
};

export default ClusterOutcomeList;
