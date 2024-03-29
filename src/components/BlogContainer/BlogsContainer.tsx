import { Link, Outlet } from "react-router-dom";
import { Blog } from "../../@types/blog";
import { useAPI } from "../../utils/blogAPI";
import React from "react";
import style from "./BlogsContainer.module.css"

const BlogMain = () => {
  const { postsArray, getPosts, postAdded, user } = useAPI();

  const scrollTop = () => {
    window.scrollTo(0, 0);
  };

  /**calling post database */
  React.useEffect(() => {
    getPosts();
  }, [postAdded]);

  /**sort data depending on recent date
   * en caso de tener undefined asigna un date minimo para garantizar
   * el llamdo de la funcion
   */
  postsArray.sort((a, b) => {
    const dateA = a.timeFormated ? new Date(a.timeFormated) : new Date(0);
    const dateB = b.timeFormated ? new Date(b.timeFormated) : new Date(0);

    return dateB.getTime() - dateA.getTime();
  });


  return (
    <>
      <h1>Blogs</h1>

      <Outlet />

      <section className={style.BlogsContainer}>

        {postsArray.length === 0 ?
          (<p className={style.empty}>There's no blogs, create one!</p>) :

          postsArray.map((blog: Blog) => (
            <article key={blog.slug}>
              <div>
                <h2>{blog.author}</h2>
                <p>{blog.published}</p>
              </div>
              <Link onClick={scrollTop} to={`/blog/${blog.slug}`}>
                {blog.title}
              </Link>
              <Link onClick={scrollTop} to={`/blog/${blog.slug}`}>
                Start Reading
              </Link>
            </article>
          ))

        }

      </section>

      {user?.rol.permissions.write && (
        <Link to="/createPost" className={style.Create}>
          Create New Post
        </Link>
      )}
    </>
  );
};

export default BlogMain;
