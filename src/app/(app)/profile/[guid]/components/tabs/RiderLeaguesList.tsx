"use client"

import React from "react"
import useSWR from "swr"
import { fetcherWithToken } from "~/api/fetcher"
import Spinner from "~/components/Spinner"
import LeagueList from "~/app/(app)/leagues/_components/LeagueList"

interface Props {
  user: User
  leagues: Array<League>
}

export default function RiderLeaguesList({ user, leagues }: Props) {
  // ? this should work but token does not make it to the request going out to pepiti
  // ? not sure what im missing here?
  // const { data, error, isLoading } = useSWR(
  //   `/my_leagues`,
  //   (url) => fetcherWithToken(url, user.token)
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
