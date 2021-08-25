import { useQuery } from 'react-query';
import { activitiesQuery } from '../../utilities/queries';
import CreateStrategyFeed from './NewStrategyFeed';
import { compareDesc } from 'date-fns';

const Feed = () => {
  const { data: activities } = useQuery(['activities'], () => activitiesQuery(), {
    keepPreviousData: true,
  });

  if (!activities) return <></>;

  const sortedActivities = activities.sort((a, b) => compareDesc(new Date(a.createdAt), new Date(b.createdAt)));

  return (
    <div className="bg-white shadow overflow-hidden sm:rounded-lg m-4">
      {sortedActivities.map(activity => (
        <>{activity.event === 'CreateStrategy' && <CreateStrategyFeed activity={activity} />}</>
      ))}
    </div>
  );
};

export default Feed;
