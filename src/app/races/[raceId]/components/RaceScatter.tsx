import React from "react"
import { Labels, RiderComboScatterChart } from "~/components/charts/RiderComboScatterChart"
import { handleLapTimes } from "~/utils/handleLapTimes"

export default function RaceScatter({ standings }) {
  return <RiderComboScatterChart standings={standings} labels={labels} />
}

const labels: Labels = {
  rtfl: {
    titles: [
      { label: "Fastest Lap", key: "fastestLap" },
      { label: "Race Time", key: "raceTime" },
    ],
    tickLabel: (val) => `${handleLapTimes(val)}`,
    toolTipLabel: (val) => [`FL: ${handleLapTimes(val.raw.y)}`, `RT: ${handleLapTimes(val.raw.x)}`],
    dataFilter: (stat) => stat.raceTime > 0 && stat.raceTime !== "-" && stat.fastestLap > 0,
  },
  posGain: {
    titles: [
      { label: "MMR Gain", key: "mmrGain" },
      { label: "Position", key: "position" },
    ],
    tickLabel: (val) => `${val}`,
    toolTipLabel: (val) => [`MMR Gain: ${val.raw.y}`, `Position: ${val.raw.x}`],
    dataFilter: (stat) => true,
  },
  gainBpp: {
    titles: [
      { label: "MMR Gain", key: "mmrGain" },
      { label: "BPP", key: "bpp" },
    ],
    tickLabel: (val) => `${val}`,
    toolTipLabel: (val) => [`MMR Gain: ${val.raw.y}`, `BPP: ${val.raw.x.toFixed(2)}`],
    dataFilter: (stat) => true,
  },
  mmrPos: {
    titles: [
      { label: "MMR", key: "newMmr" },
      { label: "Position", key: "position" },
    ],
    tickLabel: (val) => `${val}`,
    toolTipLabel: (val) => [`MMR: ${val.raw.y}`, `Position: ${val.raw.x}`],
    dataFilter: (stat) => true,
  },
}
