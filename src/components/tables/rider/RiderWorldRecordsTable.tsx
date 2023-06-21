"use client"

import React from "react"
import Image from "next/image"
import Table from "~/ui/Table"
import BikeTicTac from "~/components/pills/BikeTicTac"
import { dateIsValid } from "~/utils/dateIsValid"
import { handleLapTimes } from "~/utils/handleLapTimes"
import { handleAverageSpeed } from "~/utils/handleAverageSpeed"
import { handleSessionEnum } from "~/utils/handleSessionEnum"

interface Props {
  records: Array<any>
}

export default function RiderWorldRecordsTable({ records }: Props) {
  const data = records
    .map((record) => ({
      _id: record._id,
      wr: record.wr,
      date: parseInt(record._id.slice(0, 8), 16) * 1000,
      track: record.track,
      bike: record.bike,
      averageSpeed: record.average_speed,
      split1: record.split_1,
      split2: record.split_2,
      lapTime: record.lap_time,
      session: record.session,
      isRace:
        record.session === RiderRecordRaceSession.RACE1 ||
        record.session === RiderRecordRaceSession.RACE2,
    }))
    .sort((a, b) => b.date - a.date)

  console.log("%cRiderWorldRecordsTable", "color: steelblue", { records: data })

  const columns = [
    {
      key: "date",
      label: "Date",
      render: (date) => (dateIsValid(new Date(date)) ? new Date(date).toLocaleDateString() : "-"),
    },
    {
      key: "track",
      label: "Track",
      render: (track) => (track ? track : "-"),
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

  const sortKeys = ["date", "track", "lapTime", "split1", "split2", "averageSpeed"]

  return (
    <Table
      columns={columns}
      data={data}
      rankEnabled={false}
      sortingEnabled={true}
      sortingKeys={sortKeys}
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
