import { useQuery } from 'react-query';
import { activitiesQuery } from '../../utilities/queries';

const Feed = () => {
  const { data: activities } = useQuery('activities', activitiesQuery, {
    keepPreviousData: true,
  });

  if (!activities) return <></>;

  return (
    <>
      <div>
        <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl mb-10">Activity Feed</h2>
        {activities.map(activity => (
          <div key={activity.id} className="mb-10 border shadow p-10">
            {activity.name}
          </div>
        ))}
      </div>
    </>
  );
};

export default Feed;
