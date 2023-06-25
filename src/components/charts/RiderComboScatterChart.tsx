"use client"

import React, { useState } from "react"
import { Chart as ChartJS, LinearScale, PointElement, LineElement, Tooltip, Legend } from "chart.js"
import { Scatter } from "react-chartjs-2"
import handlePlaceSuffix from "~/utils/handlePlaceSuffix"

export function RiderComboScatterChart({ data, comparables }) {
  const initialComparable = Object.keys(comparables)[0]
  const [dataSet, setDataSet] = useState(initialComparable)
  const yTitle = comparables[dataSet].titles[0].label
  const xTitle = comparables[dataSet].titles[1].label
  const tickLabel = comparables[dataSet].tickLabel
  const tooltipLabel = comparables[dataSet].toolTipLabel
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

  const dataSetFilter = comparables[dataSet].dataFilter
  const chartData = (stat) => ({
    x: stat[comparables[dataSet].titles[1].key],
    y: stat[comparables[dataSet].titles[0].key],
  })
  const scatterData = {
    labels: data.map((stat) => `${handlePlaceSuffix(stat.position)} - ${stat.name}`),
    datasets: [
      {
        label: `${yTitle} vs. ${xTitle}`,
        data: data.filter(dataSetFilter).map(chartData),
        backgroundColor: "#23bd38",
      },
    ],
  }
  const chartButtons = Object.keys(comparables).map((comparableKey) => {
    const isActive = comparableKey === dataSet
    return (
      <button
        key={comparableKey}
        className={`btn-ghost btn-sm btn bg-base-100 text-xs ${isActive ? "btn-active" : ""}`}
        onClick={() => setDataSet(comparableKey)}
      >
        {comparables[comparableKey].titles[0].label} vs.{" "}
        {comparables[comparableKey].titles[1].label}
      </button>
    )
  })

  return (
    <div className="rounded-b-lg bg-base-200 px-5 py-3">
      <div className="flex flex-wrap justify-center gap-2 py-4 md:gap-5">{chartButtons}</div>
      <Scatter options={options} data={scatterData} />
    </div>
  )
}

ChartJS.register(LinearScale, PointElement, LineElement, Tooltip, Legend)
