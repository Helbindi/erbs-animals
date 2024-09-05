import React from "react";

function Totals({ total }) {
  return (
    <div className="total-calcs">
      <p>
        Total XP: <strong>{total.xp}</strong>
      </p>
      <p>
        Credits&#40;Kill&#41;: <strong>{total.creditKill}</strong>
      </p>
      <p>
        Credits&#40;Ally&#41;: <strong>{total.creditAlly}</strong>
      </p>
      <p>
        Time: <strong>~{total.time}s</strong>
      </p>
    </div>
  );
}

export default Totals;
