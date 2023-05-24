'use client'

import React, { use } from 'react'
import Api, { fetcher, privateFetcher } from '~/api'
import useSWR from 'swr'
import Spinner from '~/components/Spinner'
import { useUserContext } from '../RiderProfile'
import LeagueList from '~/app/(app)/leagues/_components/LeagueList'

interface Props {
  guid: string
}

export default function RiderLeaguesList({ guid }: Props) {
  const user = useUserContext()

  const { data, error, isLoading } = useSWR(
    `/my_leagues`,
    async () => await privateFetcher(`/my_leagues`, user.token)
  )

  if (error) return <>err</>

  if (isLoading)
    return (
      <div className="my-5">
        <Spinner />
      </div>
    )

  const leagues = data?.leagues

  return <LeagueList leagues={leagues} />
}
