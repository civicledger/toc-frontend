import { NavLink } from "react-router-dom";
import { useContext } from "react";

import { LoginContext } from "../../utilities/reducers";
import AuthService from "../../services/AuthService";

const authService = new AuthService();

const Nav = () => {
  const {
    login: { user },
  } = useContext(LoginContext);

  const logout = () => {
    authService.logout();
    window.location.href = "/";
  };

  return (
    <nav className="bg-gradient-to-r from-blue-500 via-blue-400 to-blue-500">
      <div className="p-2 text-xl text-white grid grid-cols-2 flex justify-between">
        <div className="flex justify-start">
          <div className="p-2">
            <NavLink to="/" exact>
              Home
            </NavLink>
          </div>
        </div>
        {!user && (
          <div className="flex justify-end">
            <div className="p-2 text-xl">
              <NavLink to="/login" exact>
                Login
              </NavLink>
            </div>
            <div className="p-2 text-xl">
              <NavLink to="/signup" exact>
                Sign up
              </NavLink>
            </div>
          </div>
        )}
        {user && (
          <div className="flex justify-end">
            <button className="p-2 text-xl" onClick={logout}>
              Logout
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Nav;
