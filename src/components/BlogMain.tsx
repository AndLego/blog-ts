import React from "react";
import { Link, Outlet } from "react-router-dom";
import { Blog } from "../@types/blog";
import { useAPI } from "../utils/blogAPI";

const BlogMain = () => {
  const { blogData } = useAPI();

  return (
    <>
      <h1>Blogs</h1>

      <Outlet />

      <ul>
        {blogData.map((blog: Blog) => (
          <li key={blog.id}>
            <Link to={`/blog/${blog.slug}`}>{blog.title}</Link>
          </li>
        ))}
      </ul>
    </>
  );
};

export default BlogMain;
