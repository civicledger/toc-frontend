import { useReducer } from "react";

import AuthService from "./services/AuthService";
import { loginReducer, LoginContext } from "./utilities/reducers";
import "./assets/output.css";
import Home from "./components/Home";

function App() {
  const [login, dispatch] = useReducer(
    loginReducer,
    AuthService.getLoggedInUser()
  );
  return (
    <LoginContext.Provider value={{ login, dispatch }}>
      <>
        <Home />
      </>
    </LoginContext.Provider>
  );
}

export default App;
