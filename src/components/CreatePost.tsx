import React, { FormEvent } from "react";
import { v4 as uuidv4 } from "uuid";
import { Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "../utils/auth";
import { useAPI } from "../utils/blogAPI";

type CreatePostProps = {
  setShowModalPost: React.Dispatch<React.SetStateAction<boolean>>;
  showModalPost: boolean;
};

const CreatePost = ({ setShowModalPost, showModalPost }: CreatePostProps) => {
  const { user } = useAuth();
  const { addPost } = useAPI();
  const titleRef = React.useRef<HTMLInputElement>(null!);
  const contentRef = React.useRef<HTMLTextAreaElement>(null!);

  if (user?.rol.permissions.write !== true) {
    return <Navigate to="/unauthorized" />;
  }

  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    const title = titleRef.current.value;
    const content = contentRef.current.value;
    const author = user.username

    addPost(title, content, author);
  };

  return (
    <>
      <form
        className="EditForm"
        action=""
        autoComplete="off"
        onSubmit={handleSubmit}
      >
        <label htmlFor="title" id="marker">
          Title:
          <input type="text" id="title" ref={titleRef} required />
        </label>

        <label htmlFor="content">
          Content:
          <textarea rows={10} cols={50} id="content" ref={contentRef} required />
        </label>
        <button className="CreateBtn">Create Post</button>
      </form>
    </>
  );
};

export default CreatePost;
