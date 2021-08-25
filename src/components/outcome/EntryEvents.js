import { Fragment } from 'react';

import { shortDate } from '../../utilities/format';

const EntryEvents = ({ event, definition }) => {
  if (!event || !definition) return '';

  const fieldForKey = key => {
    if (!definition) return 1;
    return definition.fields.find(field => field.name === key) ?? 1;
  };

  const typedValue = (key, value) => {
    let returnValue;
    const { type } = fieldForKey(key);

    switch (type) {
      case 3:
        returnValue = value ? 'true' : 'false';
        break;
      case 4:
        returnValue = shortDate(new Date(value));
        break;
      default:
        returnValue = value;
    }

    return returnValue;
  };

  return (
    <div className="mx-10 bg-white shadow overflow-hidden sm:rounded-lg">
      <dl>
        {Object.entries(event).map(([key, value]) => (
          <div className="p-1 bg-gray-50 lg:grid lg:grid-cols-5 lg:gap-4 rounded border">
            <Fragment key={key}>
              <dt className="mt-1 text-sm font-medium text-gray-800 lg:col-span-2">{key}</dt>
              <dd className="text-sm text-gray-800 lg:mt-0 lg:col-span-3">{typedValue(key, value)}</dd>
            </Fragment>
          </div>
        ))}
      </dl>
    </div>
  );
};

export default EntryEvents;
