import React from "react"
import MMRPill from "~/components/pills/MMRPill"
import Pill from "~/components/pills/Pill"
import RiderLink from "~/components/RiderLink"
import Table from "~/components/Table/Table"
import { toFixedIfNecessary } from "~/utils/toFixedIfNecessary"

interface Props {
  standings: any
}

export default function MMRAnalysisTable({ standings }: Props) {
  const columns = [
    {
      key: "name",
      label: "Name",
      render: (name, row) => <RiderLink href={`/profile/${row._id}`}>{name}</RiderLink>,
    },
    {
      key: "mmrGain",
      label: (
        <div className="tooltip tooltip-bottom tooltip-accent" data-tip="MMR Gain +/-">
          MMR +/-
        </div>
      ),
      render: (mmrGain) => <MMRPill mmr={toFixedIfNecessary(mmrGain)} />,
    },
    {
      key: "newMmr",
      label: (
        <div className="tooltip tooltip-bottom tooltip-accent" data-tip="Old MMR + MMR Gain">
          New MMR
        </div>
      ),
      render: (newMmr) => <Pill text={newMmr} />,
    },
    {
      key: "bpp",
      label: (
        <div className="tooltip tooltip-bottom tooltip-accent" data-tip="Position Bonus">
          BPP
        </div>
      ),
      render: (bpp) => <MMRPill mmr={toFixedIfNecessary(bpp)} />,
    },
    {
      key: "prb",
      label: (
        <div className="tooltip tooltip-bottom tooltip-accent" data-tip="Positive Rank Bonus">
          PRB
        </div>
      ),
      render: (prb) => <MMRPill mmr={toFixedIfNecessary(prb)} />,
    },
    {
      key: "nrb",
      label: (
        <div className="tooltip tooltip-bottom tooltip-accent" data-tip="Negative Rank Bonus">
          NRB
        </div>
      ),
      render: (nrb) => <MMRPill mmr={toFixedIfNecessary(nrb)} />,
    },
    {
      key: "fl",
      label: (
        <div className="tooltip tooltip-bottom tooltip-accent" data-tip="Fastest Lap">
          FL
        </div>
      ),
      render: (fl) => <MMRPill mmr={toFixedIfNecessary(fl)} />,
    },
    {
      key: "hs",
      label: (
        <div className="tooltip tooltip-bottom tooltip-accent" data-tip="Holeshot">
          HS
        </div>
      ),
      render: (hs) => <MMRPill mmr={toFixedIfNecessary(hs)} />,
    },
  ]

  return <Table columns={columns} data={standings} sortingEnabled={true} />
}
