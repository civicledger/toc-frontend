import { useReducer } from 'react';

import { AuthService } from './services/AuthService';
import { loginReducer, LoginContext } from './utilities/reducers';
import './assets/output.css';
import UserHome from './components/UserHome';
import GuestHome from './components/GuestHome';

function App() {
  const [login, dispatch] = useReducer(loginReducer, AuthService.getLoggedInUser());
  return (
    <LoginContext.Provider value={{ login, dispatch }}>
      <>
        {login.loggedIn && <UserHome />}
        {!login.loggedIn && <GuestHome />}
      </>
    </LoginContext.Provider>
  );
}

export default App;
