import { useState, useEffect } from 'react';
import { useQuery } from 'react-query';
import { activitiesQuery } from '../../utilities/queries';
import StrategyActivity from './StrategyActivity';
import OutcomeActivity from './OutcomeActivity';
import { compareDesc } from 'date-fns';
import ActivityFilterOptions from './ActivityFilterOptions';

const Feed = () => {
  const [activeFilters, setActiveFilters] = useState([]);
  const [filters, setFilters] = useState([]);

  let { data: activities } = useQuery('activities', activitiesQuery, {
    keepPreviousData: true,
  });

  if (!activities) activities = [];

  useEffect(() => {
    const getData = async () => {
      const eventNames = new Set(activities.map(({ event }) => event));
      setActiveFilters([...eventNames]);
      setFilters([...eventNames]);
    };
    getData();
  }, [activities]);

  activities.sort((a, b) => compareDesc(new Date(a.createdAt), new Date(b.createdAt)));

  let filteredActivities = activities.filter(({ event }) => {
    return activeFilters.includes(event);
  });

  return (
    <div>
      <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl mb-10">Activity Feed</h2>
      <div className="mt-5 md:mt-0 md:col-span-2">
        <ActivityFilterOptions className="overflow-visible" filters={filters} activeFilters={activeFilters} setActiveFilters={setActiveFilters} />
      </div>
      {filteredActivities.map(selectTemplate)}
    </div>
  );
};

const selectTemplate = activity => {
  switch (activity.event) {
    case 'CreateStrategy':
      return <StrategyActivity key={activity.id} activity={activity} />;
    case 'CreateOutcome':
      return <OutcomeActivity key={activity.id} activity={activity} />;
    default:
      return <OutcomeActivity key={activity.id} activity={activity} />;
  }
};

export default Feed;
