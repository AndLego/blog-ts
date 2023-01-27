import React from "react";
import { Blog, CommentProps, EditBlog, ProviderProps } from "../@types/blog";

interface APIContextProps {
  blogData: Blog[];
  addPost: (post: Blog) => void;
  editPost: (editedPost: EditBlog) => void;
  deletePost: (id: string | number) => void;
  addComment: (postId: string | number, message: CommentProps) => void;
}

const APIContext = React.createContext<APIContextProps>({} as APIContextProps);

const BlogAPIProvider = ({ children }: ProviderProps) => {
  const blogData: Blog[] = [
    {
      title: "¿Que es React?",
      slug: "que-es-react",
      content: "React es el mejor Framework de JavaScript, que lindo React",
      author: "Andrés Rodríguez",
      id: 1,
      published: new Date(1998, 11, 17).toLocaleDateString(),
      comments: [
        {
          id: 1,
          author: "Me",
          content: "randome coment",
          published: new Date().toLocaleDateString(),
        },
      ],
    },
    {
      title: "¿Que es Angular?",
      slug: "que-es-angular",
      content: "Angular esta bien, que lindo React XD",
      author: "Carlos Rodríguez",
      id: 2,
      published: new Date(1995, 11, 17).toLocaleDateString(),
      comments: [],
    },
    {
      title: "¿Que es Svelte?",
      slug: "que-es-svelte",
      content: "Svelte es el mejor Framework de JavaScript, que lindo Svelte",
      author: "Felipe Rodríguez",
      id: 3,
      published: new Date(1996, 11, 17).toLocaleDateString(),
      comments: [],
    },
  ];

  const addPost = (post: Blog) => {
    const existingPost = blogData.find((item) => item.slug === post.slug);
    const newPost: Blog = {
      title: post.title,
      slug: post.slug,
      content: post.content,
      author: post.author,
      published: post.published,
      id: post.id,
    };

    if (existingPost) {
      alert("ya existe un post con ese titulo");
    }

    blogData.push(newPost);
    console.log("post creado");
  };

  const deletePost = (id: string | number) => {
    const post = blogData.findIndex((post) => post.id === id);
    if (post !== -1) {
      blogData.splice(post, 1);
    }
    console.log("post deleted");
  };

  const editPost = (editedPost: EditBlog) => {
    // const post = blogData.find((post) => post.id === id);
    blogData.find((post) => {
      if (post.id === editedPost.id) {
        post.title = editedPost.title;
        post.slug = editedPost.slug;
        post.content = editedPost.content;
      }
    });
  };

  const addComment = (postId: string | number, message: CommentProps) => {
    blogData.find((post) => {
      if (post.id === postId) {
        post.comments?.push(message);
      }
    });
  };

  const data = { blogData, addPost, deletePost, editPost, addComment };

  return <APIContext.Provider value={data}>{children}</APIContext.Provider>;
};

/**
 * hook para evitar importar context en cada pagina que se necesite
 */

function useAPI() {
  const data = React.useContext(APIContext);
  return data;
}

export { BlogAPIProvider, useAPI };
