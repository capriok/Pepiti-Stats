"use client"

import Link from "next/link"
import useSWR from "swr"
import Table from "~/ui/Table"
import { Button } from "~/ui/Button"
import { Card, CardContent, CardHeader } from "~/ui/Card"
import { actions, useToast } from "~/components/toast"
import Spinner from "~/components/Spinner"
import RiderLink from "~/components/RiderLink"
import Pill from "~/components/pills/Pill"
import SRPill from "~/components/pills/SRPill"
import { Copy } from "lucide-react"

export default function MxbServerTableRow({ row }) {
  const { pushToast } = useToast()

  const { data: trackData, isLoading: isLoadingTrack } = useSWR(
    `https://projects.mxb-mods.com/mxbjson/tracks/get.php?track=${row.track.replace("*", "")}`,
    (url) => fetch(url).then((res) => res.json()),
    { refreshInterval: 5000 }
  )

  if (isLoadingTrack)
    return (
      <div className="mt-2">
        <Spinner />
      </div>
    )

  const track = trackData
  const server: MXBServer = {
    ...row,
    ...track,
  }

  const Riders = () => {
    const { data: clientsData, isLoading: isLoadingClients } = useSWR(
      `https://projects.mxb-mods.com/mxbjson/servers/?server=${row.id}`,
      (url) => fetch(url).then((res) => res.json()),
      { refreshInterval: 5000 }
    )

    if (isLoadingClients)
      return (
        <div className="my-4">
          <Spinner />
        </div>
      )

    const clients = parseDirtyClients(clientsData).clients

    if (!clients || clients?.length === 0) return <center>No Riders</center>

    const serverWithClients = {
      ...server,
      clients: clients,
    }

    console.log("%cServerWithClients", "color: goldenrod", { serverWithClients })

    return <ServerRoster server={serverWithClients} />
  }

  console.log("%cServer", "color: goldenrod", { server })

  return (
    <Card>
      <CardHeader className="relative">
        <div className="absolute right-4 top-6">
          <div
            className="cursor-pointer"
            title="Copy Server Link"
            onClick={() => {
              const shareLink = `${process.env.NEXT_PUBLIC_DOMAIN}/servers/?id=${server.id}`

              navigator.clipboard.writeText(shareLink)
              pushToast(() => actions.copiedToClipboard(shareLink))
            }}
          >
            <Copy size={20} />
          </div>
        </div>
        <div className="flex justify-between">
          <div className="w-[50%]">
            <div className="font-semi-bold pb-2 text-[16px]">Server</div>
            <Line label="Server ID" text={server.id} />
            <Line label="Address" text={server.address} />
            <Line label="Private Address" text={server["private address"]} />
            <Line
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
            <div className="font-semi-bold pb-2 text-[16px]">Event</div>
            <Line label="Type" text={server.event.type} />
            {server.race_length && <Line label="Length" text={server.race_length} />}
            {server.event.race_type && <Line label="Format" text={server.event.race_type} />}
            <Line
              label="Weather"
              text={
                <div className="flex gap-2">
                  <div>{server.weather_text}</div>
                  <div>&#127782;&#65039;</div>
                </div>
              }
            />
            {<Line label="Bikes" text={server.category.replaceAll("/", " | ")} />}
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

      <CardContent>
        <div className="font-semi-bold pb-2 text-[16px]">Riders</div>
        <Riders />
      </CardContent>
    </Card>
  )
}

const Line = ({ label, text, col = false }) => {
  return (
    <div className={`mb-1 flex items-center gap-2 ${col ? "flex-col" : ""}`}>
      <span className="text-accent">{label}:</span>
      <span className="">{text}</span>
    </div>
  )
}

const ServerRoster = ({ server }) => {
  const DynamicMXBCol = ({
    id,
    dataKey,
    render,
  }: {
    id: string
    dataKey: string
    render?: (val: any) => JSX.Element
  }) => {
    const { data: riderData, isLoading } = useSWR(
      `https://connect.mxb-mods.com/2023/get_piboso.php?piboso=${id}`,
      (url) => fetch(url).then((res) => res.json())
    )

    if (isLoading) return <Spinner />

    return <></>

    // return render ? render(riderData[dataKey]) : riderData[dataKey]
  }

  const DynamicPepitiCol = ({
    id,
    dataKey,
    render,
  }: {
    id: string
    dataKey: string
    render?: (val: any) => JSX.Element
  }) => {
    const { data: riderData, isLoading } = useSWR(
      `${process.env.NEXT_PUBLIC_API}/rider/${id}`,
      (url) => fetch(url).then((res) => res.json())
    )

    if (isLoading) return <Spinner />

    return render ? render(riderData[dataKey]) : riderData[dataKey]
  }

  const data = server.clients
    .map((c) => ({ ...c, _id: c.id }))
    .sort((a, b) => a?.name.localeCompare(b?.name))

  const baseColumns = [
    {
      key: "name",
      label: "Name",
      render: (_, row) => <RiderLink name={row.name} href={`/profile/${row.id}`} />,
    },
  ]

  const mxbColumns = [
    {
      key: "id",
      label: "More Info coming soon ™",
    },
    // {
    //   key: "id",
    //   label: "Races",
    //   render: (_, row) => <DynamicMXBCol id={row.id} dataKey="races_completed" />,
    // },
    // {
    //   key: "id",
    //   label: "Rating",
    //   render: (_, row) => <DynamicMXBCol id={row.id} dataKey="rating" />,
    // },
  ]

  const pepitiColumns = [
    {
      key: "id",
      label: "MMR",
      render: (_, row) => (
        <DynamicPepitiCol id={row.id} dataKey="MMR" render={(val) => <Pill text={val} />} />
      ),
    },
    {
      key: "sr",
      label: "SR",
      render: (_, row) => (
        <DynamicPepitiCol id={row.id} dataKey="SR" render={(val) => <SRPill sr={val} />} />
      ),
    },
    {
      key: "contact",
      label: "Contacts",
      render: (_, row) => <DynamicPepitiCol id={row.id} dataKey="contact" />,
    },
    {
      key: "total_laps",
      label: "Total Laps",
      render: (_, row) => <DynamicPepitiCol id={row.id} dataKey="total_laps" />,
    },
  ]

  const columns = [
    ...baseColumns,
    ...(server.serverType.includes("pepiti") ? pepitiColumns : mxbColumns),
  ]

  return (
    <>
      {!server.clients || server.clients?.length === 0 ? (
        <></>
      ) : (
        <Table data={data} columns={columns} rankEnabled={false} />
      )}
    </>
  )
}

const parseDirtyClients = (input: string) => {
  try {
    const clean = input.replace(/\n\t/g, "")
    const data = JSON.parse(clean)
    return {
      ...data.server,
      clients: data.client,
    }
  } catch (error) {
    console.log("Error parsing Server Response:", error)
    return {
      id: null,
      name: "",
      clients: [],
    }
  }
}

function getDownloadLocation(url: string): string {
  const domain = new URL(url).hostname
  let loc = domain.charAt(0).toUpperCase() + domain.slice(1)

  return `Track Download | ${loc}`
}
