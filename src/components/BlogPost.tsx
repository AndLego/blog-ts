import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAPI } from "../utils/blogAPI";

const BlogPost = () => {
  const { slug } = useParams();
  const navigate = useNavigate();

  const { blogData } = useAPI();

  const post = blogData.find((item) => item.slug === slug);

  const handleBack = () => {
    navigate("/blog");
  };

  return (
    <>
      <h2>{post?.title}</h2>
      <button onClick={handleBack}>Back</button>
      <p>{post?.author}</p>
      <p>{post?.content}</p>
    </>
  );
};

export default BlogPost;
