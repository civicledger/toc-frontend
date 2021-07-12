import { NavLink } from "react-router-dom";
const Nav = () => {
  return (
    <nav>
      <NavLink to="/" exact>Home</NavLink>
      <NavLink to="/Login" exact>Login</NavLink>
      <NavLink to="/Signup" exact>Signup</NavLink>
    </nav>
  );
};

export default Nav;
