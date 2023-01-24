import React from "react";
import { Blog, ProviderProps } from "../@types/blog";

interface APIContextProps {
  blogData: Blog[];
  addPost: (post: Blog) => void;
  //   deletePost: (id: number) => void;
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
    },
    {
      title: "¿Que es Angular?",
      slug: "que-es-angular",
      content: "Angular esta bien, que lindo React XD",
      author: "Carlos Rodríguez",
      id: 2,
    },
    {
      title: "¿Que es Svelte?",
      slug: "que-es-svelte",
      content: "Svelte es el mejor Framework de JavaScript, que lindo Svelte",
      author: "Felipe Rodríguez",
      id: 3,
    },
  ];

  const addPost = (post: Blog) => {
    const existingPost = blogData.find((item) => item.slug === post.slug);
    const newPost: Blog = {
      title: post.title,
      slug: post.slug,
      content: post.content,
      author: post.content,
      id: post.id,
    };

    if (existingPost) {
      alert("ya existe un post con ese nombre");
    }

    blogData.push(newPost);
    console.log("post creado");
  };

  const data = { blogData, addPost };

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
