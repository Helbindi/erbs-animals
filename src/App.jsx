import { useRef, useState } from "react";
import Canvas from "./Components/Canvas/Canvas";
import Marker from "./Components/Marker/Marker";
import { animals } from "./data/animals";
import { camps } from "./data/camps";
import Selection from "./Components/Selection/Selection";
import Zones from "./Components/Zones/Zones";
import LevelSlider from "./Components/LevelSlider/LevelSlider";
import Animal from "./Components/Animal/Animal";
import DialogModal from "./Components/DialogModal/DialogModal";
import Filter from "./Components/Filter/Filter";
import flagImg from "./assets/icons/icons8-flag-62.png";

function App() {
  const [selected, setSelected] = useState([]);
  const [toggle, setToggle] = useState("Animals");
  const [lobbyLv, setLobbyLv] = useState(6);
  const [filter, setFilter] = useState({ animals: [], zones: [] });
  const [showFilter, setShowFilter] = useState(false);
  const data = readData();
  const zones = aggregateZones();
  const dialogRef = useRef(null);

  /*
    Read data from two files (animals.js and camps.js) and return new Array of Objs for animal camp data
      Return data: [
        {
          animal: {
            animalID: Integer,
            baseLevel: Integer,
            baseXP: Integer,
            perLevelXP: Integer,
            creditKill: Integer,
            creditAlly: Integer,
            respawn: Integer,
            name: String,
            imageSrc: String,
          }
          animalID: Integer,
          size: Integer
          zone: String,
          position: {
            x: Integer,
            y: Integer
          }
        },
      ]
  */
  function readData() {
    let data = [];
    for (const [key, value] of Object.entries(camps)) {
      value.map((camp) => {
        if (
          !filter.animals.includes(camp.animalID) &&
          !filter.zones.includes(camp.zone)
        ) {
          const animal = animals[camp.animalID - 1];
          const newObj = { animal, ...camp };
          data.push(newObj);
        }
      });
    }
    return data;
  }

  // Save clicked camp markers to a list
  function handleAnimalClick(e, markData) {
    if (toggle === "Selection") {
      // check for duplicates
      let dupe = false;
      selected.map((item) => {
        if (
          item.position.x === markData.position.x &&
          item.position.y === markData.position.y
        ) {
          dupe = true;
        }
      });

      // update State if its not a duplicate
      if (!dupe) {
        setSelected((prev) => {
          return [...prev, markData];
        });
      } else {
        setSelected((prev) => {
          // find index position of the animal camp in the array
          const pos = prev.findIndex(
            (camp) =>
              camp.position.x === markData.position.x &&
              camp.position.y === markData.position.y
          );

          if (pos === 0 && prev.length > 1) {
            return prev;
          } else {
            return prev.slice(0, pos);
          }
        });
      }
    }
  }

  // Load a saved route
  function loadRoute(route) {
    setSelected(route);
  }

  // Get aggregate of each zone in terms of # of animals
  function aggregateZones() {
    let zoneData = [];
    for (const key of Object.keys(camps)) {
      if (key === "Gas" || key === "Police" || key === "Fire") {
        zoneData.push({ zone: `${key} Station` });
      } else {
        zoneData.push({ zone: key });
      }
    }

    for (const [key, value] of Object.entries(camps)) {
      value.map((camp) => {
        if (
          !filter.animals.includes(camp.animalID) &&
          !filter.zones.includes(camp.zone)
        ) {
          const animal = animals[camp.animalID - 1];
          for (const entry of zoneData) {
            if (entry.zone === camp.zone) {
              if (!entry[animal.name]) {
                entry[animal.name] = { ...animal, quantity: camp.size };
              } else {
                entry[animal.name] = {
                  ...entry[animal.name],
                  quantity: entry[animal.name].quantity + camp.size,
                };
              }
            }
          }
        }
      });
    }

    return zoneData;
  }

  // Function for useCanvas Hook to render onto Canvas
  function draw(c) {
    // document.addEventListener("click", (e) => {
    //   console.log(`${e.clientX} ${e.clientY}`);
    // });

    c.reset(); // reset the Canvas drawings for new re-renders due to State change

    if (toggle === "Selection") {
      if (selected.length !== 0) {
        c.lineWidth = 5;
        c.beginPath(); // Start a new path
        c.setLineDash([8]);
        selected.map((mark, key) => {
          if (key === 0) {
            const image = new Image(32, 32);
            image.src = flagImg;
            image.onload = () =>
              c.drawImage(
                image,
                mark.position.x - image.width / 3,
                mark.position.y - image.height,
                image.width,
                image.height
              );
            c.moveTo(mark.position.x, mark.position.y);
          } else {
            c.lineTo(mark.position.x, mark.position.y);
          }
        });

        c.strokeStyle = "orange";
        c.stroke(); // Render the path
      }
    }
  }

  // Update the lobby level State
  function handleLevelChange(e) {
    if (e.target.innerText === "+" && lobbyLv < 20) {
      setLobbyLv((prev) => prev + 1);
    }
    if (e.target.innerText === "-" && lobbyLv > 6) {
      setLobbyLv((prev) => prev - 1);
    }
  }

  // Handler to change between zones and selection content
  function toggleContent(e) {
    e.preventDefault();
    const type = e.target.innerText;

    // Reset States when swapping
    if (type !== "Selection") setSelected([]);

    if (toggle !== type) {
      setToggle(type);
    }
  }

  // Function to toggle the Modal on/off
  function toggleModal(e) {
    e.preventDefault();
    const isOpen = dialogRef.current.open;
    if (!isOpen) {
      dialogRef.current.showModal();
    } else {
      dialogRef.current.close();
    }
  }

  return (
    <main className="main-container">
      {/* <DialogModal dialogRef={dialogRef} toggleModal={toggleModal} /> */}

      {/* Filter Menu */}
      <Filter
        filter={filter}
        showFilter={showFilter}
        setFilter={setFilter}
        setShowFilter={setShowFilter}
      />

      <section className="map-container" id="map-container">
        <Canvas draw={draw} />
        {/* Add camp markers ontop of Canvas */}
        {data !== null &&
          data.map((camp) => (
            // Implicit return
            <Marker
              camp={camp}
              key={`${camp.zone}${camp.position.x}${camp.position.y}`}
              handleAnimalClick={handleAnimalClick}
              selected={selected}
            />
          ))}
      </section>

      <section className="content-container">
        {/* Navigation */}
        <nav className="nav-content">
          <div className="btn-group">
            <button onClick={(e) => toggleContent(e)}>Animals</button>
            <button onClick={(e) => toggleContent(e)}>Zones</button>
            <button onClick={(e) => toggleContent(e)}>Selection</button>
            <button
              className="btn-filter"
              onClick={() => setShowFilter(!showFilter)}
            >
              Filter
            </button>
            {/* <button onClick={(e) => toggleModal(e)}>Help</button> */}
            <LevelSlider
              lobbyLv={lobbyLv}
              handleLevelChange={handleLevelChange}
            />
          </div>
        </nav>

        {/* Content */}
        <section className="main-content">
          {toggle === "Animals" && <Animal filter={filter} />}

          {toggle === "Zones" && (
            <Zones
              zones={zones}
              lobbyLv={lobbyLv}
              filter={filter}
              setFilter={setFilter}
            />
          )}

          {toggle === "Selection" && (
            <Selection
              selected={selected}
              lobbyLv={lobbyLv}
              handleAnimalClick={handleAnimalClick}
              loadRoute={loadRoute}
            />
          )}
        </section>
      </section>
    </main>
  );
}

export default App;
