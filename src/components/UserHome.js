import { Switch, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';

import UserNav from './layout/UserNav';
import UserDashboard from './UserDashboard';
import CompanyForm from './CompanyForm';
import Company from './pages/Company';
import Companies from './pages/Companies';
import Profile from './pages/Profile';
import Strategy from './pages/Strategy';
import Locations from './pages/Locations';
import Location from './pages/Location';

const queryClient = new QueryClient();

const UserHome = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="grid grid-cols-5 min-h-screen">
        <UserNav />
        <div className="col-span-4">
          <Switch>
            <Route path="/" exact>
              <UserDashboard />
            </Route>
            <Route path="/entities/new">
              <CompanyForm />
            </Route>
            <Route path="/entities" exact>
              <Companies />
            </Route>
            <Route path="/entities/:id">
              <Company />
            </Route>
            <Route path="/profiles">
              <Profile />
            </Route>
            <Route path="/profiles/:id">
              <Profile />
            </Route>
            <Route path="/strategies/:id">
              <Strategy />
            </Route>
            <Route path="/locations/:id">
              <Location />
            </Route>
            <Route path="/locations">
              <Locations />
            </Route>
          </Switch>
        </div>
      </div>
    </QueryClientProvider>
  );
};
export default UserHome;
