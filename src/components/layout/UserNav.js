import { NavLink } from "react-router-dom";

import AuthService from "../../services/AuthService";

const authService = new AuthService();

const UserNav = () => {
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

        <div className="flex justify-end">
          <button className="p-2 text-xl" onClick={logout}>
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
};

export default UserNav;
