import React from "react"
import Table from "~/ui/Table"
import MMRPill from "~/components/pills/MMRPill"
import Pill from "~/components/pills/Pill"
import RiderLink from "~/components/RiderLink"
import RiderRecentRacesTableRow from "~/components/tables/expandable/RiderRecentRacesTableRow"
import { toFixedIfNecessary } from "~/utils/toFixedIfNecessary"

interface Props {
  standings: any
}

export default function RaceMMRAnalysis({ standings }: Props) {
  const columns = [
    {
      key: "name",
      label: "Name",
      render: (name, row) => <RiderLink href={`/profile/${row._id}`} name={name} />,
    },
    {
      key: "mmrGain",
      label: (
        <div className="tooltip-accent tooltip tooltip-bottom" data-tip="MMR Gain +/-">
          MMR +/-
        </div>
      ),
      render: (mmrGain) => <MMRPill mmr={toFixedIfNecessary(mmrGain)} />,
    },
    {
      key: "newMmr",
      label: (
        <div className="tooltip-accent tooltip tooltip-bottom" data-tip="Old MMR + MMR Gain">
          New MMR
        </div>
      ),
      render: (newMmr) => <Pill text={newMmr} />,
    },
    {
      key: "bpp",
      label: (
        <div className="tooltip-accent tooltip tooltip-bottom" data-tip="Position Bonus">
          BPP
        </div>
      ),
      render: (bpp) => <MMRPill mmr={toFixedIfNecessary(bpp)} />,
    },
    {
      key: "prb",
      label: (
        <div className="tooltip-accent tooltip tooltip-bottom" data-tip="Positive Rank Bonus">
          PRB
        </div>
      ),
      render: (prb) => <MMRPill mmr={toFixedIfNecessary(prb)} />,
    },
    {
      key: "nrb",
      label: (
        <div className="tooltip-accent tooltip tooltip-bottom" data-tip="Negative Rank Bonus">
          NRB
        </div>
      ),
      render: (nrb) => <MMRPill mmr={toFixedIfNecessary(nrb)} />,
    },
    {
      key: "fl",
      label: (
        <div className="tooltip-accent tooltip tooltip-bottom" data-tip="Fastest Lap">
          FL
        </div>
      ),
      render: (fl) => <MMRPill mmr={toFixedIfNecessary(fl)} />,
    },
    {
      key: "hs",
      label: (
        <div className="tooltip-accent tooltip tooltip-bottom" data-tip="Holeshot">
          HS
        </div>
      ),
      render: (hs) => <MMRPill mmr={toFixedIfNecessary(hs)} />,
    },
  ]

  const sortKeys = ["mmrGain", "newMmr", "bpp", "prb", "nrb", "fl", "hs"]

  return (
    <Table
      columns={columns}
      data={standings}
      sortingKeys={sortKeys}
      expandable={{
        render: (row) => <RiderRecentRacesTableRow row={row} />,
      }}
    />
  )
}
