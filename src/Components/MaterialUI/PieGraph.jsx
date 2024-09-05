import React from "react";
import { PieChart } from "@mui/x-charts/PieChart";
import { colors } from "../../data/colors";

function PieGraph({ data }) {
  const pieData = createPieData();
  function createPieData() {
    let newData = [];
    data.map((item) => {
      let zoneName = item.zone.split(" ").join("");
      let newObj = {
        id: item.id,
        label: item.zone,
        value: item.totalXP,
        color: colors[zoneName],
      };
      newData.push(newObj);
    });

    newData.sort((a, b) => b.value - a.value);
    return newData;
  }
  return (
    <PieChart
      series={[
        {
          data: pieData,
          highlightScope: { faded: "global", highlighted: "item" },
          faded: { innerRadius: 30, additionalRadius: -30, color: "gray" },
          valueFormatter: (zone) => `${zone.value} XP`,
        },
      ]}
      slotProps={{
        legend: {
          hidden: false,
          labelStyle: {
            fontSize: 14,
            fontWeight: 600,
          },
        },
      }}
      width={800}
      height={600}
    />
  );
}

export default PieGraph;
