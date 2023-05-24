import { METER_TO_MILE } from './constants'

export const handleAverageSpeed = (speed: number): string => {
  const averageSpeed = (speed * METER_TO_MILE).toFixed(2)
  return averageSpeed + ' mph'
}
