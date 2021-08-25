import { useQuery } from 'react-query';
import { Link } from 'react-router-dom';
import { definitionsQuery } from '../../utilities/queries';
import { ChevronRightIcon } from '@heroicons/react/solid';
import NewBenchmarkModal from './NewBenchmarkModal';
import NewEntryModal from './NewEntryModal';

const DefinitionList = ({ outcome, checkOwnership }) => {
  const { data: definitions } = useQuery(['definitions', outcome.id], () => definitionsQuery(outcome.id), {
    keepPreviousData: true,
  });

  const countItems = (items, label) => {
    return `${items.length} ${label}${items.length === 0 ? '' : 's'}`;
  };

  if (!definitions) return <></>;

  return (
    <>
      {definitions.map(definition => (
        <div className="group grid justify-items-stretch">
          <Link
            key={definition.id}
            to={`/outcomes/${outcome.id}/kpis/${definition.id}`}
            className="p-3 flex bg-gray-50 justify-between group hover:bg-gray-200"
          >
            <div>
              <span className="block font-bold">{definition.description}</span>
              <div className="align-middle mt-3">
                {countItems(definition.benchmarks, 'target')}, {countItems(definition.entries, 'measure')}
              </div>
            </div>

            <div className="flex-shrink">
              <ChevronRightIcon className="h-6 text-gray-400 group-hover:text-gray-800" />
            </div>
          </Link>

          {checkOwnership && (
            <div className="hidden group-hover:flex justify-end text-white rounded text-sm group-hover:block">
              <NewBenchmarkModal definition={definition} />
              <NewEntryModal definition={definition} />
            </div>
          )}
        </div>
      ))}
    </>
  );
};

export default DefinitionList;
