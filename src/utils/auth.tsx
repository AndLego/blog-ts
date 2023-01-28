import React from "react";
import { useNavigate, Navigate, useLocation } from "react-router-dom";
import { ProviderProps, Role, User } from "../@types/blog";

interface AuthContextProps {
  user: User | null;
  login: (username: string | undefined) => void;
  logOut: () => void;
}
/**Context */
const AuthContext = React.createContext<AuthContextProps>(
  {} as AuthContextProps
);
/**hard code Data */
const defaultRoles: { [key: string]: Role } = {
  admin: {
    write: true,
    read: true,
    delete: true,
  },
  editor: {
    write: true,
    read: true,
    delete: false,
  },
  visitor: {
    write: false,
    read: true,
    delete: false,
  },
};

const defaultUsers: User[] = [
  {
    username: "Andres",
    rol: defaultRoles.admin,
  },
  {
    username: "Felipe",
    rol: defaultRoles.editor,
  },
];

/**Provider */
const AuthProvider = ({ children }: ProviderProps) => {
  const [user, setUser] = React.useState<User | null>(null);
  const navigate = useNavigate();
  const { state: locationState } = useLocation();

  type RedirectLocationState = {
    redirectTo: Location;
  };

  const login = (username: string | undefined) => {
    //revisar si el usuario existe, de lo contrario lo crea como visitante
    const rol = defaultUsers.find((user) => user.username === username);
    rol !== undefined
      ? setUser(rol)
      : setUser({ username: username || "Anonimo", rol: defaultRoles.visitor });

    if (locationState) {
      const { redirectTo } = locationState as RedirectLocationState;
      navigate(`${redirectTo.pathname}${redirectTo.search}`);
    }
  };

  const logOut = () => {
    setUser(null);
    navigate("/");
  };

  const auth = { user, login, logOut };

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

export { AuthProvider, useAuth, defaultUsers, AuthRoute };
