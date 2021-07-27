import { Switch, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";

import UserNav from "./layout/UserNav";
import UserDashboard from "./UserDashboard";
import CompanyForm from "./CompanyForm";
import Company from "./Company";
import Companies from "./pages/Companies";

const queryClient = new QueryClient();

const UserHome = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="grid grid-cols-5 min-h-screen">
        <UserNav />
        <div className="p-10 col-span-4">
          <Switch>
            <Route path="/" exact>
              <UserDashboard />
            </Route>
            <Route path="/entities/new">
              <CompanyForm />
            </Route>
            <Route path="/entities">
              <Companies />
            </Route>
            <Route path="/entities/:id">
              <Company />
            </Route>
          </Switch>
        </div>
      </div>
    </QueryClientProvider>
  );
};
export default UserHome;
