import React, { useEffect, useState } from "react";
import "./CardItem.css";

function CardItem({ item, handleAnimalClick, timeElapsed }) {
  const [respawn, setRespawn] = useState(item.animal.respawn);
  let calcTime = 0;
  let percentage = Math.round(100 - (respawn / item.animal.respawn) * 100);

  for (const [key, value] of Object.entries(timeElapsed).reverse()) {
    if (
      item.position.x === value.position.x &&
      item.position.y === value.position.y
    ) {
      break;
    }
    calcTime += value.cooldown;
  }

  useEffect(() => {
    const newRespawn = item.animal.respawn - calcTime;
    if (newRespawn > 0) {
      setRespawn(newRespawn);
    } else {
      setRespawn(0);
    }
  }, [calcTime]);
  return (
    <div
      className="card-item"
      role="progressbar"
      aria-valuenow={respawn > 0 ? respawn : 0}
      aria-busy={respawn > 0 ? "true" : "false"}
      aria-live="polite"
      style={{
        "--bg-image": `url(${item.animal.imageSrc})`,
        "--progress": `${percentage}%`,
      }}
      onClick={(e) => handleAnimalClick(e, item)}
    />
  );
}

export default CardItem;
