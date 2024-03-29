"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
import useSWR from "swr"
import Table from "~/ui/Table"
import { Card, CardContent, CardHeader } from "~/ui/Card"
import { Button } from "~/ui/Button"
import Spinner from "~/components/Spinner"
import MxbServerTableRow from "~/components/tables/expandable/MxbServerTableRow"
import { mxbServersColumnsWithControls, mxbServersData } from "~/components/tables/data/mxbServers"
import { processMXBServers } from "."
import { RefreshCcw } from "lucide-react"

export default function MXBServers({ servers }) {
  const router = useRouter()
  const [global, setGlobal] = useState(false)

  return (
    <>
      <Card className="mb-20">
        <Header setFilter={setGlobal} filter={global} refresh={() => router.refresh()} />
        <ServerTableRenderer global={global} servers={servers} />
        <div className="-mb-6 mt-4 grid w-full place-items-center">
          <Credits />
        </div>
      </Card>
    </>
  )
}

const Header = ({ filter, setFilter, refresh }) => {
  const [percent, setPercent] = useState(0)
  const [step, setStep] = useState(0)

  useEffect(() => {
    const interval = 30000
    const numSteps = 1000

    const timer = setInterval(() => {
      setStep((step + 1) % (numSteps + 1))
      const pct = parseFloat(((step * 100) / numSteps).toFixed(2))
      setPercent(pct)

      if (pct === 100) {
        onRefresh()
      }
    }, interval / numSteps)

    return () => clearInterval(timer)
  }, [step])

  const onRefresh = () => {
    console.log("%cOn Demand refresh", "color: goldenrod")
    setStep(0)
    setPercent(0)
    refresh()
  }

  const onFilter = () => {
    setFilter(!filter)
    onRefresh()
  }

  return (
    <CardHeader className="pb-0">
      <div className="flex items-center justify-between gap-2">
        <div className="flex">{filter ? "All Servers" : "Pepiti Servers"}</div>
        <Button
          className={`min-w-[75px] ${filter ? "bg-base-100" : "bg-base-300"}`}
          onClick={onFilter}
        >
          {filter ? <InsaneLogo size={20} /> : <PepitiLogo size={40} />}
        </Button>
      </div>
      <div className="flex flex-col items-end justify-center gap-2">
        <div className="my-1 h-[3px] w-full rounded-full bg-base-100">
          <div className="h-full rounded-full bg-primary" style={{ width: `${percent}%` }} />
        </div>
        <Button onClick={onRefresh} className="min-w-[50px] bg-base-100">
          <RefreshCcw size={16} />
        </Button>
      </div>
    </CardHeader>
  )
}

const ServerTableRenderer = ({ global, servers }) => {
  const searchParams = useSearchParams()
  const idParam = searchParams.get("id")

  const [expandedRowId, setExpandedRow] = useState<any>(idParam)

  useEffect(() => {
    if (global) setExpandedRow(undefined)

    return () => global && setExpandedRow(undefined)
  }, [global])

  const onExpand = (row) => {
    console.log("%cExpanded Row", "color: goldenrod", row)
    setExpandedRow(row?.id)
  }

  const GlobalServers = () => {
    const { data: globalServers, isLoading } = useSWR(
      "https://projects.mxb-mods.com/mxbjson/servers/?sortby=num_clients",
      (url) => fetch(url).then((res) => res.json()),
      { refreshInterval: 30000 }
    )

    if (isLoading)
      return (
        <div className="mt-2">
          <Spinner />
        </div>
      )

    const servers = processMXBServers(globalServers)

    return <MXBServersTable data={servers} />
  }

  const PepitiServers = (props) => {
    const { data: pepitiServers, isLoading } = useSWR(
      "https://projects.mxb-mods.com/mxbjson/servers/?search=pepiti&server_type=pepiti&sortby=num_clients",
      (url) => fetch(url).then((res) => res.json()),
      { refreshInterval: 30000 }
    )

    if (isLoading) return <MXBServersTable data={props.data} />

    const clientFetchedServers = processMXBServers(pepitiServers)

    return <MXBServersTable data={clientFetchedServers} />
  }

  const MXBServersTable = ({ data }) => {
    const sortingKeys = ["name", "track", "status", "riders"]

    return (
      <Table
        data={mxbServersData(data)}
        columns={mxbServersColumnsWithControls}
        defaultPageSize={20}
        sortingKeys={sortingKeys}
        rankEnabled={false}
        paginationEnabled={true}
        expandable={{
          onExpand,
          defaultExpandedId: expandedRowId,
          render: (row) => <MxbServerTableRow row={row} />,
        }}
      />
    )
  }

  return <CardContent>{!global ? <PepitiServers data={servers} /> : <GlobalServers />}</CardContent>
}

const Credits = () => (
  <Card className="w-fit">
    <CardHeader>
      <div className="grid place-items-center gap-4 md:justify-center">
        <div className="flex gap-1">Powered by</div>
      </div>
    </CardHeader>
    <CardContent className="flex justify-center">
      <div className="flex gap-2">
        <Link href={process.env.NEXT_PUBLIC_API!} rel="noopener noreferrer" target="_blank">
          <PepitiLogo size={52} />
        </Link>
        <Link href="https://connect.mxb-mods.com/2023" rel="noopener noreferrer" target="_blank">
          <div className="mr-4">
            <InsaneLogo size={28} />
          </div>
        </Link>
      </div>
    </CardContent>
  </Card>
)

const PepitiLogo = ({ size }) => (
  <Image
    title="Pepiti Stats."
    src="/assets/brand/pepiti-p.svg"
    alt="pepiti"
    width={size}
    height={size}
  />
)

const InsaneLogo = ({ size }) => (
  <>
    <Image
      title="INConnect by Insane."
      src="/assets/partner/insane-logo-l.svg"
      alt="insane"
      width={size}
      height={size}
      className="hidden dark:block"
    />
    <Image
      title="INConnect by Insane."
      src="/assets/partner/insane-logo-d.svg"
      alt="insane"
      width={size}
      height={size}
      className="dark:hidden"
    />
  </>
)
