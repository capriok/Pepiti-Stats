import RiderLink from "~/components/RiderLink"
import MMRPill from "~/components/pills/MMRPill"
import Pill from "~/components/pills/Pill"
import { toFixedIfNecessary } from "~/utils/toFixedIfNecessary"

export const recentRaceMmrStandingsColumnsWithControls = [
  {
    key: "name",
    label: "Name",
    render: (name, row) => <RiderLink href={`/profile/${row._id}`} name={name} />,
    onFilter: (value, row) => row.name.toLowerCase().includes(value.toLowerCase()),
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
