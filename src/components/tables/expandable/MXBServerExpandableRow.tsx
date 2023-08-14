import Image from "next/image"
import Link from "next/link"
import useSWR from "swr"
import Spinner from "~/components/Spinner"
import { Button } from "~/ui/Button"
import { Card, CardContent, CardHeader } from "~/ui/Card"
import Table from "~/ui/Table"

export default function MXBServerExpandableRow({ row }) {
  const { data: trackData, isLoading: isLoadingTrack } = useSWR(
    `https://projects.mxb-mods.com/mxbjson/tracks/get.php?track=${row.track.replace("*", "")}`,
    (url) => fetch(url).then((res) => res.json()),
    { refreshInterval: 5000 }
  )

  const { data: serverData, isLoading: isLoadingServer } = useSWR(
    `https://projects.mxb-mods.com/mxbjson/servers/?server=${row.id}`,
    (url) => fetch(url).then((res) => res.json()),
    { refreshInterval: 5000 }
  )

  if (isLoadingServer || isLoadingTrack)
    return (
      <div className="mt-2">
        <Spinner />
      </div>
    )

  const track = trackData
  const server: MXBServer = {
    ...row,
    ...track,
    ...parseInsanity(serverData),
  }

  console.log("%cTrackData", "color: goldenrod", { track })
  console.log("%cServerData", "color: goldenrod", { server })

  const Stat = ({ label, text, col = false }) => {
    return (
      <div className={`mb-1 flex items-center gap-2 ${col ? "flex-col" : ""}`}>
        <span className="text-accent">{label}:</span>
        <span className="">{text}</span>
      </div>
    )
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between">
          <div className="w-[50%]">
            <div className="font-semi-bold pb-2">Server</div>
            <Stat label="Server ID" text={server.id} />
            <Stat label="Address" text={server.address} />
            <Stat label="Private Address" text={server["private address"]} />
            <Stat
              label="Dedicated"
              text={
                server.dedicated === "0" ? (
                  <div className="h-2 w-2 rounded-full bg-red-500" />
                ) : (
                  <div className="h-2 w-2 rounded-full bg-primary" />
                )
              }
            />
          </div>
          <div className="w-[50%]">
            <div className="font-semi-bold pb-2">Event</div>
            <Stat label="Type" text={server.event.type} />
            {server.race_length && <Stat label="Length" text={server.race_length} />}
            {server.event.race_type && <Stat label="Format" text={server.event.race_type} />}
            <Stat
              label="Weather"
              text={
                <div className="flex gap-2">
                  <div>{server.weather_text}</div>
                  <div>&#127782;&#65039;</div>
                </div>
              }
            />
          </div>
        </div>
        <div className="flex justify-end">
          {server.track_link && (
            <div className="flex flex-col items-center" title={server.track_link}>
              <Button className="bg-primary/40 p-2 px-4 text-sm dark:text-primary-content">
                <Link href={server.track_link} rel="noopener noreferrer" target="_blank">
                  {getDownloadLocation(server.track_link)}
                </Link>
              </Button>
            </div>
          )}
        </div>
      </CardHeader>
      {server.clients && server.clients.length > 0 ? (
        <CardContent>
          <div className="font-semi-bold pb-2">Riders</div>
          <ServerRoster server={server} />
        </CardContent>
      ) : (
        <></>
      )}
    </Card>
  )
}

const parseInsanity = (input: string) => {
  try {
    const clean = input.replace(/\n\t/g, "")
    const data = JSON.parse(clean)
    return {
      ...data.server,
      clients: data.client,
    }
  } catch (error) {
    console.error("Error parsing Server Response:", error)
    return {}
  }
}

function getDownloadLocation(url: string): string {
  const domain = new URL(url).hostname
  let loc = domain.charAt(0).toUpperCase() + domain.slice(1)

  return `Track Download | ${loc}`
}

const ServerRoster = ({ server }) => {
  return (
    <>
      {server.clients && server.clients?.length > 0 ? (
        <Table
          data={server.clients.map((c) => ({ ...c, id: c.id }))}
          columns={[
            {
              key: "name",
              label: "Name",
            },
          ]}
          rankEnabled={false}
        />
      ) : (
        <></>
      )}
    </>
  )
}
