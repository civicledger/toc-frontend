import { Switch, Route } from 'react-router-dom';

import GuestNav from './layout/GuestNav';
import LoginModal from '../components/layout/LoginModal';
import SignupModal from '../components/layout/SignupModal';
import GuestDashboard from './GuestDashboard';

const GuestHome = () => {
  return (
    <div className="container mx-auto">
      <GuestNav />
      <LoginModal />
      <SignupModal />
      <Switch>
        <Route path="/" exact>
          <GuestDashboard />
        </Route>
      </Switch>
    </div>
  );
};

export default GuestHome;
