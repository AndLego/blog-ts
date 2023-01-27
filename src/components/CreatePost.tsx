import React, { FormEvent } from "react";
import { v4 as uuidv4 } from "uuid";
import { Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "../utils/auth";
import { useAPI } from "../utils/blogAPI";

const CreatePost = () => {
  const { user } = useAuth();
  const { addPost } = useAPI();
  const titleRef = React.useRef<HTMLInputElement>(null!);
  const contentRef = React.useRef<HTMLTextAreaElement>(null!);
  const navigate = useNavigate();

  if (user?.rol.write !== true) {
    return <Navigate to="/unauthorized" />;
  }

  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    const title = titleRef.current.value;
    const slug = title
      .replace(/[^\w\s]/gi, "")
      .split(" ")
      .join("-");
    const content = contentRef.current.value;

    const post = {
      title: title,
      slug: slug,
      content: content,
      author: user.username,
      published: new Date().toLocaleDateString(),
      id: uuidv4(),
    };

    addPost(post);

    navigate(`/blog/${slug}`);
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
          <input type="text" id="title" ref={titleRef} />
        </label>

        <label htmlFor="content">
          Content:
          <textarea rows={10} cols={50} id="content" ref={contentRef} />
        </label>
        <button className="CreateBtn">Create Post</button>
      </form>
    </>
  );
};

export default CreatePost;
