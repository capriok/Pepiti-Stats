'use client'

import React from 'react'
import useSWR from 'swr'
import { useUserContext } from '../RiderProfile'
import Spinner from '~/components/Spinner'
import LeagueList from '~/app/(app)/leagues/_components/LeagueList'

interface Props {
  guid: string
}

export default function RiderLeaguesList({ guid }: Props) {
  const user = useUserContext()

  const { data, error, isLoading } = useSWR([`/my_leagues`, user.token])

  if (error) return <>err</>

  if (isLoading)
    return (
      <div className="my-5">
        <Spinner />
      </div>
    )

  const leagues = data?.leagues

  return (
    <div className="-mx-8 -mb-8 bg-base-100 p-4">
      <LeagueList leagues={leagues} />
    </div>
  )
}
