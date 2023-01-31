import React from "react";
import { CommentProps } from "../@types/blog";
import trash from "../assets/trash.svg";
import { useAuth } from "../utils/auth";

const CommentContainer = ({ comments = [] }: { comments: CommentProps[] }) => {
  const { user } = useAuth();

  if (comments.length === 0) {
    return <p>No comments yet </p>;
  }

  return (
    <>
    <select name="" id="">
      <option value="Newest">Newest</option>
      <option value="Oldest">Oldest</option>
    </select>
      {comments.map((comment) => {
        return (
          <div className="comments_container" key={comment.id}>
            <div>
              <h2>{comment.author}</h2>
              <p>{comment.published}</p>
            </div>
            <p>{comment.content}</p>
            {user?.username === comment.author && (
              <button>
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
