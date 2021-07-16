import { Switch, Route } from "react-router-dom";

import GuestNav from "./layout/GuestNav";
import Login from "../components/Login";
import Signup from "../components/Signup";
import GuestDashboard from "./GuestDashboard";

const GuestHome = () => {
  return (
    <div className="container mx-auto">
      <GuestNav />
      <Switch>
        <Route path="/" exact>
          <GuestDashboard />
        </Route>
        <Route path="/login" exact>
          <Login />
        </Route>
        <Route path="/signup" exact>
          <Signup />
        </Route>
      </Switch>
    </div>
  );
};

export default GuestHome;
