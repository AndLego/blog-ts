import React, { FormEvent } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useAPI } from "../../utils/blogAPI";
import style from "./style/EditForm.module.css"

type CreatePostProps = {
  setShowModalPost: React.Dispatch<React.SetStateAction<boolean>>;
  showModalPost: boolean;
};

const CreatePost = () => {
  const { addPost, user } = useAPI();
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
        className={style.EditForm}
        action=""
        autoComplete="off"
        onSubmit={handleSubmit}
      >
        <label htmlFor="title" id="marker">
          Title:
          <input
            className={style.inputTitle}
            type="text"
            id="title"
            ref={titleRef}
            required />
        </label>

        <label htmlFor="content">
          Content:
          <textarea
            className={style.textareaContent}
            rows={10}
            cols={50}
            id="content"
            ref={contentRef} required />
        </label>
        <button className={style.CreateBtn}>Create Post</button>
      </form>
    </>
  );
};

export default CreatePost;
