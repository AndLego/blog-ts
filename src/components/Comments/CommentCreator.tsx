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
  const { addComment } = useAPI();
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

    /**function to format published */
    function getFormattedDate() {
      const date = new Date();
      const year = date.getUTCFullYear();
      const month = (date.getUTCMonth() + 1).toString().padStart(2, "0");
      const day = date.getUTCDate().toString().padStart(2, "0");
      const hours = date.getUTCHours().toString().padStart(2, "0");
      const minutes = date.getUTCMinutes().toString().padStart(2, "0");
      const seconds = date.getUTCSeconds().toString().padStart(2, "0");

      return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}.000Z`;
    }
    console.log("slug", postSlug)
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
