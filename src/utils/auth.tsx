import React from "react";
import { useNavigate, Navigate, useLocation } from "react-router-dom";
import { ProviderProps, User } from "../@types/blog";
import { defaultRoles, blogUsers } from "./blogData";

interface AuthContextProps {
  user: User | null;
  login: (username: string | undefined) => void;
  logOut: () => void;
  registerUser: (newUser: User) => void
}
/**Context */
const AuthContext = React.createContext<AuthContextProps>(
  {} as AuthContextProps
);

/**Provider */
const AuthProvider = ({ children }: ProviderProps) => {
  const [user, setUser] = React.useState<User | null>(null);
  const [usersData, setUsersData] = React.useState(blogUsers)
  const navigate = useNavigate();
  const { state: locationState } = useLocation();

  type RedirectLocationState = {
    redirectTo: Location;
  };

  const login = (username: string | undefined) => {

    //revisar si el usuario existe, de lo contrario lo crea como visitante
    const rol = usersData.find((user) => user.username === username);


    if (rol !== undefined) {
      setUser(rol)

      if (locationState) {
        const { redirectTo } = locationState as RedirectLocationState;
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
  const registerUser = (newUser: User) => {
    const existingUserId = usersData.findIndex(user => user.username === newUser.username)
    if (existingUserId === -1) {
      setUsersData([...usersData, newUser])

      setUser(newUser)
      navigate("/profile", { replace: true });

      console.log("User Created")
    } else {
      alert("User already exist")
    }
  }

  const auth = { user, login, logOut, registerUser };

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

export { AuthProvider, useAuth, blogUsers, AuthRoute };
