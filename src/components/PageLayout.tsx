"use client"

import PageHeader from "./PageHeader"

export const metadata = {
  keywords:
    "Pepiti, Pepiti Races, Pepiti Leagues, MX Bikes Stats, MX Bikes, Stats, MXB Mods, MX Bikes Mods",
}
interface Props {
  width: "app" | "wide"
  header?: {
    title: string
    extra?: React.ReactNode
  }
  children: React.ReactNode
}

export const layoutWidthMap = {
  app: "w-full max-w-[1400px]",
  wide: "w-full max-w-[2560px]",
}

export default function PageLayout(props: Props) {
  const width = layoutWidthMap[props.width]
  const layoutCn = `mx-auto px-4 md:px-0 ${width}`

  return (
    <>
      {props.header && (
        <PageHeader title={props.header.title} extra={props.header.extra} width={width} />
      )}
      <div className={layoutCn}>{props.children}</div>
    </>
  )
}
