'use client'

import { VerifiedIcon } from 'lucide-react'
import { createContext, useContext } from 'react'
import { Pill } from '~/components/pills/Pill'
import RiderLink from '~/components/RiderLink'
import Table from '~/components/Table'
import LeagueRaceCard from './LeagueRaceCard'

interface Props {
  user: User
  race: RaceSession
}

const UserContext = createContext<User>({} as User)
export const useUserContext = () => useContext(UserContext)

export default function LeagueRaceOverview({ user, race }: Props) {
  console.log({ user, race })

  return (
    <UserContext.Provider value={user}>
      <>race</>
    </UserContext.Provider>
  )
}
