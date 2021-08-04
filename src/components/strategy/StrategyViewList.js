import classNames from 'classnames';

const StrategyViewList = ({ children, items, title, newComponent, headerBackground = 'bg-gray-300' }) => {
  const headerClass = classNames('font-medium p-2 rounded-t', { [headerBackground]: true });
  return (
    <>
      <h2 className="text-lg font-semibold">{title}</h2>
      <div className="m-5 issues grid grid-cols-4 gap-3">
        {items.map(item => (
          <div className="rounded shadow flex flex-col" key={item.id}>
            <span className={headerClass}>{item.name}</span>
            <p className="p-3">{item.description}</p>
          </div>
        ))}
      </div>
      {children}
      <hr className="my-5" />
    </>
  );
};
export default StrategyViewList;
