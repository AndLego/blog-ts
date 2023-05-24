import React from "react";
import {
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";
import { useAuth } from "../utils/auth";
import { useAPI } from "../utils/blogAPI";
import arrow_back from "../assets/arrow_back.svg";
import CommentContainer from "./CommentContainer";
import CommentCreator from "./CommentCreator";
import { CommentProps } from "../@types/blog";

const BlogPost = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const { fakeApi, deletePost } = useAPI();
  const { user } = useAuth();

  const post = fakeApi.find((item) => item.slug === slug);

  const [openCommentTab, setOpenCommentTab] = React.useState(false);
  const [sortType, setSortType] = React.useState("");
  const [sortedComments, setSortedComments] = React.useState<CommentProps[]>([]);

  React.useEffect(() => {
    if (post === undefined) {
      navigate("/");
    }
  }, []);

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
    if (!user) {
      navigate("/login", { replace: true, state: { redirectTo: location } });
    }
    setOpenCommentTab(!openCommentTab);
  };

  /**logic for sorting comments */

  React.useEffect(() => {
    let sorted;
    if (sortType === "Newest") {
      sorted = sortObjectsByPublished(post?.comments || [], "Newest");
    } else {
      sorted = post?.comments || [];
    }
    setSortedComments(sorted);
  }, [post?.comments, sortType]);

  const sortObjectsByPublished = (objects: CommentProps[], order: string) => {
    const sorted = [...objects].sort((a, b) => {
      const dateA = new Date(a.timeFormated);
      const dateB = new Date(b.timeFormated);

      if (order === "Newest") {
        return dateB.getTime() - dateA.getTime();
      } else if (order === "Oldest") {
        return dateA.getTime() - dateB.getTime();
      } else {
        return 0;
      }
    });

    return sorted;
  };

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedSortType = e.target.value;
    const sorted = sortObjectsByPublished(post?.comments || [], selectedSortType);
    setSortType(selectedSortType);
    setSortedComments(sorted);
  };

  return (
    <section className="Blog">
      <button onClick={handleBack}>
        <img src={arrow_back} alt="" />
        Back to Blogs
      </button>
      <h1>{post?.title}</h1>
      <div>
        <h2>{post?.author}</h2>
        <p>{post?.published}</p>
      </div>
      <p>{post?.content}</p>

      <div className="Btns">
        {user?.rol.permissions.write || user?.username === post?.author ? (
          <button onClick={handleEdit}>Edit</button>
        ) : null}

        {user?.rol.permissions.delete || user?.username === post?.author ? (
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

      <h2>Comments:</h2>
      <CommentContainer
        sortedComments={sortedComments}
        postId={post?.id}
        handleSortChange={handleSortChange}
        sortType={sortType}
      />
    </section>
  );
};

export default BlogPost;
