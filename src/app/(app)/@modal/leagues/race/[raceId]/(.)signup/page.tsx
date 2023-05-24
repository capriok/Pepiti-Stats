'use client'

import InterceptingModal from '../../../../InterceptingModal'
import LeagueRaceSignup from '~/app/(app)/leagues/race/_components/LeagueRaceSignup'

export const dynamic = 'force-dynamic'

export default async function Page() {
  return (
    <InterceptingModal>
      <LeagueRaceSignup />
    </InterceptingModal>
  )
}
