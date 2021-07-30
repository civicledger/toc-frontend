import { NavLink } from "react-router-dom";

const GuestNav = () => {
  return (
    <nav className="bg-white">
      <div className="p-2 text-xl text-gray-700 grid grid-cols-2 flex justify-between border-b border-l border-r">
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

export default GuestNav;
