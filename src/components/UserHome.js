import { Switch, Route } from "react-router-dom";

import UserNav from "./layout/UserNav";
import UserDashboard from "./UserDashboard";

const UserHome = () => {
  return (
    <div className="container mx-auto">
      <UserNav />
      <Switch>
        <Route path="/" exact>
          <UserDashboard />
        </Route>
      </Switch>
    </div>
  );
};

export default UserHome;
