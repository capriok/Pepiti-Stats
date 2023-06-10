import RiderLeaguesList from "./components/RiderLeaguesList"

export default function LeaguesTab() {
  return (
    <div className="p-4 pt-0">
      <div className="my-4 whitespace-nowrap text-xl font-semibold">My Leagues</div>
      <RiderLeaguesList />
    </div>
  )
}
