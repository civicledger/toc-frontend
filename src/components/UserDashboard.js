import { useContext } from 'react';

import { LoginContext } from '../utilities/reducers';

import Feed from './activities/Feed';

const UserDashboard = () => {
  const {
    login: { user },
  } = useContext(LoginContext);

  if (!user) return '';

  return (
    <div className="flex">
      <div className="w-full p-10">
        <Feed />
      </div>
    </div>
  );
};
export default UserDashboard;
