import Api from '~/api'
import Race from './components/Race'

export default async function Page({ params: { raceId } }) {
  const raceData = await Api.GetRace(raceId)

  return <Race raceSession={raceData} />
}
