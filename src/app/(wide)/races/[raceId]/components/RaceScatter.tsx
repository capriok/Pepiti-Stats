"use client"

import React, { useState } from "react"
import { Chart as ChartJS, LinearScale, PointElement, LineElement, Tooltip, Legend } from "chart.js"
import { Scatter } from "react-chartjs-2"
import { handleLapTimes } from "~/utils/handleLapTimes"
import handlePlaceSuffix from "~/utils/handlePlaceSuffix"
ChartJS.register(LinearScale, PointElement, LineElement, Tooltip, Legend)

type Title = {
  label: string
  key: string
}

type Comparable = {
  titles: Title[]
  tickLabel: (val: any) => string
  toolTipLabel: (val: any) => string[]
  dataFilter: (stat: any) => boolean
}

type Comparables = {
  [key: string]: Comparable
}

// To add a new data set, create a new key in COMPARABLES. The key needs to be in standings obj.
const COMPARABLES: Comparables = {
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
}

export function RaceScatter({ standings }) {
  const [dataSet, setDataSet] = useState<string>("rtfl")
  const yTitle = COMPARABLES[dataSet].titles[0].label
  const xTitle = COMPARABLES[dataSet].titles[1].label
  const tickLabel = COMPARABLES[dataSet].tickLabel
  const tooltipLabel = COMPARABLES[dataSet].toolTipLabel
  const options = {
    scales: {
      y: {
        title: { display: true, text: yTitle },
        beginAtZero: false,
        ticks: {
          callback: tickLabel,
        },
      },
      x: {
        title: { display: true, text: xTitle },
        beginAtZero: false,
        ticks: {
          callback: tickLabel,
        },
      },
    },
    plugins: {
      tooltip: {
        callbacks: {
          label: tooltipLabel,
        },
      },
    },
    elements: {
      point: {
        radius: 5,
      },
    },
  }

  const dataSetFilter = COMPARABLES[dataSet].dataFilter
  const chartData = (stat) => ({
    x: stat[COMPARABLES[dataSet].titles[1].key],
    y: stat[COMPARABLES[dataSet].titles[0].key],
  })
  const data = {
    labels: standings.map((stat) => `${handlePlaceSuffix(stat.position)} - ${stat.name}`),
    datasets: [
      {
        label: `${yTitle} vs. ${xTitle}`,
        data: standings.filter(dataSetFilter).map(chartData),
        backgroundColor: "#23bd38",
      },
    ],
  }
  const chartButtons = Object.keys(COMPARABLES).map((comparableKey) => {
    const isActive = comparableKey === dataSet
    return (
      <button
        key={comparableKey}
        className={`btn-ghost btn-sm btn bg-base-100 text-xs ${isActive ? "btn-active" : ""}`}
        onClick={() => setDataSet(comparableKey)}
      >
        {COMPARABLES[comparableKey].titles[0].label} vs.
        {COMPARABLES[comparableKey].titles[1].label}
      </button>
    )
  })

  return (
    <div className="rounded-b-lg bg-base-200 px-5 py-3">
      <div className="flex justify-center gap-5 py-4">{chartButtons}</div>
      <Scatter options={options} data={data} />
    </div>
  )
}
