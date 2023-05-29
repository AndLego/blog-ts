/**
 * types Blog
 */

import { actionType } from "../reducer/usersDatareducer";

export type ID = number | string | undefined;

export interface CommentProps {
  id: string | number,
  author: string,
  content: string,
  published: string,
  timeFormated: string
}

export interface Blog {
  title: string;
  slug: string;
  content: string;
  author: string;
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
  name: string,
  permissions: RoleDetail
}

export interface RoleDetail {
  write: boolean;
  read: boolean;
  delete: boolean;
}

export interface User {
  username: string,
  rol: Role,
  id: string | number
}

/**reducer types */
interface CREATE_USER {
  type: typeof actionType.CREATE_USER,
  payload: User
}

export type Action = CREATE_USER
// | ADD_POST | REMOVE_POST | ADD_COMMENT | REMOVE_COMMENT

export interface ExtendedUser extends User {
  posts?: {
    id: string | number,
    slug: string
  }[]

}