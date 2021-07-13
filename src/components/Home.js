import Nav from "./layout/Nav";
import { Switch, Route } from "react-router-dom";
import Login from "../components/Login";

const Home = () => {
  return (
    <div className="container mx-auto">
      <Nav />
      <Switch>
        <Route path="/" exact></Route>
        <Route path="/login" exact>
          <Login />
        </Route>
      </Switch>
    </div>
  );
};

export default Home;
