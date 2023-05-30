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

    /**bloquea el scroll mientras el modal exista */
    React.useEffect(() => {
        document.body.classList.add("modal-open"); // Agregar clase para deshabilitar scroll

        return () => {
            document.body.classList.remove("modal-open"); // Eliminar clase al cerrar el modal
        };
    }, []);

    const handleClick = () => {

        setShowModalPost(!showModalPost)
        if (postState === "success") {
            navigate("/blog")
        }
        if (postState === "error") {
            navigate("/")
        }
    }

    type RenderState = {
        img: string;
        message: string;
        btn: string;
        btnClassName: string;
    };

    const renderStateMap: { [key: string]: RenderState } = {
        success: {
            img: check,
            message: "Post Created!",
            btn: "Continue",
            btnClassName: style.go
        },
        updated: {
            img: check,
            message: "Post Updated!",
            btn: "Continue",
            btnClassName: style.go
        },
        error: {
            img: wrong,
            message: "Oops, something went wrong",
            btn: "Try Again",
            btnClassName: style.back
        },
        deleted: {
            img: check,
            message: "Post Deleted!",
            btn: "Continue",
            btnClassName: style.go
        },
        comment: {
            img: check,
            message: "Comment Added!",
            btn: "Continue",
            btnClassName: style.go
        },
        commentDeleted: {
            img: check,
            message: "Comment Deleted!",
            btn: "Continue",
            btnClassName: style.go
        }
    };

    const renderState = renderStateMap[postState] || {};


    return (
        <article className={style.modal}>

            <div className={style.modalCard}>
                <div>
                    <img src={renderState.img} alt="check" className={style.check} />
                    <p>
                        {renderState.message}
                    </p>
                </div>

                <button onClick={handleClick} className={renderState.btnClassName}>
                    {renderState.btn}
                </button>

            </div>

        </article>
    );
}

export default Modal;