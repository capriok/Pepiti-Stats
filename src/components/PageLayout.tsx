"use client"

import PageHeader from "./PageHeader"

export const metadata = {
  keywords:
    "Pepiti, Pepiti Races, Pepiti Leagues, MX Bikes Stats, MX Bikes, Stats, MXB Mods, MX Bikes Mods",
}
interface Props {
  width: "feed" | "app" | "wide"
  header?: {
    title: string
    extra?: React.ReactNode
    subExtra?: React.ReactNode
    backEnabled?: boolean
  }
  children: React.ReactNode
}

export const layoutWidthMap = {
  feed: "w-full max-w-[800px]",
  app: "w-full max-w-[1400px]",
  wide: "w-full max-w-[2560px]",
}

export default function PageLayout(props: Props) {
  const width = layoutWidthMap[props.width]
  const layoutCn = `mx-auto px-4 2xl:px-0 ${width}`

  return (
    <>
      {props.header && (
        <PageHeader
          title={props.header.title}
          extra={props.header.extra}
          subExtra={props.header.subExtra}
          backEnabled={props.header.backEnabled}
          width={width}
        />
      )}
      <div className={layoutCn}>{props.children}</div>
    </>
  )
}
