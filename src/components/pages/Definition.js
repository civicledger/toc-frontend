import { Link, useRouteMatch } from 'react-router-dom';
import { useQuery } from 'react-query';
import { definitionQuery, outcomeQuery, userQuery } from '../../utilities/queries';
import { LoginContext } from '../../utilities/reducers';
import { ChevronRightIcon } from '@heroicons/react/solid';
import { useContext } from 'react';

import PageHeader from '../layout/PageHeader';
import NewBenchmarkModal from '../outcome/NewBenchmarkModal';
import NewEntryModal from '../outcome/NewEntryModal';
import { shortDate } from '../../utilities/format';
import EntryEvents from '../outcome/EntryEvents';

const fieldTypes = {
  1: 'String',
  2: 'Number',
  3: 'Boolean',
  4: 'Date',
};

const Definition = () => {
  const {
    params: { id, definitionId },
  } = useRouteMatch();

  const { login } = useContext(LoginContext);
  const { data: outcome } = useQuery(['outcomes', id], () => outcomeQuery(id), { keepPreviousData: true });
  const { data: definition } = useQuery(['definitions', definitionId], () => definitionQuery(definitionId), { keepPreviousData: true });
  const { data: user } = useQuery(['users', login.user.id], () => userQuery(login.user.id), { keepPreviousData: true });

  if (!outcome || !user || !definition) return '';

  console.log(definition);

  const checkOwnership = user.companies.some(({ id, relationship }) => {
    if (outcome.strategy.companyId !== id) return false;
    if (relationship.type === 1) return true;
    if (relationship.type === 2 && !relationship.pending) return true;
    return false;
  });

  return (
    <div className="p-10">
      <PageHeader title={definition.description}>
        <li>
          <div>
            <Link to={`/outcomes/${definition.outcome.id}`} className="text-sm font-medium text-gray-500 hover:text-gray-700">
              Outcome: {definition.outcome.name}
            </Link>
          </div>
        </li>
        <li>
          <div className="flex items-center">
            <ChevronRightIcon className="flex-shrink-0 h-5 w-5 text-gray-400" />
            <span className="ml-4 text-sm font-medium text-gray-500">KPI: {definition.description}</span>
          </div>
        </li>
      </PageHeader>

      <div className="mt-6 flex gap-5">
        <div className="flex-1">
          <div className="flex justify-between">
            <div className="mb-5 text-xl font-bold leading-7 col-span-1">Targets</div>
            {checkOwnership && <NewBenchmarkModal definition={definition} />}
          </div>
          <div className="border divide-y divide-gray-200">
            {definition.benchmarks.map(benchmark => (
              <div className="p-3 flex bg-gray-50 justify-between group hover:bg-gray-200">
                <div>
                  <span className="block font-bold">{benchmark.value}</span>
                </div>
                <div className="flex-shrink">{shortDate(new Date(benchmark.date))}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex-1">
          <div className="mb-5 text-xl font-bold leading-7 col-span-1">KPI custom fields</div>
          <div className="border rounded-sm mb-10">
            {definition.fields.length > 0 && (
              <table className="min-w-full divide-y divide-gray-200 text-sm text-left">
                <thead className="bg-gray-100">
                  <tr className="font-semibold">
                    <th scope="col" className="px-3 py-1">
                      Field Name
                    </th>
                    <th scope="col" className="px-3 py-1">
                      Label
                    </th>
                    <th scope="col" className="px-3 py-1">
                      Data Type
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {definition.fields.map((field, index) => {
                    return (
                      <tr key={index} className="px-4 py-3 whitespace-nowrap">
                        <td className="px-3 py-1">{field.name}</td>
                        <td className="px-3 py-1">{field.label}</td>
                        <td className="px-3 py-1">{fieldTypes[field.type]}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            )}
            {!definition.fields.length && <div className="p-3 text-sm text-gray-500">No fields are set with this KPI</div>}
          </div>
        </div>

        <div className="mt-6 flex gap-5">
          <div className="flex-1"></div>
          <div className="flex-1"></div>
        </div>
      </div>

      <div className="mt-6">
        <div className="flex justify-between">
          <div className="mb-5 text-xl font-bold leading-7">Measures</div>
          {checkOwnership && <NewEntryModal definition={definition} />}
        </div>
        <div className="border divide-y divide-gray-200">
          {definition.entries.map(entry => (
            <>
              <div className="p-3 grid grid-cols-3 bg-gray-50 justify-between group hover:bg-gray-200">
                <span className="block font-bold col-span-1">{entry.name}</span>
                <div className="col-span-2">{entry.event && <EntryEvents event={entry.event} definition={definition} />}</div>
              </div>
            </>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Definition;
