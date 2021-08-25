import { useQuery } from 'react-query';
import { activitiesQuery } from '../../utilities/queries';
import CreateStrategyFeed from './NewStrategyFeed';

const Feed = () => {
  const { data: activities } = useQuery(['activities'], () => activitiesQuery(), {
    keepPreviousData: true,
  });

  if (!activities) return <></>;

  return (
    <div className="bg-white shadow overflow-hidden sm:rounded-lg m-4">
      {activities.map(activity => (
        <>{activity.event === 'CreateStrategy' && <CreateStrategyFeed activity={activity} />}</>
      ))}
    </div>
  );
};

export default Feed;
