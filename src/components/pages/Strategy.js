import { useRouteMatch } from 'react-router-dom';
import { useQuery } from 'react-query';
import { Link } from 'react-router-dom';
import { ChevronRightIcon } from '@heroicons/react/solid';

import PageHeader from '../layout/PageHeader';

import { strategyQuery } from '../../utilities/queries';

const Strategy = () => {
  const { params } = useRouteMatch();
  const { data: strategy } = useQuery(['strategies', params.id], () => strategyQuery(params.id), { keepPreviousData: true });
  console.log(strategy);
  if (!strategy) return '';
  return (
    <div className="p-10">
      <PageHeader title={strategy.name}>
        <li>
          <div>
            <Link to={`/entities/${strategy.company.id}`} className="text-sm font-medium text-gray-500 hover:text-gray-700">
              {strategy.company.name}
            </Link>
          </div>
        </li>
        <li>
          <div className="flex items-center">
            <ChevronRightIcon className="flex-shrink-0 h-5 w-5 text-gray-400" />
            <span className="ml-4 text-sm font-medium text-gray-500">{strategy.name}</span>
          </div>
        </li>
      </PageHeader>

      <div className="mt-10">
        <div className="flex flex-col">
          <div className="text-lg border m-5 p-5 bg-gray-100 vision">{strategy.vision}</div>
          <div className="border m-5 issues grid grid-cols-4 gap-3">
            {strategy.issues.map(issue => (
              <div className="border p-2 rounded">
                <span className="font-medium">{issue.name}</span>
                <p>{issue.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Strategy;
