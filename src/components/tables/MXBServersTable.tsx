"use client"

import { Hammer } from "lucide-react"
import Image from "next/image"
import Pill from "~/components/pills/Pill"
import Table from "~/ui/Table"
import MXBServerExpandableRow from "./expandable/MXBServerExpandableRow"
import { useToast, actions } from "../toast"

interface Props {
  servers: Array<MXBServer>
  [key: string]: any
}

export default function MXBServersTable(props: Props) {
  const { servers, expandable, ...rest } = props

  const data = servers.map((s) => ({
    ...s,
    _id: s.id,
    name: s.name,
    track: s.track_name,
    status: s.event.session,
    riders: s.num_clients,
    totalRiders: s.max_clients,
    serverType: determineType(s.name.toLowerCase()),
  }))

  const columns = [
    {
      key: "serverType",
      label: "",
      render: (serverType) => renderServerType(serverType),
    },
    {
      key: "name",
      label: "Name",
      render: (name) => <span className="whitespace-nowrap">{name}</span>,
    },
    {
      key: "track",
      label: "Track",
      render: (track) => <span className="whitespace-nowrap">{track.replaceAll("*", "")}</span>,
    },
    {
      key: "status",
      label: "Status",
    },
    {
      key: "riders",
      label: "Riders",
      render: (riders, row) => (
        <Pill text={`${riders}/${row.totalRiders}`} color={riders > 0 ? "primary" : "neutral"} />
      ),
    },
    {
      key: "id",
      label: "",
      render: (id, row) => <JoinButton row={row} />,
    },
  ]

  const sortingKeys = ["name", "track", "status", "riders"]

  return (
    <Table
      data={data}
      columns={columns}
      paginationEnabled={true}
      defaultPageSize={25}
      sortingEnabled={true}
      sortingKeys={sortingKeys}
      rankEnabled={false}
      searchEnabled={true}
      {...rest}
      expandable={{
        ...expandable,
      }}
    />
  )
}

const determineType = (name: string) => {
  if (name.includes("low sr")) return "sr"
  if (name.includes("pepiti")) return "pepiti"

  return "unknown"
}

const renderServerType = (type: string) => {
  switch (type) {
    case "pepiti":
      return (
        <Image
          src="/assets/brand/pepiti-flag.svg"
          alt="pepiti-brand"
          width={16}
          height={16}
          title="Public Race Server"
        />
      )
    case "sr":
      return <Hammer size={20} />
    default:
      return <></>
  }
}

const JoinButton = ({ row }) => {
  const { pushToast } = useToast()

  const onJoin = () => {
    console.log(row)
    pushToast(actions.comingSoon)
  }

  return (
    <div className=" cursor-pointer text-primary" onClick={onJoin}>
      Join
    </div>
  )
}
