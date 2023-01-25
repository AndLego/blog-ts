import React, { FormEvent } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../utils/auth";
import { useAPI } from "../utils/blogAPI";

const EditForm = () => {
  const { blogData, editPost } = useAPI();
  const { user } = useAuth();
  const editTitleRef = React.useRef<HTMLInputElement>(null!);
  const editContentRef = React.useRef<HTMLInputElement>(null!);

  const navigate = useNavigate();
  const { slug } = useParams();

  if (user?.rol.write !== true) {
    return <Navigate to="/unauthorized" />;
  }

  const post = blogData.filter((post) => post.slug === slug)[0];

  React.useEffect(() => {
    if (editTitleRef.current) editTitleRef.current.value = post.title;
    if (editContentRef.current) editContentRef.current.value = post.content;
  }, []);

  const postEdit = (e: FormEvent) => {
    e.preventDefault();

    const title = editTitleRef.current.value;
    const slug = title
      .replace(/[^\w\s]/gi, "")
      .split(" ")
      .join("-");
    const content = editContentRef.current.value;

    const editedPost = {
      id: post.id,
      title: title,
      slug: slug,
      content: content,
    };

    editPost(editedPost);

    navigate(`/blog/${slug}`);
  };

  return (
    <form action="" autoComplete="off" onSubmit={postEdit}>
      <label htmlFor="title">
        Title:
        <input
          type="text"
          id="title"
          ref={editTitleRef}
          defaultValue={editTitleRef.current?.value}
        />
      </label>

      <label htmlFor="content">
        Content:
        <input
          type="text"
          id="content"
          ref={editContentRef}
          // defaultValue={editContentRef.current?.value}
        />
      </label>
      <button>Edit</button>
    </form>
  );
};

export default EditForm;
