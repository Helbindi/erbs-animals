import React, { useState } from "react";
import CardItem from "../../Components/CardItem/CardItem";
import irem from "../../assets/emotes/irem-sad.png";
import Totals from "./Totals";
import "./Selection.css";
import SavedRoutes from "./SavedRoutes";

// SUGGESTION: Have saved routes in order to compare them?
// 1. Button toggle to display saved routes
// 2. Saved route menu showing each route (Route A: Temple -> Stream -> ..., Totals)
// 3. Save current route or replace current route with a saved one.
// Bug: Filtering does not affect the selections.
const multiplierPerPixel = 0.15;

function Selection({ selected, lobbyLv, handleAnimalClick, loadRoute }) {
  const [routes, setRoutes] = useState([]);
  const [toggleMenu, setToggleMenu] = useState(true);
  let timeElapsed = [];
  let total = calcTotals(selected, lobbyLv);
  let farmedZones = getFarmedZones();

  function getFarmedZones() {
    let arr = {};
    for (const [key, value] of Object.entries(selected)) {
      const selectedZone = value.zone;
      if (!Object.keys(arr).includes(selectedZone)) {
        arr[selectedZone] = [value];
      } else {
        arr[selectedZone].push(value);
      }
    }
    return arr;
  }
  function calcTotals(data, lobbyLv) {
    let total = {
      xp: 0,
      creditKill: 0,
      creditAlly: 0,
      time: 0,
    };
    data.map((item, idx) => {
      // add xp
      const addXP =
        (item.animal.level[lobbyLv - 6] * item.animal.perLevelXP +
          item.animal.baseXP) *
        item.size;
      // add credit kill
      const addKill = item.animal.creditKill * item.size;
      // add credit ally
      const addAlly = item.animal.creditAlly * item.size;

      // Calc time to travel distance to next camp
      let addTime = 0;
      if (idx !== data.length - 1) {
        const calcX = Math.pow(
          data[idx + 1].position.x - data[idx].position.x,
          2
        );
        const calcY = Math.pow(
          data[idx + 1].position.y - data[idx].position.y,
          2
        );

        addTime = Math.round(Math.sqrt(calcX + calcY) * multiplierPerPixel);
        let cooldown = {
          position: {
            x: data[idx + 1].position.x,
            y: data[idx + 1].position.y,
          },
          cooldown: addTime,
        };
        timeElapsed.push(cooldown);
      }

      total = {
        ...total,
        xp: total.xp + addXP,
        creditKill: total.creditKill + addKill,
        creditAlly: total.creditAlly + addAlly,
        time: total.time + addTime,
      };
    });

    return total;
  }

  function handleSaveClick(route, zones) {
    if (route.length > 0) {
      let desc = "";
      Object.keys(zones).forEach((zone, idx) => {
        if (idx === 0) {
          desc += zone;
        } else {
          desc = desc.concat(" -> ", zone);
        }
      });

      const saveRoute = { route, desc, total };
      setRoutes((prev) => [...prev, saveRoute]);
      alert(`New route saved!`);
    }
  }

  function handleDelete(routeIdx) {
    if (routes.length > 1) {
      setRoutes((prev) => prev.filter((route, idx) => idx === routeIdx));
    } else {
      setRoutes([]);
    }
  }

  function toggleRouteMenu() {
    setToggleMenu((prev) => !prev);
  }

  return (
    <section className="selection-content">
      <header>
        <h1>Selection</h1>
      </header>

      <button className="showsaved-btn" onClick={() => toggleRouteMenu()}>
        Show Routes
      </button>
      <section className="saved-routes" aria-hidden={toggleMenu}>
        <button
          className="save-btn"
          onClick={() => handleSaveClick(selected, farmedZones)}
        >
          Save Current
        </button>

        <SavedRoutes
          routes={routes}
          loadRoute={loadRoute}
          handleDelete={handleDelete}
          toggleRouteMenu={toggleRouteMenu}
        />
      </section>
      {/* Display all selected animals */}
      {selected.length > 0 ? (
        <>
          <Totals total={total} />

          {Object.keys(farmedZones).map((zone, idx) => (
            <section className="zone-selected" key={`${zone}-${idx}`}>
              <h2>{zone}</h2>
              <article className="selected-items">
                {farmedZones[zone].map((item) => (
                  <CardItem
                    item={item}
                    key={`${item.zone}${item.position.x}${item.position.y}`}
                    handleAnimalClick={handleAnimalClick}
                    timeElapsed={timeElapsed}
                  />
                ))}
              </article>
            </section>
          ))}
        </>
      ) : (
        <div className="prompt">
          <img src={irem} alt="irem image" />
          <p>
            No camps have been selected. Try clicking one of the animal camps on
            the map!
          </p>
        </div>
      )}
    </section>
  );
}

export default Selection;
