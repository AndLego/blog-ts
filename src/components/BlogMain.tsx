import React from "react";
import { Link, Outlet } from "react-router-dom";
import { Blog } from "../@types/blog";
import { useAuth } from "../utils/auth";
import { useAPI } from "../utils/blogAPI";
import CreatePost from "./CreatePost";

const BlogMain = () => {
  const [update, setUpdate] = React.useState(false);
  const { blogData } = useAPI();
  const { user } = useAuth();

  React.useEffect(() => {}, [update]);

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

      {user?.rol.write && (
        <CreatePost
          user={user.username}
          setUpdate={setUpdate}
          update={update}
        />
      )}
    </>
  );
};

export default BlogMain;
