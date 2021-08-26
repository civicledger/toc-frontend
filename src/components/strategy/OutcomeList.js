import { Link } from 'react-router-dom';

const OutcomeList = ({ header, outcomes }) => {
  if (!outcomes.length) return '';
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
          </div>
        ))}
      </div>
    </>
  );
};

export default OutcomeList;
