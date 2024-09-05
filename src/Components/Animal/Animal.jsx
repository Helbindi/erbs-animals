import React, { useState } from "react";
import { animals } from "../../data/animals";
import { DataGrid } from "@mui/x-data-grid";

/*
  Additional Features:
  1. Animal Filter
  2. Show Line Area Chart of level scaling
  3. Show individual animal stats
*/

const columns = [
  { field: "id", headerName: "ID", width: 80 },
  { field: "name", headerName: "Name", width: 100 },
  { field: "baseXP", headerName: "BaseXP", width: 90 },
  { field: "perLevelXP", headerName: "XP per Level", width: 100 },
  { field: "creditKill", headerName: "Credit(Kill)", width: 100 },
  { field: "creditAlly", headerName: "Credit(Ally)", width: 100 },
  { field: "respawn", headerName: "Repsawn", width: 80 },
];

function Animal({ filter }) {
  const rows = createRows();

  function createRows() {
    let rows = [];
    animals.map((animal) => {
      if (!filter.animals.includes(animal.animalID)) {
        animal = { ...animal, id: animal.animalID };
        rows.push(animal);
      }
    });
    return rows;
  }
  return (
    <>
      <header>
        <h1>Animal Data</h1>
      </header>
      <section className="data-grid">
        <DataGrid rows={rows} columns={columns} pageSizeOptions={[100]} />
      </section>
    </>
  );
}

export default Animal;
