import Nav from "./layout/Nav";
import { Switch, useLocation, Route } from "react-router-dom";
import Login from "../components/Login";

const Home = () => {
  const location = useLocation();
  return (
    <div className="App container mx-auto min-h-screen flex flex-col">
      <Nav />
      <Switch location={location} key={location.key}>
        <Route path="/" exact></Route>
        <Route path="/login/" exact>
          <Login />
        </Route>
      </Switch>
    </div>
  );
};

export default Home;
