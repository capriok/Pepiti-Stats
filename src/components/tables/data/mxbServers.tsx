import Image from "next/image"
import { useToast, actions } from "~/components/toast"
import { TableColumn } from "~/ui/Table"
import Pill from "~/components/pills/Pill"
import { handleRacismSanitization } from "~/utils/handleRacismSanitization"
import { Hammer } from "lucide-react"

export const mxbServersData = (servers) =>
  servers.map((s) => ({
    ...s,
    _id: s.id,
    name: s.name,
    track: s.track_name,
    status: s.event.session,
    riders: s.num_clients,
    totalRiders: s.max_clients,
  }))

export const mxbServersColumns = [
  {
    key: "serverType",
    label: "",
    render: (serverType) => (serverType ? renderServerType(serverType) : ""),
  },
  {
    key: "name",
    label: "Name",
    render: (name) =>
      name && <span className="whitespace-nowrap">{handleRacismSanitization(name)}</span>,
  },
  {
    key: "track",
    label: "Track",
    render: (track) =>
      track && <span className="whitespace-nowrap">{track.replaceAll("*", "")}</span>,
  },
  {
    key: "status",
    label: "Status",
  },
  {
    key: "riders",
    label: "Riders",
    render: (riders, row) =>
      riders && (
        <Pill text={`${riders}/${row.totalRiders}`} color={riders > 0 ? "primary" : "neutral"} />
      ),
  },
  {
    key: "id",
    label: "",
    render: (id, row) => row.name && <JoinButton row={row} />,
  },
]

export const mxbServersColumnsWithControls = mxbServersColumns.map((c) => {
  let col = { ...c } as TableColumn

  if (col.key === "name") {
    col = {
      ...col,
      onFilter: (value, row) => row.name.toLowerCase().includes(value.toLowerCase()),
    }
  }
  return col
})

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
  const link = `mxbikes://${row.address}/${row["private address"]}/${row.name}/${row.password}/${row.track_id}//${row.category}`

  const onJoin = () => {
    console.log("%cExternal Protocol", "color: steelblue", { protocol: link })
    pushToast(() => actions.externalProtocol("Launching MX Bikes, Stand by"))
  }

  return (
    <a href={link} className="text-primary" onClick={onJoin}>
      Join
    </a>
  )
}
