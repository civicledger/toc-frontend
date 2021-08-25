import { Switch, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';

import GuestDashboard from './GuestDashboard';
import Feed from './activities/Feed';

const queryClient = new QueryClient();

const GuestHome = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="container mx-auto">
        <Switch>
          <Route path="/" exact>
            <GuestDashboard />
          </Route>
        </Switch>
      </div>
    </QueryClientProvider>
  );
};

export default GuestHome;
