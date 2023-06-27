"use client"

import { useRouter, useSearchParams } from "next/navigation"
import { useState } from "react"
import { joinLeague } from "~/api/actions"
import { useToast, actions } from "~/components/toast"
import { Button } from "~/ui/Button"

interface Props {
  leagueId: string
  name: string
  bikes: any
  servers: any
}

export default function LeagueSignupForm({ leagueId, name, bikes, servers }: Props) {
  const router = useRouter()
  const { pushToast } = useToast()
  const searchParams = useSearchParams()
  const guidParam = searchParams.get("guid") ?? ""
  const [guid, setGuid] = useState(guidParam)

  console.log("%cLeagueSignup", "color: steelblue", { bikes, servers })

  const submit = (formData) =>
    joinLeague(formData)
      .then(() => pushToast(actions.joinLeague, name))
      .then(() => router.push(`/leagues/${leagueId}`, { forceOptimisticNavigation: true }))
      .catch(pushToast)

  return (
    <div className="w-full">
      <form action={submit}>
        <input readOnly={true} name="leagueId" value={leagueId} className="hidden" />
        <div className="flex flex-col">
          <label className="mb-2 mt-4 text-accent">GUID</label>
          <input
            name="guid"
            className="input-bordered input bg-base-200"
            required={true}
            defaultValue={guid}
            onChange={(e) => setGuid(e.target.value)}
            readOnly={guidParam ? true : false}
          />
        </div>
        {guid && (
          <>
            <div className="flex flex-col">
              <label className="mb-2 mt-4 text-accent">Rider Name</label>
              <input
                required={true}
                name="riderName"
                type="text"
                className="input-bordered input bg-base-200"
              />
            </div>
            <div className="flex flex-col">
              <label className="mb-2 mt-4 text-accent">Team Name</label>
              <input
                required={true}
                name="teamName"
                type="text"
                className="input-bordered input bg-base-200"
              />
            </div>
            <div className="flex flex-col">
              <label className="mb-2 mt-4 text-accent">Race Number</label>
              <input
                required={true}
                name="raceNumber"
                type="number"
                className="input-bordered input bg-base-200"
              />
            </div>
            <div className="flex flex-col">
              <label className="mb-2 mt-4 text-accent">Bike Choice</label>
              <select
                name="bikePreference"
                defaultValue=""
                className="select-bordered select w-full bg-base-200"
              >
                <option value=""></option>
                {bikes.map((category) => (
                  <optgroup key={category.name} label={category.name}>
                    {category.bikes.map((bike) => (
                      <option key={bike} value={bike}>
                        {bike}
                      </option>
                    ))}
                  </optgroup>
                ))}
              </select>
            </div>
            <div className="flex flex-col">
              <label className="mb-2 mt-4 text-accent">Server Preference</label>
              <select
                name="serverPreference"
                defaultValue=""
                className="select-bordered select w-full bg-base-200"
              >
                <option value=""></option>
                {servers.map((server) => (
                  <option key={server.name + server.location + 1} value={server.name}>
                    {server.description}
                  </option>
                ))}
              </select>
            </div>
            <div className="mt-4 flex w-full justify-center">
              <Button variant="secondary" type="submit" disabled={false}>
                Submit
              </Button>
            </div>
          </>
        )}
      </form>
    </div>
  )
}
