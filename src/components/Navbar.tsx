import { logs, routes } from "./routes";
import { NavLink, useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import notebook from "../assets/notebook.svg";

import styles from "../styles/navbar.module.css";
import { useAPI } from "../utils/blogAPI";

const Navbar = () => {
  const { user } = useAPI();

  const location = useLocation();

  return (
    <nav className={styles.nav}>
      <Link to="/">
        <div>
          <img src={notebook} alt="logo" />
          <p>LeBlog</p>
        </div>
      </Link>
      <ul className={styles.menu}>
        {routes.map((route) => {
          if (route.publicOnly && user) return null;
          if (route.private && !user) return null;
          return (
            <li key={route.id}>
              <NavLink
                key={route.id}
                to={route.to}
                style={({ isActive }) => ({
                  color: isActive ? "#FB6D17" : "#3f3f3f",
                })}
              >
                {route.text}
              </NavLink>
            </li>
          );
        })}
      </ul>
      <ul className={styles.logs}>
        {logs.map((route) => {
          if (route.publicOnly && user) return null;
          if (route.private && !user) return null;
          if (route.to === "/logIn") {
            return (
              <NavLink
                key={route.id}
                to={route.to}
                state={{ redirectTo: location }}
              >
                {route.text}
              </NavLink>
            );
          }
          return (
            <li key={route.id}>
              <NavLink key={route.id} to={route.to}>
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
