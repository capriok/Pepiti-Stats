"use client"

import React from "react"
import Image from "next/image"
import Link from "next/link"
import Table, { TableOptions } from "~/ui/Table"
import BikeTicTac from "~/components/pills/BikeTicTac"
import { dateIsValid } from "~/utils/dateIsValid"
import { handleLapTimes } from "~/utils/handleLapTimes"
import { handleAverageSpeed } from "~/utils/handleAverageSpeed"
import { handleSessionEnum } from "~/utils/handleSessionEnum"
import { RiderRecordRaceSession } from "~/utils/constants"

interface Props extends TableOptions {
  records: Array<any>
  columns: any
}

export default function RiderWorldRecordsTable({ records, columns, ...rest }: Props) {
  const data = records
    .map((r) => ({
      _id: r._id,
      wr: r.wr,
      date: r.timestamp,
      track: r.track,
      lapTime: r.lap_time,
      split1: r.split_1,
      split2: r.split_2,
      averageSpeed: r.average_speed,
      bike: r.bike,
      category: r.category,
      session: r.session,
      isRace:
        r.session === RiderRecordRaceSession.RACE1 || r.session === RiderRecordRaceSession.RACE2,
    }))
    .sort((a, b) => b.date - a.date)

  console.log("%cRiderWorldRecordsTable", "color: steelblue", { records: data })

  return (
    <Table data={data} columns={columns} rankEnabled={false} {...rest} />
  )
}

export const riderWorldRecordsColumns = [
  {
    key: "date",
    label: "Date",
    render: (date) =>
      dateIsValid(new Date(date * 1000)) ? new Date(date * 1000).toLocaleDateString() : "-",
  },
  {
    key: "track",
    label: "Track",
    render: (track, row) => (
      <Link
        href={`/records/track?track=${track}&filter=${row.category}`}
        className="font-semibold text-primary/80"
      >
        {track ? track : "-"}
      </Link>
    ),
  },
  {
    key: "lapTime",
    label: "Lap Time",
    render: (lapTime) => (lapTime ? handleLapTimes(lapTime) : "-"),
  },
  {
    key: "split1",
    label: "Split 1",
    render: (split1) => (split1 ? handleLapTimes(split1) : "-"),
  },
  {
    key: "split2",
    label: "Split 2",
    render: (split2) => (split2 ? handleLapTimes(split2) : "-"),
  },
  {
    key: "averageSpeed",
    label: "Average Speed",
    render: (averageSpeed) => (averageSpeed ? handleAverageSpeed(averageSpeed) : "-"),
  },
  {
    key: "bike",
    label: "Bike",
    render: (bike) => <BikeTicTac bike={bike} />,
  },
  {
    key: "session",
    label: "Session",
    render: (session, row) => (
      <div className="flex w-full justify-between">
        {handleSessionEnum(session)}
        {row.isRace && (
          <Image
            alt="wr"
            src="/assets/brand/gold-flag.svg"
            className="mx-2"
            width={14}
            height={14}
          />
        )}
      </div>
    ),
  },
]

export const riderWorldRecordsColumnsWithFilters = [
  {
    key: "date",
    label: "Date",
    render: (date) =>
      dateIsValid(new Date(date * 1000)) ? new Date(date * 1000).toLocaleDateString() : "-",
  },
  {
    key: "track",
    label: "Track",
    render: (track, row) => (
      <Link
        href={`/records/track?track=${track}&filter=${row.category}`}
        className="font-semibold text-primary/80"
      >
        {track ? track : "-"}
      </Link>
    ),
    onFilter: (value, row) => row.track.toLowerCase().includes(value.toLowerCase()),
  },
  {
    key: "lapTime",
    label: "Lap Time",
    render: (lapTime) => (lapTime ? handleLapTimes(lapTime) : "-"),
  },
  {
    key: "split1",
    label: "Split 1",
    render: (split1) => (split1 ? handleLapTimes(split1) : "-"),
  },
  {
    key: "split2",
    label: "Split 2",
    render: (split2) => (split2 ? handleLapTimes(split2) : "-"),
  },
  {
    key: "averageSpeed",
    label: "Average Speed",
    render: (averageSpeed) => (averageSpeed ? handleAverageSpeed(averageSpeed) : "-"),
  },
  {
    key: "bike",
    label: "Bike",
    render: (bike) => <BikeTicTac bike={bike} />,
  },
  {
    key: "session",
    label: "Session",
    render: (session, row) => (
      <div className="flex w-full justify-between">
        {handleSessionEnum(session)}
        {row.isRace && (
          <Image
            alt="wr"
            src="/assets/brand/gold-flag.svg"
            className="mx-2"
            width={14}
            height={14}
          />
        )}
      </div>
    ),
  },
]
