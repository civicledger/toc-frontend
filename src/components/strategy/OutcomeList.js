import { Link } from 'react-router-dom';
import { ChevronRightIcon } from '@heroicons/react/solid';

const OutcomeList = ({ header, outcomes }) => {
  return (
    <>
      <h2 className="text-md font-semibold">{header}</h2>
      <div className="p-5 m-5 issues grid grid-cols-4 gap-3">
        {outcomes.map(outcome => (
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
  );
};

export default OutcomeList;
