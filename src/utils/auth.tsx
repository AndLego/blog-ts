import React from "react";
import { useNavigate, Navigate, useLocation, redirect } from "react-router-dom";
import { ExtendedUser, ProviderProps, User } from "../@types/blog";
import { actionType, initialState, userDataReducer } from "../reducer/usersDatareducer";

interface AuthContextProps {
  user: User | null;
  login: (username: string | undefined) => void;
  logOut: () => void;
  registerUser: (newUser: ExtendedUser) => void;
  userState: ExtendedUser[]
}
/**Context */
const AuthContext = React.createContext<AuthContextProps>(
  {} as AuthContextProps
);

/**Provider */
const AuthProvider = ({ children }: ProviderProps) => {
  const [user, setUser] = React.useState<User | null>(null);

  const [userState, dispatch] = React.useReducer(userDataReducer, initialState)

  const navigate = useNavigate();
  const { state: locationState } = useLocation();

  type RedirectLocationState = {
    redirectTo: Location;
  };

  const login = (username: string | undefined) => {

    //revisar si el usuario existe, de lo contrario lo crea como visitante
    const rol = userState.find((user) => user.username === username);


    /* This code block is handling the login functionality. It checks if the user exists in the
    `usersData` array, and if it does, it sets the user in the state using `setUser(rol)`. It also
    checks if there is a `redirectTo` location state, and if there is, it redirects the user to that
    location. If there is no `redirectTo` state, it redirects the user to the `/profile` page. If the
    user does not exist in the `usersData` array, it alerts the user to register and redirects them
    to the `/register` page. */
    if (rol !== undefined) {
      setUser(rol)

      if (locationState) {
        const { redirectTo } = locationState as RedirectLocationState;

        redirectTo.pathname === "/register" ?
          navigate("/profile", { replace: true }) :
          navigate(`${redirectTo.pathname}${redirectTo.search}`);

      } else {
        navigate("/profile", { replace: true });
      }

    } else {
      alert("Please Register")
      navigate("/register", { replace: true });
    }
  };

  const logOut = () => {
    setUser(null);
    navigate("/");
  };

  /**user registers */

  /**revisa si el usuario existe, de no ser asi lo ingresa al sistema, de lo contrario
   * devuelve un mensaje
   */
  const registerUser = (newUser: ExtendedUser) => {
    const existingUserId = userState.findIndex(user => user.username === newUser.username)
    if (existingUserId === -1) {

      dispatch({
        type: actionType.CREATE_USER,
        payload: newUser
      })

      navigate("/profile", { replace: true });
      console.log("User Created")
    } else {
      alert("User already exist")
    }
  }

  const auth = { user, login, logOut, registerUser, userState };

  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
};

/**
 * hook para evitar importar context en cada pagina que se necesite
 */

function useAuth() {
  const auth = React.useContext(AuthContext);
  return auth;
}

/**
 * redireccion al login si no hay un usuario registrado
 */

function AuthRoute({ children }: ProviderProps) {
  const { user } = useAuth();
  const location = useLocation();

  if (!user) {
    return <Navigate to="/login" replace state={{ redirectTo: location }} />;
  }

  return <>{children}</>;
}

export { AuthProvider, useAuth, AuthRoute };
