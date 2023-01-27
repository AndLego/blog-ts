import React from "react";
import { CommentProps } from "../@types/blog";
import trash from "../assets/trash.svg";

const CommentContainer = ({ comments }: { comments: CommentProps[] }) => {
  if (comments.length === 0) {
    return <p>No comments yet </p>;
  }

  return (
    <>
      {comments.map((comment) => {
        return (
          <div className="comments_container" key={comment.id}>
            <div>
              <h6>{comment.author}</h6>
              <p>{comment.published}</p>
            </div>
            <p>{comment.content}</p>
            <button>
              Delete
              <img src={trash} alt="X" />
            </button>
          </div>
        );
      })}
    </>
  );
};

export default CommentContainer;
