"use client"

import { useState, useTransition } from "react"

interface Item {
  key: string
  label: any
  children: JSX.Element
}

interface Props {
  items: Item[]
  wide?: boolean
  defaultActive?: string
  onChange?: (item: Item) => void
  renderChildren?: boolean
}

export default function Tabs({
  items,
  wide,
  defaultActive,
  onChange = function () {},
  renderChildren = true,
}: Props) {
  const [isPending, startTransition] = useTransition()
  const [activeTab, setActiveTab] = useState(
    defaultActive ? items.find((t) => t.key === defaultActive) ?? items[0] : items[0]
  )

  function selectTab(item) {
    startTransition(() => {
      setActiveTab(item)
      onChange && onChange(item)
    })
  }

  function Tab({ item }) {
    const active = item.key === activeTab.key ? "bg-secondary/80 text-white" : "bg-base-200"
    const wideActive = wide ? "w-full" : ""
    return (
      <button
        onClick={() => selectTab(item)}
        className={`tab-lifted tab min-h-[35px] font-semibold text-accent ${wideActive} ${active}`}
      >
        <div className="whitespace-nowrap text-[15px]">{item.label}</div>
      </button>
    )
  }

  const tabs = items.map((item) => <Tab key={item.key} item={item} />)

  return (
    <>
      <div className="tabs flex-nowrap">{tabs}</div>
      {renderChildren && activeTab.children}
    </>
  )
}
