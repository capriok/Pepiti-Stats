"use client"

import React from "react"
import { dateIsValid } from "~/utils/dateIsValid"
import { handleLapTimes } from "~/utils/handleLapTimes"
import Table, { TableOptions } from "~/ui/Table"
import BikeTicTac from "~/components/pills/BikeTicTac"
import { handleAverageSpeed } from "~/utils/handleAverageSpeed"
import Image from "next/image"
import { handleSessionEnum } from "~/utils/handleSessionEnum"
import Link from "next/link"

interface Props {
  records: Array<any>
  table?: TableOptions
}

export default function RiderPersonalRecordsTable({ records, table }: Props) {
  const data = records
    .map((r) => ({
      _id: r._id,
      date: r.timestamp,
      track: r.track,
      bike: r.bike,
      category: r.category,
      averageSpeed: r.average_speed,
      split1: r.split_1,
      split2: r.split_2,
      lapTime: r.lap_time,
      session: r.session,
      isRace:
        r.session === RiderRecordRaceSession.RACE1 || r.session === RiderRecordRaceSession.RACE2,
    }))
    .sort((a, b) => b.date - a.date)

  console.log("%cRiderPersonalRecordsTable", "color: steelblue", { records: data })

  const columns = [
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
              src="/assets/brand/white-flag.svg"
              className="mx-2"
              width={14}
              height={14}
            />
          )}
        </div>
      ),
    },
  ]

  const sortKeys = ["date", "track", "lapTime", "split1", "split2", "averageSpeed", "wr"]

  return (
    <Table
      columns={columns}
      data={data}
      rankEnabled={false}
      searchKey="track"
      searchEnabled={true}
      paginationEnabled={true}
      sortingKeys={sortKeys}
      {...table}
    />
  )
}

enum RiderRecordRaceSession {
  PRACTICE = "PRACTICE",
  PRE_QUALIFY = "PRE-QUALIFY",
  QUALIFY_PRACTICE = "QUALIFY PRACTICE",
  QUALIFY = "QUALIFY",
  WARMUP = "WARMUP",
  RACE1 = "RACE1",
  RACE2 = "RACE2",
}
