import { Link } from 'react-router-dom';
import classNames from 'classnames';

const StrategyViewList = ({
  children,
  items,
  title,
  button = false,
  checkOwnership = false,
  headerLink = false,
  headerBackground = 'bg-gray-300',
}) => {
  const headerClass = classNames('font-medium p-2 rounded-t', { [headerBackground]: true });

  if (!items.length && !checkOwnership && title !== 'Issues') return '';

  return (
    <>
      <div className="flex justify-between">
        <h2 className="text-lg font-semibold">{title}</h2>
        {button}
      </div>
      <div className="m-5 issues grid grid-cols-4 gap-3">
        {children}
        {items.map(item => (
          <div className="rounded shadow flex flex-col group" key={item.id}>
            {headerLink && (
              <Link to={`/${headerLink}/${item.id}`} className={headerClass}>
                {item.name}
              </Link>
            )}
            {!headerLink && <span className={headerClass}>{item.name}</span>}
            <p className="p-3">{item.description}</p>
          </div>
        ))}
      </div>

      <hr className="my-5" />
    </>
  );
};

export default StrategyViewList;
