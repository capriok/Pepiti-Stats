"use client"

import React, { useState } from "react"
import { Chart as ChartJS, LinearScale, PointElement, LineElement, Tooltip, Legend } from "chart.js"
import { Scatter } from "react-chartjs-2"
import handlePlaceSuffix from "~/utils/handlePlaceSuffix"
import { Button } from "~/ui/Button"

interface Props {
  standings: Array<any>
  labels: any
}

export function RiderComboScatterChart({ standings, labels }: Props) {
  const initialLabel = Object.keys(labels)[0]
  const [labelData, setLabelData] = useState(initialLabel)

  const yTitle = labels[labelData].titles[0].label
  const xTitle = labels[labelData].titles[1].label
  const tickLabel = labels[labelData].tickLabel
  const tooltipLabel = labels[labelData].toolTipLabel
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

  const chartData = (stat) => ({
    x: stat[labels[labelData].titles[1].key],
    y: stat[labels[labelData].titles[0].key],
  })

  const scatterData = {
    labels: standings.map((stat) => `${handlePlaceSuffix(stat.position)} - ${stat.name}`),
    datasets: [
      {
        label: `${yTitle} vs. ${xTitle}`,
        data: standings.filter(labels[labelData].dataFilter).map(chartData),
        backgroundColor: "#23bd38",
      },
    ],
  }

  const chartButtons = Object.keys(labels).map((labelKey) => {
    const isActive = labelKey === labelData
    return (
      <Button
        key={labelKey}
        className={`border border-accent/20 text-xs ${isActive ? "bg-base-primary" : ""}`}
        onClick={() => setLabelData(labelKey)}
      >
        {labels[labelKey].titles[0].label} vs. {labels[labelKey].titles[1].label}
      </Button>
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
