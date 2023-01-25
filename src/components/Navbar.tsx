import { routes } from "./routes";
import { NavLink } from "react-router-dom";
import { useAuth } from "../utils/auth";

const Navbar = () => {
  const { user } = useAuth();

  return (
    <nav>
      <ul>
        {routes.map((route) => {
          if (route.publicOnly && user) return null;
          if (route.private && !user) return null;
          return (
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
          );
        })}
      </ul>
    </nav>
  );
};

export default Navbar;
