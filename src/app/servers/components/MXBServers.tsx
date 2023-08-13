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
  const [percent, setPercent] = useState(0)
  const [step, setStep] = useState(0)

  useEffect(() => {
    console.log("%cMXBServers", "color: steelblue", { servers })
  }, [])

  useEffect(() => {
    const interval = 30000
    const numSteps = 100

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
    router.refresh()
  }

  const onFilter = () => {
    setFilter(!filter)
    onRefresh()
  }

  return (
    <>
      <Card className="mb-20">
        <CardHeader>
          <div className="flex items-center justify-between gap-2">
            <div className="flex">{filter ? "All Servers" : "Pepiti Servers"}</div>
            <Button className={filter ? "bg-base-100" : "bg-base-300"} onClick={onFilter}>
              {filter ? (
                <div className="px-2.5">
                  <Image
                    title="INConnect by Insane."
                    src="/assets/extra/insane-logo.png"
                    alt="insane"
                    width={20}
                    height={20}
                  />
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
        </CardHeader>
        <div className="flex flex-col items-end justify-center gap-2">
          <RefreshBar percent={percent} />
          <div>
            <Button onClick={onRefresh}>
              <RefreshCcw size={16} />
            </Button>
          </div>
        </div>
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

const RefreshBar = ({ percent }) => {
  return (
    <div className="mb-2 h-1 w-full rounded-full bg-base-100">
      <div className="h-1 rounded-full bg-primary" style={{ width: `${percent}%` }} />
    </div>
  )
}

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

  const servers = Object.keys(globalServers.servers).map((s) => globalServers.servers[s])

  return <MXBServersTable servers={servers} />
}

const PepitiServers = ({ servers }) => {
  return <MXBServersTable servers={servers} />
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
          <Image
            title="INConnect by Insane."
            src="/assets/extra/insane-logo.png"
            alt="insane"
            width={26}
            height={26}
            className="mr-4"
          />
        </Link>
      </div>
    </CardContent>
  </Card>
)
