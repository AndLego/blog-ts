import React from "react";
import { Blog, CommentProps, EditBlog, ProviderProps } from "../@types/blog";
import { blogData } from "../utils/blogData";

interface APIContextProps {
  fakeApi: Blog[];
  addPost: (post: Blog) => void;
  editPost: (editedPost: EditBlog) => void;
  deletePost: (id: string | number) => void;
  addComment: (postId: string, message: CommentProps) => void;
  deleteComment: (postId: string, message: CommentProps) => void;
}

const APIContext = React.createContext<APIContextProps>({} as APIContextProps);

const BlogAPIProvider = ({ children }: ProviderProps) => {
  const [fakeApi, setFakeApi] = React.useState(blogData);

  const addPost = (post: Blog) => {
    const oldPost = fakeApi.findIndex((old) => old.slug === post.slug);
    const newPost: Blog = {
      title: post.title,
      slug: post.slug,
      content: post.content,
      author: post.author,
      published: post.published,
      id: post.id,
      comments: [],
    };

    if (oldPost) {
      alert("ya existe un post con ese titulo");
      return;
    }

    setFakeApi([...fakeApi, newPost]);
    console.log("post creado");
  };

  const deletePost = (id: string | number) => {
    const post = fakeApi.findIndex((post) => post.id === id);
    if (post !== -1) {
      fakeApi.splice(post, 1);
    }
    console.log("post deleted");
  };

  const editPost = (editedPost: EditBlog) => {
    fakeApi.find((post) => {
      if (post.id === editedPost.id) {
        post.title = editedPost.title;
        post.slug = editedPost.slug;
        post.content = editedPost.content;
      }
    });
  };

  /**Comments handler */

  const addComment = (postId: string | number, message: CommentProps) => {
    const postIndex = fakeApi.findIndex((post) => post.id === postId);
    if (postIndex !== -1) {
      const post = fakeApi[postIndex];
      setFakeApi([
        ...fakeApi.slice(0, postIndex),
        {
          ...post,
          comments: post.comments ? [...post.comments, message] : [message],
        },
        ...fakeApi.slice(postIndex + 1),
      ]);
    }
  };

  const deleteComment = (postId: string | number, messageID: string) => {
    const postIndex = fakeApi.findIndex((post) => post.id === postId);
    if (postIndex !== -1) {
      const commentIndex = fakeApi[postIndex].comments?.findIndex(
        (comment) => comment.id === messageID
      );
      const comment = fakeApi[postIndex].comments?[commentIndex]
      
      if (commentIndex !== -1) {
        fakeApi[postIndex].comments?.splice(commentIndex, 1);
      }
    }
  };

  const data = { fakeApi, addPost, deletePost, editPost, addComment };

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
