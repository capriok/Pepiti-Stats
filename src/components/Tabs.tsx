'use client'

import { useState, useTransition } from 'react'

interface Item {
  key: string
  label: any
  children: JSX.Element
}

interface Props {
  items: Item[]
  wide?: boolean
}

export default function Tabs({ items, wide }: Props) {
  const [isPending, startTransition] = useTransition()
  const [activeTab, setActiveTab] = useState(items[0])

  function selectTab(item) {
    startTransition(() => {
      setActiveTab(item)
    })
  }

  function Tab({ item }) {
    const active = item.key === activeTab.key ? 'bg-secondary/60 text-white' : 'bg-base-200'

    return (
      <button
        onClick={() => selectTab(item)}
        className={`tab-lifted tab min-h-[35px] ${wide ? 'w-full' : ''} ${active}`}>
        <div className="text-[15px]">{item.label}</div>
      </button>
    )
  }

  const tabs = items.map((item) => <Tab key={item.key} item={item} />)

  return (
    <>
      <div className="tabs flex-nowrap">{tabs}</div>
      {activeTab.children}
    </>
  )
}
