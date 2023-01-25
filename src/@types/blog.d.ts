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

export interface EditBlog extends Omit<Blog, "author"> { }

/**
 * interface context provider
 */

export interface ProviderProps {
  children: JSX.Element | JSX.Element[];
}

/**
 * types auth
 */

export interface Role {
  write: boolean,
  read: boolean,
  delete: boolean,
}

export interface User {
  username: string,
  rol: Role
}