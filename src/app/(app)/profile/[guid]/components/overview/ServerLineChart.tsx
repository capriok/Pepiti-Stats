import Api from '~/api'
import LineChart from './LineChart'

export default async function ServerLineChart({ guid }) {
  const historyData = await Api.GetRiderMMRHistory(guid)

  return <LineChart historyData={historyData.MMR_updates} />
}
