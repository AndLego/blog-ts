/**
 * types Blog
 */

export interface CommentProps {
  id: string | number,
  author: string,
  content: string,
  published: string
}

export interface Blog {
  title: string;
  slug: string;
  content: string;
  author: string;
  id: string | number;
  published?: string
  comments?: CommentProps[]
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