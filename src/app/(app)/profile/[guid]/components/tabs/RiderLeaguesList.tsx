'use client'

import React from 'react'
import useSWR from 'swr'
import { useUserContext } from '../RiderProfile'
import Spinner from '~/components/Spinner'
import LeagueList from '~/app/(app)/leagues/_components/LeagueList'
import { fetcher, fetcherWithToken } from '~/api/fetcher'

interface Props {
  leagues: Array<League>
}

export default function RiderLeaguesList({ leagues }: Props) {
  // const user = useUserContext()
  // const { data, error, isLoading } = useSWR([`/my_leagues`, user.token], ([url, token]) =>
  //   fetcherWithToken(url, token) // ? ok.. yet i get cors errs
  // )

  // if (error) return <center>Error</center>

  // if (isLoading)
  //   return (
  //     <div className="my-5">
  //       <Spinner />
  //     </div>
  //   )

  // const leagues = data?.leagues

  return (
    <div className="-mx-4 -mb-4 bg-base-100 p-4">
      <LeagueList leagues={leagues} />
    </div>
  )
}
