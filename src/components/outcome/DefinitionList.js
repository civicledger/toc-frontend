import { useQuery } from 'react-query';
import { definitionsQuery } from '../../utilities/queries';
import NewBenchmarkModal from './NewBenchmarkModal';
import NewEntryModal from './NewEntryModal';

const DefinitionList = ({ outcome }) => {
  const { data: definitions } = useQuery(['definitions', outcome.id], () => definitionsQuery(outcome.id), {
    keepPreviousData: true,
  });

  if (!definitions) return <></>;

  return (
    <>
      {definitions.map(definition => (
        <div className="p-3 bg-gray-50 justify-between group hover:bg-gray-200">
          <div>
            <span className="block font-bold">{definition.description}</span>
            <div className="align-middle mt-3 flex">
              {definition.benchmarks.length + ' '}
              {definition.benchmarks.length > 1 ? 'targets, ' : 'target, '}
              {definition.entries.length + ' '}
              {definition.entries.length > 1 ? 'measures' : 'measure'}
            </div>
            <div className="flex justify-end">
              <NewBenchmarkModal definition={definition} />
              <NewEntryModal definition={definition} />
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default DefinitionList;
