export function createGridRows(data, filter, lobbyLv) {
  data.sort((a, b) => a.zone > b.zone);
  let rows = [];
  data.map((area, key) => {
    if (!filter.zones.includes(area.zone)) {
      let row = {
        id: key + 1,
        zone: area.zone,
        totalXP: 0,
        creditKill: 0,
        creditAlly: 0,
      };
      for (const [key, value] of Object.entries(area)) {
        if (key !== "zone") {
          const {
            baseXP,
            perLevelXP,
            creditAlly,
            creditKill,
            quantity,
            level,
          } = value;

          // add xp
          let addXP =
            (level[lobbyLv - 6] * perLevelXP + baseXP) * quantity + row.totalXP;
          // add credit kill
          let addKill = creditKill * quantity + row.creditKill;
          // add credit ally
          let addAlly = creditAlly * quantity + row.creditAlly;

          row = {
            ...row,
            totalXP: addXP,
            creditKill: addKill,
            creditAlly: addAlly,
          };
        }
      }
      rows.push(row);
    }
  });
  return rows;
}

export function createDataset(data, filter) {
  data.sort((a, b) => a.zone > b.zone);
  let dataset = [];
  for (let i = 6; i <= 20; i++) {
    let row = {
      lobbyLv: i,
    };
    data.map((area) => {
      if (!filter.zones.includes(area.zone)) {
        let zoneName = area.zone.split(" ").join("");
        row = { ...row, [zoneName]: 0 };
        for (const [key, value] of Object.entries(area)) {
          if (key !== "zone") {
            const { baseXP, perLevelXP, quantity, level } = value;

            // add xp
            let addXP =
              (level[i - 6] * perLevelXP + baseXP) * quantity + row[zoneName];
            row = { ...row, [zoneName]: addXP };
          }
        }
      }
    });
    let sort = Object.entries(row).sort(
      (a, b) => b[b.length - 1] - a[a.length - 1]
    );

    let sortedRow = Object.fromEntries(sort);
    dataset.push(sortedRow);
  }
  return dataset;
}

export function getZoneAnimals(camps, animals) {
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
    });
  }

  return zoneData;
}
