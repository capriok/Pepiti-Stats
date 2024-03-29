"use client"

import Link from "next/link"
import { useUserContext } from "~/providers/UserProvider"
import { Button } from "~/ui/Button"
import { Card } from "~/ui/Card"
import Pill from "~/components/pills/Pill"
import { VerifiedIcon } from "lucide-react"

interface Props {
  leagues: Array<League>
}

export default function LeagueList({ leagues }: Props) {
  console.log("%cLeaguesList", "color: steelblue", leagues)
  const user = useUserContext()

  if (!user.isAdmin)
    return (
      <div>
        <center className="text-sm text-primary-content">Coming Soon ™</center>
      </div>
    )

  if (!leagues || !leagues.length)
    return <div className="flex w-full justify-center">No Results</div>

  return (
    <div className="mt-4 grid w-full grid-cols-1 gap-5 md:grid-cols-3">
      {leagues.map((league) => (
        <LeagueCard key={league._id} league={league} />
      ))}
    </div>
  )
}

const LeagueCard = ({ league }: { league: League }) => {
  if (league.hidden) return <></>

  return (
    <Card key={league._id}>
      <div className="p-4 md:p-6">
        <div className="flex items-center justify-between">
          <div className="text-xl font-semibold">{league.name}</div>
          <div title="Verified League" className="text-primary">
            {league.verified && <VerifiedIcon />}
          </div>
        </div>

        <div className="mt-2 max-h-[85px] min-h-[85px] w-full overflow-y-auto text-accent">
          {league.description}
        </div>

        <div className="mb-4 text-lg font-semibold">Requirements</div>
        <div className="flex w-full justify-around">
          <div className="flex w-full flex-1 flex-col items-center">
            <div className="mb-4 flex flex-col items-center justify-center whitespace-nowrap">
              <div className="text-md mb-2 font-semibold text-accent">MMR</div>
              <div className="text-lg">
                <Pill text={`${league.requirements["MMR"]}+`} />
              </div>
            </div>
          </div>
          <div className="flex w-full flex-1 flex-col items-center">
            <div className="mb-4 flex flex-col items-center justify-center whitespace-nowrap">
              <div className="text-md mb-2 font-semibold text-accent">SR</div>
              <div className="text-lg">
                <Pill text={`${league.requirements["SR"]}+`} />
              </div>
            </div>
          </div>
        </div>
        <div className="flex w-full justify-around">
          <div className="flex w-full flex-1 flex-col items-center">
            <div className="mb-4 flex flex-col items-center justify-center whitespace-nowrap">
              <div className="text-md mb-2 font-semibold text-accent">Races</div>
              <div className="text-lg">
                <Pill text={`${league.requirements["races"]}+`} />
              </div>
            </div>
          </div>
          <div className="flex w-full flex-1 flex-col items-center">
            <div className="mb-4 flex flex-col items-center justify-center whitespace-nowrap">
              <div className="text-md mb-2 font-semibold text-accent">Laps</div>
              <div className="text-lg">
                <Pill text={`${league.requirements["laps"]}+`} />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-2 flex w-full rounded-bl-lg rounded-br-xl border-t border-accent bg-base-300 p-4">
        <div className="flex w-full justify-around">
          <div className="flex w-full flex-1 flex-col items-center">
            <div className="text-md pb-2 font-semibold text-accent">Riders Joined</div>
            <div className="text-lg">{league.total_riders.toLocaleString()}</div>
          </div>
          <div className="flex w-full flex-1 flex-col items-center">
            <div className="text-md pb-2 font-semibold text-accent">League</div>
            <div className="text-lg">
              {league.closed ? (
                <Button variant="outline" disabled={true}>
                  League Closed
                </Button>
              ) : (
                <Link href={`/leagues/${league._id}`}>
                  <Button variant="outline">Go To League</Button>
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </Card>
  )
}
