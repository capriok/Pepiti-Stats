import Api from '~/api'
import processRaceSession from '~/utils/processRaceSession'
import Race from './components/Race'

export default async function Page({ params: { raceId } }) {
  const raceSession = await Api.GetRace(raceId)
  let session = processRaceSession(raceSession)

  return <Race session={session} />
}
