import style from "./Loader.module.css"

const Loader = () => {
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