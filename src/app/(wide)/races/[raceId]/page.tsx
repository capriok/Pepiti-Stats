import Api from '~/api'
import processRaceSession from '~/utils/processRaceSession'
import Race from './components/Race'

export async function generateMetadata({ params }) {
  const raceSession = await Api.GetRace(params.raceId)
  let session = processRaceSession(raceSession) as ProcessedRaceSession

  return {
    title: `Pepiti | ${session.type}`,
    description: `
      Track: ${session.track}
      Riders: ${session.headCount}
    `,
  }
}
export default async function Page({ params: { raceId } }) {
  const raceSession = await Api.GetRace(raceId)
  let session = processRaceSession(raceSession) as ProcessedRaceSession

  return <Race session={session} />
}
