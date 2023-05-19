import Link from 'next/link'
import React from 'react'
import MMRPill from '~/components/pills/MMRPill'
import { Pill } from '~/components/pills/Pill'
import RiderLink from '~/components/RiderLink'
import Table from '~/components/Table'
import { toFixedIfNecessary } from '~/utils/toFixedIfNecessary'

interface Props {
  raceSession: RaceSession
  race: any
}

const MMRAnalysis = ({ raceSession, race }: Props) => {
  const orderedByPosition = Object.keys(race.Classification)
    .reduce((acc: any[], curr) => {
      acc[race.Classification[curr].Pos - 1] = race.Classification[curr]

      return acc
    }, [])
    .filter((obj) => obj)

  const data = orderedByPosition.map((rider, idx) => {
    const riderGuid = raceSession.riders[rider.RaceNum].guid
    const mmrResults = race.MMR[rider.RaceNum]
    const riderName = raceSession.riders[rider.RaceNum].name

    return {
      _id: riderGuid,
      name: riderName,
      newMmr: mmrResults.old_MMR + mmrResults.total,
      mmrGain: mmrResults.total,
      bpp: mmrResults.BPP,
      fl: mmrResults.FL,
      hs: mmrResults.HS,
      nrb: mmrResults.NRB,
      prb: mmrResults.PRB,
    }
  })

  const columns = [
    {
      key: 'name',
      label: 'Name',
      render: (name, row) => <RiderLink href={`/profile/${row._id}`}>{name}</RiderLink>,
    },
    {
      key: 'newMmr',
      label: (
        <div className="tooltip tooltip-bottom" data-tip="Old MMR + MMR Gain">
          New MMR
        </div>
      ),
      render: (newMmr) => <Pill text={newMmr} color="neutral" />,
    },
    {
      key: 'mmrGain',
      label: (
        <div className="tooltip tooltip-bottom" data-tip="MMR Gain">
          Gain
        </div>
      ),
      render: (mmrGain) => <MMRPill mmr={toFixedIfNecessary(mmrGain)} />,
    },
    {
      key: 'bpp',
      label: (
        <div className="tooltip tooltip-bottom" data-tip="Position Bonus">
          BPP
        </div>
      ),
      render: (bpp) => <MMRPill mmr={toFixedIfNecessary(bpp)} />,
    },
    {
      key: 'prb',
      label: (
        <div className="tooltip tooltip-bottom" data-tip="Positive Rank Bonus">
          PRB
        </div>
      ),
      render: (prb) => <MMRPill mmr={toFixedIfNecessary(prb)} />,
    },
    {
      key: 'nrb',
      label: (
        <div className="tooltip tooltip-bottom" data-tip="Negative Rank Bonus">
          NRB
        </div>
      ),
      render: (nrb) => <MMRPill mmr={toFixedIfNecessary(nrb)} />,
    },
    {
      key: 'fl',
      label: (
        <div className="tooltip tooltip-bottom" data-tip="Fastest Lap">
          FL
        </div>
      ),
      render: (fl) => <MMRPill mmr={toFixedIfNecessary(fl)} />,
    },
    {
      key: 'hs',
      label: (
        <div className="tooltip tooltip-bottom" data-tip="Holeshot">
          HS
        </div>
      ),
      render: (hs) => <MMRPill mmr={toFixedIfNecessary(hs)} />,
    },
  ]

  return <Table columns={columns} data={data} />
}

export default MMRAnalysis
