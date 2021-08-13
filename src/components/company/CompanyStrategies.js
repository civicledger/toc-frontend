import { Link } from 'react-router-dom';
import { ChevronRightIcon, LocationMarkerIcon } from '@heroicons/react/solid';

import NewStrategyModal from './NewStrategyModal';

const CompanyStrategies = ({ strategies = [], company, isOwner }) => (
  <main className="pt-8 pb-16">
    <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
      <div className="px-4 sm:px-0">
        <h2 className="text-lg font-medium text-gray-900">Strategies</h2>

        <ul className="mt-5 border-t border-gray-200 divide-y divide-gray-200 sm:mt-0 sm:border-t-0">
          {strategies.length === 0 && (
            <li className="border p-5 text-center">
              <p>This entity has no public strategies</p>
            </li>
          )}
          {strategies.map(strategy => (
            <li key={strategy.id}>
              <Link to={`/strategies/${strategy.id}`} className="group block">
                <div className="flex items-center py-5 px-4 sm:py-6 sm:px-0">
                  <div className="min-w-0 w-1/5 flex flex-col px-4">
                    <p className="text-sm font-medium text-indigo-600 truncate">{strategy.name}</p>
                    <p className="text-sm text-gray-500 truncate">
                      <LocationMarkerIcon className="h-4 inline-block" /> {strategy.place.name}
                    </p>
                  </div>
                  <div className="min-w-0 flex-1 flex px-4">
                    <p className="mt-2 flex items-center text-sm text-gray-500">{strategy.vision}</p>
                  </div>
                  <div>
                    <ChevronRightIcon className="h-5 w-5 text-gray-400 group-hover:text-gray-700" aria-hidden="true" />
                  </div>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
      {isOwner && <NewStrategyModal company={company} />}
    </div>
  </main>
);
export default CompanyStrategies;
