import { Switch, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';

import UserNav from './layout/UserNav';
import UserDashboard from './UserDashboard';
import Company from './pages/Company';
import Companies from './pages/Companies';
import Profile from './pages/Profile';
import Strategy from './pages/Strategy';
import Places from './pages/Places';
import Place from './pages/Place';
import Outcome from './pages/Outcome';
import Initiative from './pages/Initiative';
import Definition from './pages/Definition';
import Feed from './activities/Feed';

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
            <Route path="/entities" exact>
              <Companies />
            </Route>
            <Route path="/entities/:id">
              <Company />
            </Route>
            <Route path="/profiles" exact>
              <Profile />
            </Route>
            <Route path="/profiles/:id">
              <Profile />
            </Route>
            <Route path="/strategies/:id">
              <Strategy />
            </Route>
            <Route path="/places/:place">
              <Place />
            </Route>
            <Route path="/places">
              <Places />
            </Route>
            <Route path="/outcomes/:id" exact>
              <Outcome />
            </Route>
            <Route path="/outcomes/:id/kpis/:definitionId">
              <Definition />
            </Route>
            <Route path="/initiatives/:id">
              <Initiative />
            </Route>
            <Route path="/feed">
              <Feed />
            </Route>
          </Switch>
        </div>
      </div>
    </QueryClientProvider>
  );
};
export default UserHome;
