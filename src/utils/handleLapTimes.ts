import { dateIsValid } from './dateIsValid'

export const handleLapTimes = (time: number): string => {
   const date = new Date(0)
   date.setMilliseconds(time)
   const lapTimeFormat = dateIsValid(date) ? date.toISOString().substring(14, 23) : '-'

   return lapTimeFormat
}
