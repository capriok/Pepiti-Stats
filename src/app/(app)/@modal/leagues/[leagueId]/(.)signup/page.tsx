'use client'

import InterceptingModal from '../../../InterceptingModal'
import LeagueSignupForm from '~/app/(app)/leagues/_components/LeagueSignupForm'

export const dynamic = 'force-dynamic'

export default async function Page({ params: { leagueId } }) {
  return (
    <InterceptingModal>
      <LeagueSignupForm leagueId={leagueId} />
    </InterceptingModal>
  )
}
