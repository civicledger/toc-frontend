import { useQuery } from 'react-query';
import { activitiesQuery } from '../../utilities/queries';
import StrategyActivity from './StrategyActivity';
import OutcomeActivity from './OutcomeActivity';
import { compareDesc } from 'date-fns';

const Feed = () => {
  const { data: activities } = useQuery('activities', activitiesQuery, {
    keepPreviousData: true,
  });

  if (!activities) return <></>;

  const sortedActivities = activities.sort((a, b) => compareDesc(new Date(a.createdAt), new Date(b.createdAt)));

  return (
    <div>
      <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl mb-10">Activity Feed</h2>
      {sortedActivities.map(selectTemplate)}
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
