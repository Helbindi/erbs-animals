import React, { useState } from "react";
import "./Marker.css";

function Marker({ camp, handleAnimalClick, selected }) {
  const [isHover, setIsHover] = useState(false);
  const found = selected.find((item) => {
    if (
      item.position.x === camp.position.x &&
      item.position.y === camp.position.y
    )
      return true;
  });
  const isSelected = found ? true : false;
  const isMutant = camp.animal.name.includes("Mutant");

  const stylePosition = {
    left: `${camp.position.x - 12.5}px`,
    top: `${camp.position.y - 15}px`,
  };

  return (
    <div
      className="camp"
      style={stylePosition}
      data-mutant={isMutant}
      data-selected={isSelected}
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
    >
      <img
        src={camp.animal?.imageSrc}
        alt={`marker(${camp.position.x},${camp.position.y})`}
        onClick={(e) => handleAnimalClick(e, camp)}
      />

      {isHover && (
        <div className="camp-info">
          <p>
            {camp.animal.name}&#40;{camp.size}&#41;
          </p>
          <p>{camp.zone}</p>
        </div>
      )}
    </div>
  );
}

export default Marker;
