import React from "react";
import { Blog, CommentProps, EditBlog, ID, ProviderProps, User } from "../@types/blog";
import { blogData } from "../utils/blogData";
import { collection, query, where, getDocs, doc, setDoc, addDoc } from "firebase/firestore/lite";
import { db } from "../../firebaseConfig";
import { useNavigate } from "react-router-dom";

interface APIContextProps {
  fakeApi: Blog[];
  addPost: (title: string, content: string, author: string) => void;
  editPost: (editedPost: EditBlog) => void;
  deletePost: (id: string | number) => void;
  addComment: (postId: string | number, message: CommentProps) => void;
  deleteComment: (postId: string | number | undefined, messageID: string | number | undefined) => void;
  showModalPost: boolean;
  setShowModalPost: React.Dispatch<React.SetStateAction<boolean>>;
  postState: string;
  isLoading: boolean
}

const APIContext = React.createContext<APIContextProps>({} as APIContextProps);

const BlogAPIProvider = ({ children }: ProviderProps) => {
  const [fakeApi, setFakeApi] = React.useState(blogData);
  /**LOADING */
  const [isLoading, setLoading] = React.useState(false);

  /**show or hide modal */
  const [showModalPost, setShowModalPost] = React.useState(false)

  /**type of message in the modal */
  const [postState, setPostState] = React.useState("")

  const addPost = async (title: string, content: string, author: string) => {

    /**crear slug */
    const slug = title
      .replace(/[^\w\s]/gi, "")
      .split(" ")
      .join("-");

    /**revisa si existe un post con el slug nuevo */
    const oldPost = query(collection(db, 'posts'), where('slug', '==', slug));

    try {
      setLoading(true);

      const querySnapshot = await getDocs(oldPost);

      setLoading(false);

      // Verificar si existen documentos con el mismo slug
      if (!querySnapshot.empty) {
        setPostState("duplicate")
        setShowModalPost(true)
        return;
      }

      // Si no existen documentos con el mismo slug, crea el nuevo post
      const newPost: Blog = {
        title: title,
        slug: slug,
        content: content,
        author: author,
        published: new Date().toLocaleDateString(),
        comments: [],
      };

      /**añade post a firebase */
      await addDoc(collection(db, 'posts'), newPost);

      setPostState("success")

    } catch (error) {
      setLoading(false);
      setPostState("error")
      console.error('Error al agregar el post:', error);
    }
    setShowModalPost(true)
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

  const addComment = (postId: ID, message: CommentProps) => {

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

  const deleteComment = (postId: string | number | undefined, messageID: string | number | undefined) => {
    setFakeApi((prevFakeApi) =>
      prevFakeApi.map((post) => {
        if (post.id === postId) {
          const updatedComments = post.comments?.filter(
            (comment) => comment.id !== messageID
          );
          return {
            ...post,
            comments: updatedComments,
          };
        }
        return post;
      })
    );

    console.log("Comentario eliminado");
  };

  const data = {
    fakeApi,
    addPost,
    deletePost,
    editPost,
    addComment,
    deleteComment,
    showModalPost,
    setShowModalPost,
    postState,
    isLoading
  };

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
