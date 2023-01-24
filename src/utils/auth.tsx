import React from "react";
import { useNavigate } from "react-router-dom";
import { ProviderProps, ROL, Roles, User } from "../@types/blog";

const AuthContext = React.createContext({});

const defaultRoles: Roles = {
  [ROL.ADMIN]: {
    write: true,
    read: true,
    delete: true,
  },
  [ROL.EDITOR]: {
    write: true,
    read: true,
    delete: false,
  },
  [ROL.VISITOR]: {
    write: false,
    read: true,
    delete: false,
  },
};

const defaultUsers: User[] = [
  {
    username: "Andres",
    rol: ROL.ADMIN,
  },
  {
    username: "Felipe",
    rol: ROL.EDITOR,
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
      : setUser({ username: username || "Anonimo", rol: ROL.VISITOR });
  };

  const logOut = () => {
    setUser(null);
    navigate("/");
  };

  const auth = { user, login, logOut };

  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
};
