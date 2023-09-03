import Image from "next/image"
import Link from "next/link"
import BikeTicTac from "~/components/pills/BikeTicTac"
import { TableColumn } from "~/ui/Table"
import { RiderRecordRaceSession } from "~/utils/constants"
import { dateIsValid } from "~/utils/dateIsValid"
import { handleAverageSpeed } from "~/utils/handleAverageSpeed"
import { handleLapTimes } from "~/utils/handleLapTimes"
import { handleSessionEnum } from "~/utils/handleSessionEnum"

export const riderPersonalRecordsData = (records) =>
  records
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

export const riderPersonalRecordsColumns = [
  {
    key: "date",
    label: "Date",
    render: (date) =>
      dateIsValid(new Date(date)) ? new Date(date * 1000).toLocaleDateString() : "",
  },
  {
    key: "track",
    label: "Track",
    render: (track, row) =>
      track && (
        <Link
          href={`/records/track?track=${track}&filter=${row.category}`}
          className="font-semibold text-primary/80"
        >
          {track}
        </Link>
      ),
  },
  {
    key: "lapTime",
    label: "Lap Time",
    render: (lapTime) => (lapTime ? handleLapTimes(lapTime) : ""),
  },
  {
    key: "split1",
    label: "Split 1",
    render: (split1) => (split1 ? handleLapTimes(split1) : ""),
  },
  {
    key: "split2",
    label: "Split 2",
    render: (split2) => (split2 ? handleLapTimes(split2) : ""),
  },
  {
    key: "averageSpeed",
    label: "Average Speed",
    render: (averageSpeed) => (averageSpeed ? handleAverageSpeed(averageSpeed) : ""),
  },
  {
    key: "bike",
    label: "Bike",
    render: (bike) => <BikeTicTac bike={bike} />,
  },
  {
    key: "session",
    label: "Session",
    render: (session, row) =>
      session && (
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

export const riderPersonalRecordsColumnsWithControls = riderPersonalRecordsColumns.map((c) => {
  let col = { ...c } as TableColumn

  if (col.key === "track") {
    col = {
      ...col,
      onFilter: (value, row) => row.track.toLowerCase().includes(value.toLowerCase()),
    }
  }
  return col
})
