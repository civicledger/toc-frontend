import { useContext } from "react";
import { Link } from "react-router-dom";

import { LoginContext } from "../utilities/reducers";

const UserDashboard = () => {
  const {
    login: { user },
  } = useContext(LoginContext);

  if (!user) return "";

  return (
    <div className="flex min-h-screen">
      <div className="w-full p-10 max-w-md m-auto rounded-lg border border-primary grid grid-cols-1">
        <div className="flex justify-between">
          <h2 className="text-xl font-semibold">User:</h2>
          <h2 className="text-xl">{user.email}</h2>
        </div>
        <div className="flex justify-center mt-6">
          <Link
            className="bg-gradient-to-r from-blue-400 to-blue-500 py-2 px-4 text-sm text-white rounded border border-gray-200 focus:outline-none"
            to="/entities/new"
          >
            Create an Entity
          </Link>
        </div>
      </div>
    </div>
  );
};
export default UserDashboard;
