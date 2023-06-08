"use client"

import React, { useEffect, useState } from "react"
import Spinner from "~/components/Spinner"
import LeagueList from "~/app/(app)/leagues/_components/LeagueList"
import { GetRiderLeagues } from "~/api"

interface Props {
  user: User
}

export default function RiderLeaguesList({ user }: Props) {
  // ! In order to show the correct card state we need this to work
  // ? this should work but token does not make it to the request
  // ? not sure whats missing here?
  // const { data, error, isLoading } = useSWR(
  //   `/my_leagues`,
  //   (url) => fetcherWithToken(url, user.token)
  // )
  // const leagues = data?.leagues

  // ! For now, we will just use the following
  const [leaguesLoading, setLeaguesLoading] = useState(true)
  const [leagues, setLeagues] = useState([])

  useEffect(() => {
    GetRiderLeagues(user.token).then((res) => {
      setLeaguesLoading(false)
      setLeagues(res.leagues as any)
    })
  }, [user])

  return (
    <div className="-mx-4 -mb-4 bg-base-100 p-4">
      {leaguesLoading ? (
        <div className="flex justify-center">
          <Spinner />
        </div>
      ) : (
        <LeagueList leagues={leagues} />
      )}
    </div>
  )
}
