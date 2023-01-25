import React, { FormEvent } from "react";
import { v4 as uuidv4 } from "uuid";
import { useAPI } from "../utils/blogAPI";

interface CreatePostProps {
  user: string;
  update: boolean;
  setUpdate: (update: boolean) => void;
}

const CreatePost = ({ user, update, setUpdate }: CreatePostProps) => {
  const [create, setCreate] = React.useState(false);
  const { addPost } = useAPI();
  const titleRef = React.useRef<HTMLInputElement>(null!);
  const contentRef = React.useRef<HTMLInputElement>(null!);

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
      author: user,
      id: uuidv4(),
    };

    addPost(post);

    setUpdate(!update);
  };
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
