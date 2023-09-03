import Link from "next/link"
import MMRPill from "~/components/pills/MMRPill"
import Pill from "~/components/pills/Pill"
import { dateIsValid } from "~/utils/dateIsValid"
import { handleLapTimes } from "~/utils/handleLapTimes"
import handlePlaceSuffix from "~/utils/handlePlaceSuffix"
import { handleRaceGap } from "~/utils/handleRaceGap"

export const riderRacesData = (races) =>
  races.map((race) => ({
    date: parseInt(race._id.slice(0, 8), 16) * 1000,
    _id: race._id,
    track: race.track,
    position: race?.Classification?.Pos ?? "",
    laps: race?.Classification?.Laps ?? "",
    gap: race?.Classification?.Gap ?? "",
    penalties: race?.Classification?.Penalty ?? "",
    fastestLap: race.FastestLap,
    mmrGain: race.MMR.total,
    newMMR: race.MMR.old_MMR + race.MMR.total,
  }))

export const riderRacesColumns = [
  {
    key: "date",
    label: "Date",
    render: (date) => dateIsValid(new Date(date)) && new Date(date).toLocaleDateString(),
  },
  {
    key: "track",
    label: "Track",
    render: (track, row) =>
      track && (
        <Link href={`/races/${row._id}`} className="font-semibold text-primary/80">
          {track}
        </Link>
      ),
  },
  {
    key: "position",
    label: "Position",
    render: (position) => (position ? <b>{handlePlaceSuffix(position)}</b> : ""),
  },
  {
    key: "gap",
    label: "Gap",
    render: (gap) => (gap !== undefined && gap !== "" ? handleRaceGap(gap) : ""),
  },
  {
    key: "laps",
    label: "Laps",
    render: (laps) => (laps ? laps : ""),
  },
  {
    key: "penalties",
    label: "Penalties",
    render: (penalties) => (penalties ? penalties + " s" : ""),
  },
  {
    key: "fastestLap",
    label: "Fastest Lap",
    render: (fastestLap) => (fastestLap ? handleLapTimes(fastestLap) : ""),
  },
  {
    key: "mmrGain",
    label: "MMR +/-",
    render: (mmrGain) => (mmrGain ? <MMRPill mmr={mmrGain} /> : ""),
  },
  {
    key: "newMMR",
    label: "New MMR",
    render: (newMMR) => (newMMR ? <Pill text={newMMR} /> : ""),
  },
]

export const riderRacesColumnsWithControls = [
  {
    key: "date",
    label: "Date",
    render: (date) => dateIsValid(new Date(date)) && new Date(date).toLocaleDateString(),
  },
  {
    key: "track",
    label: "Track",
    render: (track, row) =>
      track && (
        <Link href={`/races/${row._id}`} className="font-semibold text-primary/80">
          {track}
        </Link>
      ),
    onFilter: (value, row) => row.track.toLowerCase().includes(value.toLowerCase()),
  },
  {
    key: "position",
    label: "Position",
    render: (position) => (position ? <b>{handlePlaceSuffix(position)}</b> : ""),
  },
  {
    key: "gap",
    label: "Gap",
    render: (gap) => (gap !== undefined && gap !== "" ? handleRaceGap(gap) : ""),
  },
  {
    key: "laps",
    label: "Laps",
    render: (laps) => (laps ? laps : ""),
  },
  {
    key: "penalties",
    label: "Penalties",
    render: (penalties) => (penalties ? penalties + " s" : ""),
  },
  {
    key: "fastestLap",
    label: "Fastest Lap",
    render: (fastestLap) => (fastestLap ? handleLapTimes(fastestLap) : ""),
  },
  {
    key: "mmrGain",
    label: "MMR +/-",
    render: (mmrGain) => (mmrGain ? <MMRPill mmr={mmrGain} /> : ""),
  },
  {
    key: "newMMR",
    label: "New MMR",
    render: (newMMR) => (newMMR ? <Pill text={newMMR} /> : ""),
  },
]
