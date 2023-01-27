import React from "react";
import moment from "moment";
import { Link, Outlet } from "react-router-dom";
import { Blog } from "../@types/blog";
import { useAuth } from "../utils/auth";
import { useAPI } from "../utils/blogAPI";

const BlogMain = () => {
  const { blogData } = useAPI();
  const { user } = useAuth();

  const scrollTop = () => {
    window.scrollTo(0, 0);
  };

  /**sort data depending on recent date */
  blogData.sort((a, b) => {
    if (a.published && b.published) {
      return (
        moment(b.published, "DD/MM/YYYY").toDate().getTime() -
        moment(a.published, "DD/MM/YYYY").toDate().getTime()
      );
    } else if (a.published) {
      return -1;
    } else if (b.published) {
      return 1;
    } else {
      return 0;
    }
  });

  return (
    <>
      <h1>Blogs</h1>

      <Outlet />

      <section className="BlogsContainer">
        {blogData.map((blog: Blog) => (
          <article key={blog.id}>
            <div>
              <h6>{blog.author}</h6>
              <p>{blog.published}</p>
            </div>
            <Link onClick={scrollTop} to={`/blog/${blog.slug}`}>
              {blog.title}
            </Link>
            <Link onClick={scrollTop} to={`/blog/${blog.slug}`}>
              Start Reading
            </Link>
          </article>
        ))}
      </section>

      {user?.rol.write && (
        <Link to="/createPost" className="Create">
          Create New Post
        </Link>
      )}
    </>
  );
};

export default BlogMain;
