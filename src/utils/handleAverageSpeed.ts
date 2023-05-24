import { METER_TO_MILE } from './constants'

export const handleAverageSpeed = (speed: number, suffix = true): string => {
  const averageSpeed = (speed * METER_TO_MILE).toFixed(2)
  return averageSpeed + (suffix ? ' mph' : '')
}
