import React, { useEffect } from "react";
import useCanvas from "../../Hooks/useCanvas";
import erbsMap from "../../assets/map.png";

function Canvas(props) {
  const { draw, ...rest } = props;
  const canvasRef = useCanvas(draw);

  useEffect(() => {
    const c = document.getElementById("canvas");
    c.style.backgroundImage = `url(${erbsMap})`;
  }, []);
  return (
    <canvas
      ref={canvasRef}
      {...rest}
      id="canvas"
      width="950"
      height="1137"
    ></canvas>
  );
}

export default Canvas;
