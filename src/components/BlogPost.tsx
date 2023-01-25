import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../utils/auth";
import { useAPI } from "../utils/blogAPI";
import EditForm from "./EditForm";

const BlogPost = () => {
  const [showEdit, setShowEdit] = React.useState(false);

  const { slug } = useParams();
  const navigate = useNavigate();

  const { blogData, deletePost } = useAPI();
  const { user } = useAuth();

  const post = blogData.find((item) => item.slug === slug);

  const handleBack = () => {
    navigate("/blog");
  };

  const handleDelete = () => {
    deletePost(post!.id);
    navigate("/blog");
  };

  const handleEdit = () => {
    navigate(`/blog/${slug}/edit`);
  };

  return (
    <>
      <h2>{post?.title}</h2>
      <button onClick={handleBack}>Back</button>
      <p>{post?.author}</p>
      <p>{post?.content}</p>

      {user?.rol.write || user?.username === post?.author ? (
        <button onClick={handleEdit}>Edit</button>
      ) : null}

      {showEdit && <EditForm />}

      {user?.rol.delete || user?.username === post?.author ? (
        <button onClick={handleDelete}>Delete Post</button>
      ) : null}
    </>
  );
};

export default BlogPost;
