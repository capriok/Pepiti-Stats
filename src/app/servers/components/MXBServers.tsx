"use client"

import { RefreshCcw } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import useSWR from "swr"
import Spinner from "~/components/Spinner"
import MXBServersTable from "~/components/tables/MXBServersTable"
import { Button } from "~/ui/Button"
import { Card, CardContent, CardHeader } from "~/ui/Card"

interface Props {
  servers: Array<MXBServer>
}

export default function MXBServers({ servers }: Props) {
  const router = useRouter()
  const [filter, setFilter] = useState(false)

  useEffect(() => {
    console.log("%cMXBServers", "color: steelblue", { servers })
  }, [])

  const GlobalServers = () => {
    const { data: globalServers, isLoading } = useSWR(
      "https://projects.mxb-mods.com/mxbjson/servers/?sortby=num_clients",
      (url) => fetch(url).then((res) => res.json())
    )

    if (isLoading)
      return (
        <div className="mt-2">
          <Spinner />
        </div>
      )
    console.log("rendering")

    const servers = Object.keys(globalServers.servers).map((s) => globalServers.servers[s])

    return <MXBServersTable servers={servers} />
  }

  const PepitiServers = ({ servers }) => {
    return <MXBServersTable servers={servers} />
  }

  return (
    <>
      <Card className="mb-20">
        <Header setFilter={setFilter} filter={filter} refresh={() => router.refresh()} />
        <CardContent>
          {filter ? <GlobalServers /> : <PepitiServers servers={servers} />}
        </CardContent>
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
    const interval = 15000
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

  const resetRefresh = () => {
    setStep(0)
    setPercent(0)
  }

  const onRefresh = () => {
    console.log("%cOn Demand refresh", "color: goldenrod")
    resetRefresh()
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
        <Button className={filter ? "bg-base-100" : "bg-base-300"} onClick={onFilter}>
          {filter ? (
            <div className="px-2.5">
              <InsaneLogo size={20} />
            </div>
          ) : (
            <Image
              title="Pepiti Stats."
              src="/assets/brand/pepiti-p.svg"
              alt="pepiti"
              width={40}
              height={40}
            />
          )}
        </Button>
      </div>
      <div className="flex flex-col items-end justify-center gap-2">
        <div className="my-1 h-[3px] w-full rounded-full bg-base-100">
          <div className="h-full rounded-full bg-primary" style={{ width: `${percent}%` }} />
        </div>
        <div>
          <Button onClick={onRefresh} className="bg-base-100">
            <RefreshCcw size={16} />
          </Button>
        </div>
      </div>
    </CardHeader>
  )
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
        <Link href="https://api.pepiti.com/v1/" rel="noopener noreferrer" target="_blank">
          <Image
            title="Pepiti Stats."
            src="/assets/brand/pepiti-p.svg"
            alt="pepiti"
            width={52}
            height={52}
          />
        </Link>
        <Link href="https://connect.mxb-mods.com/2023" rel="noopener noreferrer" target="_blank">
          <div className="mr-4">
            <InsaneLogo size={26} />
          </div>
        </Link>
      </div>
    </CardContent>
  </Card>
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
