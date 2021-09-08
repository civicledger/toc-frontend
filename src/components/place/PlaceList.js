import { Link } from 'react-router-dom';
import { ChevronRightIcon } from '@heroicons/react/solid';

const PlaceList = ({ places, strategies }) => {
  const strategiesObject = strategies.reduce((strategies, strategy) => {
    if (!strategies[strategy.placeId]) {
      strategies[strategy.placeId] = [];
    }
    strategies[strategy.placeId].push(strategy);
    return strategies;
  }, {});

  return (
    <div className="bg-white shadow overflow-hidden sm:rounded-md">
      <ul className="divide-y divide-gray-200">
        {places.map(place => (
          <li key={place.id}>
            <Link to={`/places/${place.name.split(' ').join('-').toLowerCase()}`} className="block hover:bg-gray-50">
              <div className="px-4 py-4 flex items-center sm:px-6">
                <div className="min-w-0 flex-1 sm:flex sm:items-center sm:justify-between">
                  <div className="flex space-x-3">
                    <div className="truncate">
                      <div className="flex text-sm">
                        <p className="font-medium text-indigo-600 truncate">{place.name}</p>
                        <p className="ml-1 flex-shrink-0 font-normal text-gray-500"></p>
                      </div>
                      <div className="mt-2 flex">
                        <div className="flex items-center text-sm text-gray-500">
                          {strategiesObject[place.id]?.length ?? 0} {strategiesObject[place.id]?.length === 1 ? 'strategy' : 'strategies'} in this
                          place
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="mt-4 flex-shrink-0 sm:mt-0 sm:ml-5">
                    <div className="flex overflow-hidden -space-x-1"></div>
                  </div>
                </div>
                <div className="ml-5 flex-shrink-0">
                  <ChevronRightIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                </div>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};
export default PlaceList;
