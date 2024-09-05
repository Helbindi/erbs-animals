import React from "react";
import irem from "../../assets/emotes/irem-shocked.png";
import "./DialogModal.css";

function DialogModal({ dialogRef, toggleModal }) {
  // Function handlers for the Dialog Modal
  function handleDialogClick(e) {
    if (e.target === dialogRef.current && dialogRef.current.open)
      dialogRef.current.close();
  }

  return (
    <dialog
      ref={dialogRef}
      className="modal"
      onClick={(e) => handleDialogClick(e)}
    >
      <div className="modal-content">
        <span className="close-btn" onClick={(e) => toggleModal(e)}>
          x
        </span>
        <img src={irem} alt="irem image" />
        <div>
          <strong>Level</strong>: This range slider will modify the assumed
          average level of the entire lobby to get a better estimate of how much
          XP animal camps will give on respawn. <br />
          Based on personal research in Training Mode, animals respawn at a
          certain level based on the lobby level. For example:
          <ul>
            <li>
              Most animals will only respawn with a higher level if the lobby
              level is 7+.
            </li>
            <li>
              Wolves and Bears will only respawn with higher levels if the lobby
              levels are 9+ and 11+.
            </li>
            <li>
              Mutant variants share the same level scaling as their normal
              counterparts.
            </li>
          </ul>
        </div>
        <p>
          <strong>Animals</strong>: This tab will display information regarding
          individual animal data such as: base XP, XP per Level, Credits, etc
        </p>
        <p>
          <strong>Zones</strong>: This tab will display an aggregate of how much
          XP and Credits are spawned in each Zone based on the average level of
          the entire lobby.
        </p>
        <p>
          <strong>Selection</strong>: This tab will allow you to click
          individual camps on the left-side map to create a farming route. This
          will also aggregate the total XP and Credits you would gain by doing
          so.
        </p>
      </div>
    </dialog>
  );
}

export default DialogModal;
