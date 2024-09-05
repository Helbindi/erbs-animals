import React from "react";
import { animals } from "../../data/animals";
import { zoneList } from "../../data/zoneList";
import { colors } from "../../data/colors";
import "./Filter.css";

function Filter({ filter, showFilter, setFilter, setShowFilter }) {
  function handleClickAnimal(id) {
    const dupe = filter.animals.includes(id);
    if (!dupe) {
      setFilter((prev) => {
        let newArr = prev.animals;
        newArr.push(id);
        return { ...prev, animals: newArr };
      });
    } else {
      setFilter((prev) => {
        let newArr = prev.animals;
        const idx = newArr.indexOf(id);
        newArr.splice(idx, 1);
        return { ...prev, animals: newArr };
      });
    }
  }

  function handleClickZone(loc) {
    const dupe = filter.zones.includes(loc);
    if (!dupe) {
      setFilter((prev) => {
        let newArr = prev.zones;
        newArr.push(loc);
        return { ...prev, zones: newArr };
      });
    } else {
      setFilter((prev) => {
        let newArr = prev.zones;
        const idx = newArr.indexOf(loc);
        newArr.splice(idx, 1);
        return { ...prev, zones: newArr };
      });
    }
  }

  function handleContainerClick(e) {
    if (e.target.className === "filter-container") setShowFilter(false);
  }
  return (
    <div
      className="filter-container"
      aria-hidden={!showFilter}
      onClick={(e) => handleContainerClick(e)}
    >
      <div className="filter">
        <h2>Filter</h2>
        <span className="close-btn" onClick={() => setShowFilter(false)}>
          x
        </span>
        <button
          className="reset-btn"
          onClick={() => setFilter({ animals: [], zones: [] })}
        >
          Reset
        </button>

        <div className="animals-filter">
          {animals.map((item) => (
            <div
              className="filter-type"
              key={item.animalID}
              onClick={() => handleClickAnimal(item.animalID)}
              data-filter={filter.animals.includes(item.animalID)}
            >
              <img src={item.imageSrc} alt={item.name} />
            </div>
          ))}
        </div>
        <hr className="hr-filter" />
        <div className="zone-filter">
          {zoneList.map((loc) => (
            <div
              className="zone-name"
              key={loc}
              onClick={() => handleClickZone(loc)}
              data-filter={filter.zones.includes(loc)}
              style={{ color: `${colors[loc.split(" ").join("")]}` }}
            >
              {loc}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Filter;
