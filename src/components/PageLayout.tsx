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
  }
  children: React.ReactNode
}

export const layoutWidthMap = {
  feed: "w-full max-w-[800px]",
  app: "w-full max-w-[1500px]",
  wide: "w-full max-w-[2560px]",
}

export default function PageLayout(props: Props) {
  const width = layoutWidthMap[props.width]
  const layoutCn = `mx-auto px-4 md:px-0 ${width}`

  return (
    <>
      {props.header && (
        <PageHeader
          title={props.header.title}
          extra={props.header.extra}
          subExtra={props.header.subExtra}
          width={width}
        />
      )}
      <div className={layoutCn}>{props.children}</div>
    </>
  )
}
