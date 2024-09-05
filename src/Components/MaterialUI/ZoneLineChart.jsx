import React from "react";
import { LineChart } from "@mui/x-charts/LineChart";
import { colors } from "../../data/colors";

const keyToLabel = {
  Alley: "Alley",
  Archery: "Archery",
  Beach: "Beach",
  Cemetery: "Cemetery",
  Chapel: "Chapel",
  Dock: "Dock",
  Factory: "Factory",
  FireStation: "Fire Station",
  Forest: "Forest",
  GasStation: "Gas Station",
  Hospital: "Hospital",
  Hotel: "Hotel",
  PoliceStation: "Police Station",
  Pond: "Pond",
  School: "School",
  Stream: "Stream",
  Temple: "Temple",
  Uptown: "Uptown",
  Warehouse: "Warehouse",
};

const customize = {
  width: 700,
  height: 800,
  legend: { hidden: true },
};

const levels = [6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20];

// When you use the filter by zones, something goes wrong with the line chart.

function ZoneLineChart({ dataset }) {
  const label = updatedLabel();

  function updatedLabel() {
    let obj = {};
    const keys = Object.keys(dataset[0]);
    keys.pop();

    for (const x of keys) {
      obj = { ...obj, [x]: keyToLabel[x] };
    }
    return obj;
  }
  return (
    <LineChart
      xAxis={[
        {
          dataKey: "lobbyLv",
          valueFormatter: (value) => `Lv.${value.toString()}`,
          data: levels,
        },
      ]}
      series={Object.keys(label).map((key) => ({
        dataKey: key,
        label: keyToLabel[key],
        color: colors[key],
        showMark: false,
        valueFormatter: (value) => `${value.toString()} XP`,
      }))}
      dataset={dataset}
      {...customize}
    />
  );
}

export default ZoneLineChart;
