'use client'

import { useState } from 'react'

interface Item {
  key: string
  label: string
  children: JSX.Element
}

interface Props {
  items: Item[]
  wide?: boolean
}

export default function Tabs({ items, wide }: Props) {
  const [activeTab, setActiveTab] = useState(items[0])

  const handleClick = (key) => setActiveTab(key)

  const Tab = ({ tab }) => {
    const active = tab.key === activeTab.key ? 'bg-secondary/60 text-white' : 'bg-base-200'

    return (
      <button
        onClick={() => handleClick(tab)}
        className={`tab-lifted tab md:tab-md ${wide ? 'w-full' : ''} ${active}`}>
        {tab.label}
      </button>
    )
  }

  const tabs = items.map((item) => <Tab key={item.key} tab={item} />)

  return (
    <>
      <div className="tabs flex-nowrap">{tabs}</div>
      {activeTab.children}
    </>
  )
}
