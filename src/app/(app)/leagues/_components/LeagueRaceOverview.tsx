'use client'

import RiderLink from '~/components/RiderLink'
import Table from '~/components/Table'
import Tabs from '~/components/Tabs'
import { handleAverageSpeed } from '~/utils/handleAverageSpeed'
import { handleBikeColor } from '~/utils/handleBikeColor'
import { handleLapTimes } from '~/utils/handleLapTimes'
import { leagueRaceStatusMap } from './constants'

interface Props {
  user: User
  race: LeagueRaceDetails
  eligibility: any
}

export default function LeagueRaceOverview({ user, race, eligibility }: Props) {
  console.log('%cLeagueRace', 'color: steelblue', { user, race, eligibility })

  return (
    <>
      <LeagueRaceInformation race={race} />

      <div className="mb-2 mt-6 text-xl font-semibold md:mb-4 md:mt-10">Race Configurations</div>
      <LeagueRaceConfig race={race} />

      <div className="mb-2 mt-6 text-xl font-semibold md:mb-4 md:mt-10">Division Leaderboards</div>
      <LeagueRaceTabs race={race} />
    </>
  )
}

const LeagueRaceInformation = ({ race }: { race: LeagueRaceDetails }) => {
  return (
    <div className="card card-body bg-base-200 p-0">
      <div
        className={`rounded-lg rounded-bl-none rounded-br-none text-white ${
          leagueRaceStatusMap[race.status].color
        } p-4`}>
        <div className="flex justify-center text-xl font-semibold">
          {leagueRaceStatusMap[race.status].msg}
        </div>
      </div>

      <div className="grid w-full grid-cols-1 p-4 md:grid-cols-2">
        <div className="flex flex-col">
          <div className="mb-4 text-lg font-semibold">Information</div>
          <div className="mb-2 flex items-center gap-2">
            <div className="text-md text-accent">Start Time:</div>
            {new Date(race.timestamp * 1000).toLocaleString()}
          </div>
          <div className="mb-2 flex items-center gap-2">
            <div className="text-md text-accent">Track:</div>
            {race.config.event.track}
          </div>
        </div>

        <div className="flex flex-col">
          <div className="mb-4 text-lg font-semibold">Configuration</div>
          <div className="mb-2 flex items-center gap-2">
            <div className="text-md text-accent">Max Riders:</div>
            <div>{race.config.connection.maxclient}</div>
          </div>
          <div className="mb-2 flex items-center gap-2">
            <div className="text-md text-accent">Deformation:</div>
            <div>{race.config.deformation.scale}</div>
          </div>
          <div className="mb-2 flex items-center gap-2">
            <div className="text-md text-accent">Restart Delay:</div>
            <div>{race.config.race.restart_delay}</div>
          </div>
        </div>
      </div>
    </div>
  )
}

const LeagueRaceConfig = ({ race }: { race: LeagueRaceDetails }) => {
  const configurations = [
    {
      label: 'Practice Length',
      value: race.config.race.practice_length,
      desc: 'Minutes',
    },
    {
      label: 'Qualify Length',
      value: race.config.race.qualifypractice_length,
      desc: 'Minutes',
    },
    {
      label: 'Race Length',
      value: <div>{race.config.race.race_minutes}</div>,
      desc: (
        <div>
          Minutes{' '}
          {race.config.race.race_extralaps && '+ ' + race.config.race.race_extralaps + ' Laps'}
        </div>
      ),
    },
  ]

  return (
    <div className="grid place-items-center">
      <div className="stats flex w-full bg-base-200 md:w-fit">
        {configurations.map((configuration) => (
          <div
            key={configuration.label}
            className="stat grid w-full place-items-center md:w-[250px]">
            <div className="stat-title">{configuration.label}</div>
            <div className="stat-value my-2 text-lg">{configuration.value}</div>
            <div className="stat-desc">{configuration.desc}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

const LeagueRaceTabs = ({ race }) => {
  const items = race.divisions.map((division) => ({
    key: division.name,
    label: division.name,
    children: <LeagueRaceStandings division={division} />,
  }))
  return <Tabs items={items} />
}

const LeagueRaceStandings = ({ division }: { division: LeagueRaceDivision }) => {
  const data = division.riders.map((rider) => ({
    _id: rider.guid,
    raceNumber: rider.race_number,
    name: rider.name,
    lapTime: rider.record.lap_time,
    averageSpeed: rider.record.average_speed,
    split1: rider.record.split_1,
    split2: rider.record.split_2,
    category: rider.record.category,
    bike: rider.record.bike,
  }))

  const columns = [
    {
      key: 'raceNumber',
      label: 'Race #',
    },
    {
      key: 'name',
      label: 'Rider',
      render: (name, row) => <RiderLink href={`/profile/${row.guid}`}>{name}</RiderLink>,
    },
    {
      key: 'lapTime',
      label: 'Lap Time',
      render: (lapTime) => (lapTime ? handleLapTimes(lapTime) : '-'),
    },
    {
      key: 'averageSpeed',
      label: 'Avg Speed',
      render: (averageSpeed) => (averageSpeed ? handleAverageSpeed(averageSpeed) : '-'),
    },
    {
      key: 'split1',
      label: 'Split 1',
      render: (split1) => (split1 ? handleLapTimes(split1) : '-'),
    },
    {
      key: 'split2',
      label: 'Split 2',
      render: (split2) => (split2 ? handleLapTimes(split2) : '-'),
    },
    {
      key: 'bike',
      label: 'Bike',
      render: (bike) => {
        const bikeColor = handleBikeColor(bike)
        return (
          <div className="flex">
            <div className={`mr-3 h-5 w-2 ${bikeColor}`} />
            {bike ? bike : '-'}
          </div>
        )
      },
    },
  ]

  return <Table data={data} columns={columns} />
}
