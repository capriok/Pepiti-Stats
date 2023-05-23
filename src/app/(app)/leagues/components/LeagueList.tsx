interface Props {
  leagues: Array<any>
}

export default function LeagueList({ leagues }: Props) {
  return (
    <div className="grid w-full grid-cols-4">
      {leagues.map((league) => (
        <div key={league.id} className="card card-body bg-base-200 p-4">
          <div className="text-xl">{league.name}</div>
        </div>
      ))}
    </div>
  )
}
