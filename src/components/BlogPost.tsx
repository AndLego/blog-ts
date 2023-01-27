import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../utils/auth";
import { useAPI } from "../utils/blogAPI";
import arrow_back from "../assets/arrow_back.svg";
import CommentContainer from "./Comment";
import CommentCreator from "./CommentCreator";

const BlogPost = () => {
  const { slug } = useParams();
  const navigate = useNavigate();

  const { blogData, deletePost } = useAPI();
  const { user } = useAuth();

  const [openCommentTab, setOpenCommentTab] = React.useState(false);

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

  const handleComment = () => {
    if (user === null) {
      navigate("/login");
    }
    setOpenCommentTab(!openCommentTab);
  };

  return (
    <section className="Blog">
      <button onClick={handleBack}>
        <img src={arrow_back} alt="" />
        Back to Blogs
      </button>
      <h2>{post?.title}</h2>
      <div>
        <h4>{post?.author}</h4>
        <p>{post?.published}</p>
      </div>
      <p>{post?.content}</p>

      <div className="Btns">
        {user?.rol.write || user?.username === post?.author ? (
          <button onClick={handleEdit}>Edit</button>
        ) : null}

        {user?.rol.delete || user?.username === post?.author ? (
          <button onClick={handleDelete}>Delete Post</button>
        ) : null}

        <button onClick={handleComment}>Comment</button>
      </div>

      {openCommentTab && (
        <CommentCreator
          postId={post?.id}
          user={user?.username!}
          openCommentTab={openCommentTab}
          setOpenCommentTab={setOpenCommentTab}
        />
      )}

      <h5>Comments:</h5>
      <CommentContainer comments={post?.comments!} />
    </section>
  );
};

export default BlogPost;
