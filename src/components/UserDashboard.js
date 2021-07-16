import { useContext } from "react";

import { LoginContext } from "../utilities/reducers";

const UserDashboard = () => {
  const {
    login: { user },
  } = useContext(LoginContext);

  if (!user) return "";

  return (
    <div className="flex min-h-screen">
      <div className="w-full p-10 max-w-md m-auto rounded-lg border border-primary flex justify-between">
        <h2 className="text-xl font-semibold">User:</h2>
        <h2 className="text-xl">{user.email}</h2>
      </div>
    </div>
  );
};
export default UserDashboard;
