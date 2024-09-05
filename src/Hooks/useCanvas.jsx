import { useRef, useEffect } from "react";

const useCanvas = (draw) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const c = canvas.getContext("2d");

    const render = () => {
      draw(c);
    };
    render();
  }, [draw]);

  return canvasRef;
};

export default useCanvas;
