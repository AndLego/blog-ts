import React from "react";
import { Blog, CommentProps, EditBlog, ProviderProps, User } from "../@types/blog";
import { collection, query, where, getDocs, doc, addDoc, updateDoc, deleteDoc, getDoc, arrayUnion, arrayRemove } from "firebase/firestore/lite";
import { db } from "../../firebaseConfig";
import { Navigate, useLocation } from "react-router-dom";

interface APIContextProps {
  postsArray: Blog[];
  addPost: (title: string, content: string, author: string) => void;
  editPost: (editedPost: EditBlog) => void;
  deletePost: (slug: string) => void;
  addComment: (postSlug: string, message: CommentProps) => void;
  deleteComment: (postSlug: string, messageID: string | number | undefined) => void;
  showModalPost: boolean;
  setShowModalPost: React.Dispatch<React.SetStateAction<boolean>>;
  postState: string;
  isLoading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setPostState: React.Dispatch<React.SetStateAction<string>>;
  getPosts: () => void;
  postAdded: boolean;
  registerUser: (newUser: User) => Promise<void>;
  login: (username: string | undefined) => Promise<void>;
  logOut: () => void;
  user: User | null;
  getUserPosts: (username: string) => Promise<string[] | null>;
  getFormattedDate: () => string;
}

// // Simular un error
// throw new Error("Simulated error");


const APIContext = React.createContext<APIContextProps>({} as APIContextProps);

const BlogAPIProvider = ({ children }: ProviderProps) => {
  /**datos */
  const [postsArray, setPostsArray] = React.useState<Blog[]>([]);

  /**LOADING */
  const [isLoading, setLoading] = React.useState(false);

  /**Actualizar base de datos */
  const [postAdded, setPostAdded] = React.useState(false);

  /**show or hide modal */
  const [showModalPost, setShowModalPost] = React.useState(false)

  /**type of message in the modal */
  const [postState, setPostState] = React.useState("")

  /**user state for login */
  const [user, setUser] = React.useState<User | null>(null);


  /**Get posts from firebase */
  const getPosts = async () => {
    setLoading(true);
    try {
      const postsCollection = collection(db, "posts");
      const querySnapshot = await getDocs(postsCollection);

      const postsArray: Blog[] = [];
      querySnapshot.forEach((post) => {
        const postData = post.data() as Blog;
        postsArray.push(postData);
      });

      setPostsArray(postsArray);
    } catch (error) {
      setLoading(false);
      setPostState("error")
      setShowModalPost(true)

      console.error("Error al obtener los posts:", error);
    } finally {
      setLoading(false);
    }
  };

  /**date format with hour */
  /**function to format published */
  function getFormattedDate() {
    const date = new Date();
    const year = date.getUTCFullYear();
    const month = (date.getUTCMonth() + 1).toString().padStart(2, "0");
    const day = date.getUTCDate().toString().padStart(2, "0");
    const hours = date.getUTCHours().toString().padStart(2, "0");
    const minutes = date.getUTCMinutes().toString().padStart(2, "0");
    const seconds = date.getUTCSeconds().toString().padStart(2, "0");

    return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}.000Z`;
  }

  /**funcion que crea un slug,  genera la coleccion si no existe y despues genera el nuevo
   * objeto en la database
   */
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

      // Verificar si existen documentos con el mismo slug
      if (!querySnapshot.empty) {
        setLoading(false);
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
        timeFormated: getFormattedDate(),
        comments: [],
      };

      /**añade post a firebase */
      await addDoc(collection(db, 'posts'), newPost);

      // Añadir el slug al usuario actual
      if (user) {
        const userCollection = collection(db, 'users');
        const querySnapshot = await getDocs(query(userCollection, where('username', '==', user.username)));
        if (!querySnapshot.empty) {
          const userDoc = querySnapshot.docs[0];
          const userId = userDoc.id;

          // Actualizar el campo 'posts' del usuario
          const userDocRef = doc(userCollection, userId);
          await updateDoc(userDocRef, {
            posts: arrayUnion(slug),
          });
        }
      }

      setPostState("success")

    } catch (error) {
      setLoading(false);
      setPostState("error")
      console.error('Error al agregar el post:', error);
    }
    setShowModalPost(true)
    setPostAdded(true)
  };

  /**funcion para editar los posts en la base de datos, busca la coleccion, hace match con
   * el objeto y luego lo actualiza
   */
  const editPost = async (editedPost: EditBlog) => {
    try {
      const postsCollection = collection(db, "posts");
      const querySnapshot = await getDocs(postsCollection);

      querySnapshot.forEach(async (post) => {
        if (post.data().slug === editedPost.slug) {
          const postId = post.id;
          const postRef = doc(db, "posts", postId);

          await updateDoc(postRef, {
            title: editedPost.title,
            slug: editedPost.slug,
            content: editedPost.content
          });
        }
      });


      // se llama la base de datos actualizada y se muestra modal
      getPosts();
      setPostState("updated")
      setShowModalPost(true)
    } catch (error) {
      setPostState("error")
      setShowModalPost(true)
      console.error("Error al editar el post:", error);
    }
  };

  /**funcion que elimina el post de la base de datos */
  const deletePost = async (slug: string) => {
    try {
      setLoading(true);

      const postsCollection = collection(db, "posts");
      const postQuery = await getDocs(postsCollection);
      const postDoc = postQuery.docs.find((doc) => doc.data().slug === slug);

      if (postDoc) {
        await deleteDoc(doc(postsCollection, postDoc.id));
        console.log("Post deleted from Firestore");

        // Buscar el usuario correspondiente al post
        const author = postDoc.data().author;
        const usersCollection = collection(db, 'users');
        const userQuerySnapshot = await getDocs(query(usersCollection, where('username', '==', author)));

        if (!userQuerySnapshot.empty) {
          const userDoc = userQuerySnapshot.docs[0];
          const userId = userDoc.id;

          // Actualizar el campo 'posts' del usuario
          const userDocRef = doc(usersCollection, userId);
          await updateDoc(userDocRef, {
            posts: arrayRemove(slug),
          });
        }

        // Obtener la base de datos actualizada y mostrar el modal
        getPosts();
        setPostState("deleted");
        setShowModalPost(true);
      } else {
        console.log("Post not found");
      }
    } catch (error) {
      setPostState("error");
      setShowModalPost(true);
      console.error("Error deleting post:", error);
    } finally {
      setLoading(false); // Desactivar el estado de carga
    }
  };



  /**Comments handler */

  /**funcion que añade comentario, busca el post en cuestion por el slug, revisa que exista
   * y añade el comenntario
   */
  const addComment = async (postSlug: string, message: CommentProps) => {
    try {
      setLoading(true); // Activar el estado de carga

      const postsCollection = collection(db, "posts");
      const postQuery = await getDocs(postsCollection);
      const postDoc = postQuery.docs.find((doc) => doc.data().slug === postSlug);

      if (postDoc) {
        const postRef = doc(postsCollection, postDoc.id);
        const postSnapshot = await getDoc(postRef);

        if (postSnapshot.exists()) {
          const postData = postSnapshot.data() as Blog;
          const updatedComments = postData.comments
            ? [...postData.comments, message]
            : [message];

          await updateDoc(postRef, { comments: updatedComments });
          console.log("Comment added to Firestore");

          // Actualizar los posts desde Firebase
          getPosts();
          setPostState("comment");
          setShowModalPost(true);
        } else {
          console.log("Post not found");
        }
      } else {
        console.log("Post not found");
      }
    } catch (error) {
      setPostState("error");
      setShowModalPost(true);
      console.error("Error adding comment:", error);
    } finally {
      setLoading(false); // Desactivar el estado de carga
    }
  };

  /**funcion que busca el post por medio del slug, luego el cometnario por su id,
   * y lo elimina
   */
  const deleteComment = async (postSlug: string, messageID: string | number | undefined) => {
    try {
      setLoading(true); // Activar el estado de carga

      const postsCollection = collection(db, "posts");
      const postQuery = query(postsCollection, where("slug", "==", postSlug));
      const postQuerySnapshot = await getDocs(postQuery);

      if (!postQuerySnapshot.empty) {
        const postDoc = postQuerySnapshot.docs[0];
        const postData = postDoc.data() as Blog;

        const comments = postData.comments || []; // Comprobación adicional para asegurarse de que comments no sea undefined
        const updatedComments = comments.filter((comment) => comment.id !== messageID);

        await updateDoc(postDoc.ref, { comments: updatedComments });

        // Actualizar los posts desde Firebase
        getPosts();
        setPostState("commentDeleted");
        setShowModalPost(true);
      } else {
        console.log("Post not found para eliminar");
      }
    } catch (error) {
      setPostState("error");
      setShowModalPost(true);
      console.error("Error deleting comment:", error);
    } finally {
      setLoading(false); // Desactivar el estado de carga
    }
  };

  /**users handler */

  /**funcion que registra al usuario en la basee datos en la coleccion users, si encuentra
   * un duplicado regresa un modal dando el error
   */
  const registerUser = async (newUser: User) => {
    setLoading(true)

    try {
      // Verificar si el usuario ya existe en la colección "users"
      const usersCollection = collection(db, "users");
      const querySnapshot = await getDocs(query(usersCollection, where("username", "==", newUser.username)));

      if (!querySnapshot.empty) {
        setLoading(false);
        setPostState("userDuplicated");
        setShowModalPost(true);
        return;
      }

      // Agregar el nuevo usuario a la colección "users"
      await addDoc(usersCollection, newUser);

      setPostState("userCreated");
      setShowModalPost(true);
    } catch (error) {
      setPostState("error");
      setShowModalPost(true);
      console.error("Error creating user:", error);
    } finally {
      setLoading(false);
    }
  };

  const login = async (username: string | undefined) => {
    setLoading(true)

    try {
      // Verificar si el usuario existe en la colección "users"
      const usersCollection = collection(db, 'users');
      const querySnapshot = await getDocs(query(usersCollection, where('username', '==', username)));

      if (!querySnapshot.empty) {
        // Usuario encontrado, establecer el estado del usuario
        const userData = querySnapshot.docs[0].data() as User;
        setUser(userData);

        setPostState("login");
        setShowModalPost(true);
      } else {
        setPostState("register");
        setShowModalPost(true);

      }
    } catch (error) {
      setPostState("error");
      setShowModalPost(true);
      console.error('Error logging in:', error);
    } finally {
      setLoading(false);
    }
  };

  const logOut = () => {
    setUser(null);
    setPostState("logout");
    setShowModalPost(true);
  };

  /**funcion que trae los posts del usuario actual */
  const getUserPosts = async (username: string) => {
    try {
      setLoading(true);

      const userCollection = collection(db, 'users');
      const querySnapshot = await getDocs(query(userCollection, where('username', '==', username)));

      if (!querySnapshot.empty) {
        const userDoc = querySnapshot.docs[0];
        const userData = userDoc.data();
        const posts = userData.posts || [];
        setLoading(false);
        return posts;
      } else {
        setLoading(false);
        return [];
      }
    } catch (error) {
      setLoading(false);
      console.error('Error al obtener los posts del usuario:', error);
      return null;
    }
  };


  const data = {
    postsArray,
    addPost,
    deletePost,
    editPost,
    addComment,
    deleteComment,
    showModalPost,
    setShowModalPost,
    postState,
    setPostState,
    isLoading,
    setLoading,
    getPosts,
    postAdded,
    registerUser,
    login,
    logOut,
    user,
    getUserPosts,
    getFormattedDate
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

/**
 * redireccion al login si no hay un usuario registrado
 */

function AuthRoute({ children }: ProviderProps) {
  const { user } = useAPI();
  const location = useLocation();

  if (!user) {
    return <Navigate to="/login" replace state={{ redirectTo: location }} />;
  }

  return <>{children}</>;
}

export { BlogAPIProvider, useAPI, AuthRoute };
