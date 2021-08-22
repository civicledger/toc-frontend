import { Switch, Route } from 'react-router-dom';

import GuestDashboard from './GuestDashboard';

const GuestHome = () => {
  return (
    <div className="container mx-auto">
      <Switch>
        <Route path="/" exact>
          <GuestDashboard />
        </Route>
      </Switch>
    </div>
  );
};

export default GuestHome;
