/**
 * types Blog
 */

export interface Blog {
  title: string;
  slug: string;
  content: string;
  author: string;
  id: string | number;
}

/**
 * interface context provider
 */

export interface ProviderProps {
  children: JSX.Element | JSX.Element[];
}

/**
 * types auth
 */

export enum ROL {
  ADMIN = "admin",
  EDITOR = "editor",
  VISITOR = "visitor",
}

export interface Rol {
  write: boolean;
  read: boolean;
  delete: boolean;
}

export interface Roles {
  [ROL.ADMIN]: Rol;
  [ROL.EDITOR]: Rol;
  [ROL.VISITOR]: Rol;
}

export interface User {
  username: string;
  rol: ROL;
}