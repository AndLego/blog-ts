import React from "react";
import { useAPI } from "../utils/blogAPI";

const CreatePost = () => {
  const [create, setCreate] = React.useState(false);
  const { addPost } = useAPI();
  const titleRef = React.useRef(null);
  const contentRef = React.useRef(null);

  const handleCreate = () => {
    setCreate(!create);
  };

  return (
    <>
      <button onClick={handleCreate}>Create a New Post</button>
      {create && (
        <form action="" autoComplete="off" onSubmit={handleSubmit}>
          <label htmlFor="title">
            Title:
            <input type="text" id="title" ref={titleRef} />
          </label>

          <label htmlFor="content">
            Content:
            <input type="text" id="content" ref={contentRef} />
          </label>
          <button>Create Post</button>
        </form>
      )}
    </>
  );
};

export default CreatePost;
