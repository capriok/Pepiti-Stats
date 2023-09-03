import Link from "next/link"
import MMRPill from "~/components/pills/MMRPill"
import Pill from "~/components/pills/Pill"
import { TableColumn } from "~/ui/Table"
import { dateIsValid } from "~/utils/dateIsValid"
import handlePlaceSuffix from "~/utils/handlePlaceSuffix"

export const riderRecentRacesData = (races) =>
  races.map((race) => ({
    _id: race._id,
    date: parseInt(race._id.slice(0, 8), 16) * 1000,
    track: race.track,
    position: race?.Classification?.Pos ?? "",
    mmrGain: race.MMR.total,
    newMMR: race.MMR.old_MMR + race.MMR.total,
  }))

export const riderRecentRacesColumns = [
  {
    key: "date",
    label: "Date",
    render: (date) => (dateIsValid(new Date(date)) ? new Date(date).toLocaleDateString() : ""),
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

export const riderRecentRacesColumnsWithControls = riderRecentRacesColumns.map((c) => {
  let col = { ...c } as TableColumn

  if (col.key === "track") {
    col = {
      ...col,
      onFilter: (value, row) => row.track.toLowerCase().includes(value.toLowerCase()),
    }
  }
  return col
})
