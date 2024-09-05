import React from "react";
import Totals from "./Totals";

function SavedRoutes({ routes, loadRoute, handleDelete, toggleRouteMenu }) {
  function handleLoadClick(selected) {
    loadRoute(selected);
  }
  return (
    <>
      <h2>Saved Routes</h2>
      <button className="closemenu-btn" onClick={() => toggleRouteMenu()}>
        Close
      </button>
      {routes.map((saved, idx) => (
        <article
          className="route"
          key={`${saved.desc}${saved.route.length}${idx}`}
        >
          <header>{saved.desc}</header>
          <Totals total={saved.total} />

          <div className="btn-group">
            <button onClick={() => handleLoadClick(saved.route)}>Load</button>
            <button onClick={() => handleDelete(idx)}>Delete</button>
          </div>
        </article>
      ))}
    </>
  );
}

export default SavedRoutes;
