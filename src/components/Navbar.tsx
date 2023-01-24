import { routes } from "./routes";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <nav>
      <ul>
        {routes.map((route) => (
          <li key={route.id}>
            <NavLink
              key={route.id}
              to={route.to}
              style={({ isActive }) => ({
                color: isActive ? "red" : "blue",
              })}
            >
              {route.text}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Navbar;
