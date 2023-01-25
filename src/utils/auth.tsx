import React from "react";
import { useNavigate, Navigate } from "react-router-dom";
import { ProviderProps, Role, User } from "../@types/blog";

interface AuthContextProps {
  user: User | null;
  login: (username: string | undefined) => void;
  logOut: () => void;
}

const AuthContext = React.createContext<AuthContextProps>(
  {} as AuthContextProps
);

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

const AuthProvider = ({ children }: ProviderProps) => {
  const [user, setUser] = React.useState<User | null>(null);
  const navigate = useNavigate();

  const login = (username: string | undefined) => {
    //revisar si el usuario existe, de lo contrario lo crea como visitante
    const rol = defaultUsers.find((user) => user.username === username);
    rol !== undefined
      ? setUser(rol)
      : setUser({ username: username || "Anonimo", rol: defaultRoles.visitor });
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

  if (!user) {
    return <Navigate to="/login" />;
  }
  return <>{children}</>;
}

export { AuthProvider, useAuth, defaultUsers, AuthRoute };
