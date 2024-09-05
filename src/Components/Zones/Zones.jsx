import React, { useCallback, useMemo, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import ZoneLineChart from "../MaterialUI/ZoneLineChart";
import PieGraph from "../MaterialUI/PieGraph";
import iconTable from "../../assets/icons/icons8-table-40.png";
import iconChart from "../../assets/icons/icons8-line-chart-48.png";
import iconPie from "../../assets/icons/icons8-pie-chart-48.png";
import iconChicken from "../../assets/icons/icons8-chicken-48.png";
import {
  createGridRows,
  createDataset,
  getZoneAnimals,
} from "../../Functions/helper";
import { camps } from "../../data/camps";
import { animals } from "../../data/animals";
import "./Zones.css";

/*
Additional Features:
1. Filter for animals/zones
2. Display Graph for Zone EXP (toggle betweel table/chart)
*/

const gridColumns = [
  { field: "id", headerName: "ID", width: 100 },
  { field: "zone", headerName: "Zone", width: 100 },
  { field: "totalXP", headerName: "Total XP", width: 100 },
  { field: "creditKill", headerName: "Credit(Kill)", width: 100 },
  { field: "creditAlly", headerName: "Credit(Ally)", width: 100 },
];

function Zones({ zones, lobbyLv, filter }) {
  const [graphType, setGraphType] = useState(null);

  let gridRows = createGridRows(zones, filter, lobbyLv);

  let dataset = createDataset(zones, filter);

  let zoneAnimals = getZoneAnimals(camps, animals);
  return (
    <>
      <header>
        <h1>Zone Data</h1>
      </header>

      {/* User Actions */}
      <div className="btn-group">
        <img
          className="img-icon"
          src={iconChicken}
          alt="animal icon"
          onClick={() => setGraphType(null)}
        />
        <img
          className="img-icon"
          src={iconTable}
          alt="table icon"
          onClick={() => setGraphType("table")}
        />
        <img
          className="img-icon"
          src={iconChart}
          alt="chart icon"
          onClick={() => setGraphType("chart")}
        />
      </div>

      {/* Display Graph */}
      {graphType ? (
        <section className="data-grid" data-graph={graphType}>
          {graphType === "table" && (
            <DataGrid
              rows={gridRows}
              columns={gridColumns}
              pageSizeOptions={[100]}
            />
          )}
          {graphType === "chart" && <ZoneLineChart dataset={dataset} />}
        </section>
      ) : (
        <section className="zone-agg">
          {zones.map((area) => (
            <>
              {Object.keys(area).length > 1 && (
                <article className="zone-article" key={area}>
                  <h2>{area.zone}</h2>
                  <div className="zone-animals">
                    {Object.keys(area).map((animal, idx) => (
                      <div
                        className="animal-card"
                        key={`${area.zone}-${area[animal.animalID]}-${idx}`}
                        data-idx={idx}
                      >
                        <img
                          src={area[animal].imageSrc}
                          alt={area[animal.name]}
                        />
                        <span>{area[animal].quantity}</span>
                      </div>
                    ))}
                  </div>
                </article>
              )}
            </>
          ))}
        </section>
      )}
    </>
  );
}

export default Zones;
