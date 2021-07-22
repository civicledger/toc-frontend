import { Switch, Route } from "react-router-dom";

import UserNav from "./layout/UserNav";
import UserDashboard from "./UserDashboard";
import EntityForm from "./EntityForm";
import Entity from "./Entity";
import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient();

const UserHome = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="container mx-auto">
        <UserNav />
        <Switch>
          <Route path="/" exact>
            <UserDashboard />
          </Route>
          <Route path="/entities/new">
            <EntityForm />
          </Route>
          <Route path="/entities/:id">
            <Entity />
          </Route>
        </Switch>
      </div>
    </QueryClientProvider>
  );
};

export default UserHome;
