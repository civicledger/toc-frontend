import { useState, useEffect } from 'react';
import { useQuery } from 'react-query';
import { activitiesQuery } from '../../utilities/queries';
import CreateStrategyFeed from './NewStrategyFeed';
import { compareDesc } from 'date-fns';
import ActivityFilterOptions from './ActivityFilterOptions';

import PageHeader from '../layout/PageHeader';

const Feed = () => {
  const [activeFilters, setActiveFilters] = useState([]);
  const [filters, setFilters] = useState([]);

  let { data: activities } = useQuery(['activities'], () => activitiesQuery(), {
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
    <>
      <PageHeader title="Feeds"></PageHeader>
      <div className="bg-white shadow overflow-visible sm:rounded-lg m-4">
        <div className="mt-5 md:mt-0 md:col-span-2">
          <ActivityFilterOptions className="overflow-visible" filters={filters} activeFilters={activeFilters} setActiveFilters={setActiveFilters} />
        </div>

        {filteredActivities.map(activity => (
          <CreateStrategyFeed activity={activity} />
        ))}
      </div>
    </>
  );
};

export default Feed;
