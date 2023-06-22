import { Metadata } from "next"
import { GetRace } from "~/api"
import processRaceSession from "~/utils/processRaceSession"
import Race from "./components/Race"
import { ProcessedRaceSession } from "~/types"

export async function generateMetadata({ params }) {
  const raceSession = await GetRace(params.raceId)
  let session = processRaceSession(raceSession) as ProcessedRaceSession

  return {
    title: `Pepiti | ${session?.type}`,
    description: `Post race statistics and analysis
      Track: ${session?.track}
      Riders: ${session?.headCount}
    `,
    openGraph: {
      images: "/assets/brand/Pepiti Icon - V2-01",
    },
  } as Metadata
}
export default async function Page({ params: { raceId } }) {
  const raceSession = await GetRace(raceId)
  let session = processRaceSession(raceSession) as ProcessedRaceSession

  return <Race session={session} />
}
