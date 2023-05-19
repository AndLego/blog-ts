import React from "react";
import { CommentProps } from "../@types/blog";
import trash from "../assets/trash.svg";
import { useAuth } from "../utils/auth";
import { useAPI } from "../utils/blogAPI";

const CommentContainer = ({ comments = [], postId }: { comments: CommentProps[], postId: string | number | undefined }) => {
  const { user } = useAuth();
  const { deleteComment } = useAPI();

  const [sortType, setSortType] = React.useState("Newest");
  const [sortedComments, setSortedComments] = React.useState(comments);

  if (comments.length === 0) {
    return <p>No comments yet</p>;
  }

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
    const sorted = sortObjectsByPublished(comments, selectedSortType);
    setSortType(selectedSortType);
    setSortedComments(sorted);
  };

  return (
    <>
      <select name="" id="" value={sortType} onChange={handleSortChange}>
        <option value="Newest">Newest</option>
        <option value="Oldest">Oldest</option>
      </select>
      {sortedComments.map((comment) => {
        return (
          <div className="comments_container" key={comment.id}>
            <div>
              <h2>{comment.author}</h2>
              <p>{comment.published}</p>
            </div>
            <p>{comment.content}</p>
            {user?.username === comment.author && (
              <button onClick={() => deleteComment(postId, comment.id)}>
                Delete
                <img src={trash} alt="X" />
              </button>
            )}
          </div>
        );
      })}
    </>
  );
};

export default CommentContainer;