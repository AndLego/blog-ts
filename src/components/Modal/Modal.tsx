import React from 'react';
import check from "../../assets/check.svg"
import wrong from "../../assets/wrong.svg"
import { useNavigate } from 'react-router-dom';
import style from "./Modal.module.css"

type ModalProps = {
    postState: string;
    showModalPost: boolean;
    setShowModalPost: React.Dispatch<React.SetStateAction<boolean>>;
};

const Modal = ({ postState, showModalPost, setShowModalPost }: ModalProps) => {
    const navigate = useNavigate()

    const handleClick = () => {

        setShowModalPost(!showModalPost)
        if (postState === "success") {
            navigate("/blog")
        }
    }
    return (
        <article className={style.modal}>

            <div className={style.modalCard}>
                <div>
                    {postState === "success" ?
                        <>
                            <img src={check} alt="check" className={style.check} />
                            <p>Post Created!</p>
                        </>
                        :
                        <>
                            <img src={wrong} alt="wrong" className={style.wrong} />
                            <p>
                                <p>
                                    {postState === "error" ? "Oops, something went wrong" : "Sorry, there's already a post with that name"}
                                </p>
                            </p>
                        </>
                    }
                </div>

                <button onClick={handleClick} className={`${postState === "success" ? style.go : style.back}`}>
                    {postState === "success" ? "Continue" : "Try Again"}
                </button>

            </div>

        </article>
    );
}

export default Modal;