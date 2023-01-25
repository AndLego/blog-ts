import React from "react";
import { useNavigate } from "react-router-dom";

const Unauthorized = () => {
  const [count, setCount] = React.useState(3);
  const navigate = useNavigate();

  const countdown = () => {
    setCount((prevCount) => {
      if (prevCount === 0) {
        navigate("/");
        return 0;
      }
      return prevCount - 1;
    });
  };

  React.useEffect(() => {
    const interval = setInterval(countdown, 1000);
    return () => clearInterval(interval);
  }, [count]);

  return (
    <>
      <p>No tienes los permisos para acceder</p>
      <p>Redireccionando en: {count}</p>
    </>
  );
};

export default Unauthorized;