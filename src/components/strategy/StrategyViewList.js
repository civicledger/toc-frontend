import { Link } from 'react-router-dom';
import { ChevronRightIcon } from '@heroicons/react/solid';
import classNames from 'classnames';

const StrategyViewList = ({ children, items, title, headerLink = false, headerBackground = 'bg-gray-300' }) => {
  const headerClass = classNames('font-medium p-2 rounded-t', { [headerBackground]: true });

  return (
    <>
      <h2 className="text-lg font-semibold">{title}</h2>
      <div className="m-5 issues grid grid-cols-4 gap-3">
        {items.map(item => (
          <div className="rounded shadow flex flex-col group" key={item.id}>
            <span className={headerClass}>{item.name}</span>
            <p className="p-3">{item.description}</p>
            {headerLink && (
              <div className="flex justify-end">
                <Link
                  to={`/${headerLink}/${item.id}`}
                  className="hidden m-3 mt-0 p-1 px-2 pr-1 text-white w-1/2 bg-blue-400 rounded text-sm group-hover:inline-block hover:bg-blue-500"
                >
                  View Detail
                  <ChevronRightIcon className="float-right h-5" />
                </Link>
              </div>
            )}
          </div>
        ))}
      </div>
      {children}

      <hr className="my-5" />
    </>
  );
};

export default StrategyViewList;
