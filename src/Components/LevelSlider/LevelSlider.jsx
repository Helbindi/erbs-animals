import React from "react";
import "./LevelSlider.css";

function LevelSlider({ lobbyLv, handleLevelChange }) {
  return (
    <div className="lobby-level">
      <button onClick={(e) => handleLevelChange(e)}>-</button>
      <p>
        Lv: <strong>{lobbyLv}</strong>
      </p>
      <button onClick={(e) => handleLevelChange(e)}>+</button>
    </div>
  );
}

export default LevelSlider;
