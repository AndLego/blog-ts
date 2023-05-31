import React, { FormEvent } from "react";
import { v4 as uuidv4 } from "uuid";
import { CommentProps } from "../../@types/blog";
import { useAPI } from "../../utils/blogAPI";
import style from "./style/Comments.module.css"

interface CreatePostProps {
  postSlug: string;
  user: string;
  openCommentTab: boolean;
  setOpenCommentTab: (update: boolean) => void;
}

const CommentCreator = ({
  postSlug,
  user,
  openCommentTab,
  setOpenCommentTab,
}: CreatePostProps) => {
  const { addComment, getFormattedDate } = useAPI();
  const contentRef = React.useRef<HTMLTextAreaElement>(null!);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    const content = contentRef.current.value;

    const newComment: CommentProps = {
      id: uuidv4(),
      author: user,
      content: content,
      published: new Date().toLocaleString(),
      timeFormated: getFormattedDate()
    };

    addComment(postSlug, newComment);

    setOpenCommentTab(!openCommentTab);
  };

  return (
    <>
      <form
        className={style.createComment}
        action=""
        autoComplete="off"
        onSubmit={handleSubmit}
      >
        <label htmlFor="content">
          Content:
          <textarea
            className={style.inputComment}
            rows={6}
            cols={20}
            id="content"
            ref={contentRef} />
        </label>
        <button className="CreateBtn">Post Comment</button>
      </form>
    </>
  );
};

export default CommentCreator;
