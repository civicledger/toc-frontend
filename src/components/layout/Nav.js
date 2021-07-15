import { NavLink } from "react-router-dom";
const Nav = () => {
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
      </div>
    </nav>
  );
};

export default Nav;