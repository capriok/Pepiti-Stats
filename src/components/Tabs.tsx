'use client'

import { useState } from 'react'

interface Item {
  key: string
  label: string
  children: JSX.Element
}

interface Props {
  items: Item[]
}

export default function Tabs({ items }: Props) {
  const [activeTab, setActiveTab] = useState(items[0])

  const handleClick = (key) => setActiveTab(key)

  const Tab = ({ tab }) => {
    const active = tab.name === activeTab.key ? 'tab-active' : ''

    return (
      <button
        onClick={() => handleClick(tab)}
        className={`tab max-sm:tab-sm md:tab-md tab-lifted ${active}`}>
        {tab.label}
      </button>
    )
  }

  const tabs = items.map((item) => <Tab key={item.key} tab={item} />)

  console.log('%cTabs: Active', 'color:steelblue', activeTab)

  return (
    <>
      <div className="tabs flex-nowrap">{tabs}</div>
      {activeTab.children}
    </>
  )
}
