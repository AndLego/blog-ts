import React from "react";
import { CommentProps } from "../../@types/blog";
import trash from "../../assets/trash.svg";
import { useAuth } from "../../utils/auth";
import { useAPI } from "../../utils/blogAPI";
import style from "./style/Comments.module.css"

interface CommentContainerProps {
  sortedComments: CommentProps[],
  postSlug: string,
  handleSortChange: (e: React.ChangeEvent<HTMLSelectElement>) => void,
  sortType: string
}

const CommentContainer = ({ sortedComments, postSlug, handleSortChange, sortType }: CommentContainerProps) => {
  const { user } = useAuth();
  const { deleteComment } = useAPI();

  if (sortedComments.length === 0) {
    return <p>No comments yet</p>;
  }

  return (
    <>
      <select name="" id="" value={sortType} onChange={handleSortChange}>
        <option value="Newest">Newest</option>
        <option value="Oldest">Oldest</option>
      </select>
      {sortedComments.map((comment) => {
        return (
          <div className={style.comments_container} key={comment.id}>
            <div>
              <h2>{comment.author}</h2>
              <p>{comment.published}</p>
            </div>
            <p>{comment.content}</p>
            {user?.username === comment.author && (
              <button onClick={() => deleteComment(postSlug, comment.id)}>
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