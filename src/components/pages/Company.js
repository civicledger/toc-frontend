import { useReducer } from 'react';
import { useRouteMatch, Link } from 'react-router-dom';
import { useQuery } from 'react-query';
import { BriefcaseIcon, CalendarIcon, ClockIcon, ChevronRightIcon, LocationMarkerIcon, CheckCircleIcon, MailIcon } from '@heroicons/react/solid';

import CompanyStrategies from '../company/CompanyStrategies';

import { shortRawDate } from '../../utilities/format';
import { companyQuery, strategiesQuery } from '../../utilities/queries';

const companyTypes = {
  1: 'Company',
  2: 'Community Group',
  3: 'Government Agency',
  4: 'Investor',
  5: 'NFP',
  6: 'MultiNational Company',
};

const tabs = [
  { name: 'Owners', type: 1, current: true },
  { name: 'Members', type: 2, current: false },
  { name: 'Subscribers', type: 3, current: false },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

function reducer(state, action) {
  switch (action.type) {
    case 'switchTo':
      return state.map(tab => {
        tab.current = false;
        if (tab.type === action.selected) tab.current = true;
        return tab;
      });
    default:
      return [...state];
  }
}

const Company = () => {
  const [tabState, dispatch] = useReducer(reducer, tabs);

  const { params } = useRouteMatch();

  const { data: company } = useQuery(['companies', params.id], () => companyQuery(params.id), { keepPreviousData: true });
  const { data: strategies } = useQuery('strategies', strategiesQuery, { keepPreviousData: true });

  if (!company) return '';
  const countUsers = company.users.reduce(
    (counts, user) => {
      counts[user.relationship.type]++;
      return counts;
    },
    { 1: 0, 2: 0, 3: 0 }
  );

  const currentFilter = tabState.find(({ current }) => current);
  const filteredUsers = company.users.filter(user => {
    return currentFilter.type === user.relationship.type;
  });

  return (
    <div className="relative min-h-screen bg-white">
      {/* Page heading */}
      <header className="bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 xl:flex xl:items-center xl:justify-between">
          <div className="flex-1 min-w-0">
            <nav className="flex" aria-label="Breadcrumb">
              <ol className="flex items-center space-x-4">
                <li>
                  <div>
                    <Link to="/entities" className="text-sm font-medium text-gray-500 hover:text-gray-700">
                      All Entities
                    </Link>
                  </div>
                </li>
                <li>
                  <div className="flex items-center">
                    <ChevronRightIcon className="flex-shrink-0 h-5 w-5 text-gray-400" />
                    <span className="ml-4 text-sm font-medium text-gray-500">{company.name}</span>
                  </div>
                </li>
              </ol>
            </nav>
            <div className="flex flex-row mt-2">
              <div className="flex border bg-white shadow p-1 mr-4 rounded-lg">
                <div className="w-full group block">
                  <div className="flex items-center">
                    <div>
                      <img className="inline-block h-16 w-16 rounded" src={company.logo} alt="" />
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <h1 className="mt-2 text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">{company.name}</h1>
                <div className="mt-1 flex flex-col sm:flex-row sm:flex-wrap sm:mt-0 sm:space-x-8">
                  <div className="mt-2 flex items-center text-sm text-gray-500">
                    <BriefcaseIcon className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" />
                    {companyTypes[company.type]}
                  </div>
                  <div className="mt-2 flex items-center text-sm text-gray-500">
                    <LocationMarkerIcon className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" />
                    {company.locations.map(location => location.name).join(', ')}
                  </div>
                  <div className="mt-2 flex items-center text-sm text-gray-500">
                    <CalendarIcon
                      className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      aria-hidden="true"
                    />
                    Created on {shortRawDate(company.created_at)}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <CompanyStrategies strategies={strategies} company={company} />

      <main className="pt-8 pb-16">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <div className="px-4 sm:px-0">
            <h2 className="text-lg font-medium text-gray-900">People</h2>

            {/* Tabs */}
            <div className="sm:hidden">
              <label htmlFor="tabs" className="sr-only">
                Select a tab
              </label>
              <select
                id="tabs"
                name="tabs"
                className="mt-4 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm rounded-md"
                defaultValue={tabState.find(tab => tab.current).name}
              >
                {tabState.map(tab => (
                  <option key={tab.name}>{tab.name}</option>
                ))}
              </select>
            </div>
            <div className="hidden sm:block">
              <div className="border-b border-gray-200">
                <nav className="mt-2 -mb-px flex space-x-8" aria-label="Tabs">
                  {tabState.map(tab => (
                    <span
                      key={tab.name}
                      onClick={() => {
                        dispatch({ type: 'switchTo', selected: tab.type });
                      }}
                      className={classNames(
                        tab.current
                          ? 'border-purple-500 text-purple-600'
                          : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-200',
                        'whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm cursor-pointer'
                      )}
                    >
                      {tab.name}

                      <span
                        className={classNames(
                          tab.current ? 'bg-purple-100 text-purple-600' : 'bg-gray-100 text-gray-900',
                          'hidden ml-2 py-0.5 px-2.5 rounded-full text-xs font-medium md:inline-block'
                        )}
                      >
                        {countUsers[tab.type]}
                      </span>
                    </span>
                  ))}
                </nav>
              </div>
            </div>
          </div>

          {/* Stacked list */}
          <ul className="mt-5 border-t border-gray-200 divide-y divide-gray-200 sm:mt-0 sm:border-t-0">
            {filteredUsers.map(candidate => (
              <li key={candidate.email}>
                <Link to={`/profiles/${candidate.id}`} className="group block">
                  <div className="flex items-center py-5 px-4 sm:py-6 sm:px-0">
                    <div className="min-w-0 flex-1 flex items-center">
                      <div className="flex-shrink-0">
                        <img className="h-12 w-12 rounded-full group-hover:opacity-75" src={candidate.image} alt="" />
                      </div>
                      <div className="min-w-0 flex-1 px-4 md:grid md:grid-cols-2 md:gap-4">
                        <div>
                          <p className="text-sm font-medium text-purple-600 truncate">{candidate.name}</p>
                          <p className="mt-2 flex items-center text-sm text-gray-500">
                            <MailIcon className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" aria-hidden="true" />
                            <span className="truncate">{candidate.email}</span>
                          </p>
                        </div>
                        <div className="hidden md:block">
                          <div>
                            <p className="text-sm text-gray-900">
                              Applied on <time dateTime={candidate.created_at}>{shortRawDate(candidate.created_at)}</time>
                            </p>
                            <p className="mt-2 flex items-center text-sm text-gray-500">
                              {candidate.relationship.pending && (
                                <>
                                  <ClockIcon className="flex-shrink-0 mr-1.5 h-5 w-5 text-green-400" aria-hidden="true" />
                                  Approval Pending
                                </>
                              )}
                              {!candidate.relationship.pending && (
                                <>
                                  <CheckCircleIcon className="flex-shrink-0 mr-1.5 h-5 w-5 text-green-400" aria-hidden="true" />
                                  Approved
                                </>
                              )}
                            </p>
                          </div>
                        </div>
                      </div>
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
      </main>
    </div>
  );
};
export default Company;
