"use client"

import { Hammer } from "lucide-react"
import Image from "next/image"
import Pill from "~/components/pills/Pill"
import Table from "~/ui/Table"
import { useToast, actions } from "../toast"
import { handleRacismSanitization } from "~/utils/handleRacismSanitization"

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
      render: (name) => <span className="whitespace-nowrap">{handleRacismSanitization(name)}</span>,
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

const renderServerType = (type: string) => {
  switch (type) {
    case "pepiti":
      return (
        <Image
          src="/assets/brand/pepiti-flag.svg"
          alt="pepiti-brand"
          width={16}
          height={16}
          title="Pepiti Race Server"
        />
      )
    case "pepiti sr":
      return (
        <div title="Pepiti SR Ban Race Server">
          <Hammer size={20} />
        </div>
      )
    default:
      return (
        <Image
          src="/assets/brand/white-flag.svg"
          alt="race-brand"
          width={16}
          height={16}
          title="Public Race Server"
        />
      )
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
