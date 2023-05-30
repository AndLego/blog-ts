import React from "react";
import style from "./Loader.module.css"

const Loader = () => {
    const scrollTop = () => {
        window.scrollTo(0, 0);
    };

    React.useEffect(() => {
        scrollTop();
        document.body.classList.add("modal-open"); // Agregar clase para deshabilitar scroll

        return () => {
            document.body.classList.remove("modal-open"); // Eliminar clase al cerrar el modal
        };
    }, []);

    return (
        <div className={style.loaderContainer}>
            <div className={style.lds_spinner}>
                <div className={style.tic}></div>
                <div className={style.tic}></div>
                <div className={style.tic}></div>
                <div className={style.tic}></div>
                <div className={style.tic}></div>
                <div className={style.tic}></div>
                <div className={style.tic}></div>
                <div className={style.tic}></div>
                <div className={style.tic}></div>
                <div className={style.tic}></div>
                <div className={style.tic}></div>
                <div className={style.tic}></div>
            </div>
        </div>
    );
}

export default Loader;