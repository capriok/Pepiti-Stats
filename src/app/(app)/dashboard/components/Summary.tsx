interface Props {
  stats: SummaryStats
}

export default function SummaryStats({ stats }: Props) {
  return (
    <div className="flex flex-col overflow-x-scroll md:overflow-visible">
      <div className="stats mx-auto flex w-fit bg-base-200 shadow md:w-full">
        <div className="stat place-items-center">
          <div className="stat-title">Laps</div>
          <div className="stat-value py-2 text-3xl text-primary">{stats.laps.toLocaleString()}</div>
          <div className="stat-desc">Laps combined</div>
        </div>

        <div className="stat place-items-center">
          <div className="stat-title">Riders</div>
          <div className="stat-value py-2 text-3xl">{stats.unique_riders.toLocaleString()}</div>
          <div className="stat-desc">Unique riders</div>
        </div>

        <div className="stat place-items-center">
          <div className="stat-title">Personal Records</div>
          <div className="stat-value py-2 text-3xl">{stats.records.toLocaleString()}</div>
          <div className="stat-desc">Total personal records</div>
        </div>

        <div className="stat place-items-center">
          <div className="stat-title">Races</div>
          <div className="stat-value py-2 text-3xl">{stats.races.toLocaleString()}</div>
          <div className="stat-desc">Total races completed</div>
        </div>
      </div>
    </div>
  )
}
