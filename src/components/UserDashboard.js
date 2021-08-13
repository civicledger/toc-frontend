import { useContext } from 'react';
import { Link } from 'react-router-dom';

import { LoginContext } from '../utilities/reducers';

const UserDashboard = () => {
  const {
    login: { user },
  } = useContext(LoginContext);

  if (!user) return '';

  return (
    <div className="flex">
      <div className="w-full p-10 max-w-md m-auto rounded-lg border border-primary grid grid-cols-1">
        <div className="flex justify-between">
          <h2 className="text-xl font-semibold">User:</h2>
          <h2 className="text-xl">{user.email}</h2>
        </div>
      </div>
    </div>
  );
};
export default UserDashboard;
