"use client"

import * as React from "react"
import * as TabsPrimitive from "@radix-ui/react-tabs"
import cn from "~/utils/cn"
import { useSearchParams } from "next/navigation"

const TabsList = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.List>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.List
    ref={ref}
    className={cn(
      "text-base-200-foreground inline-flex h-9 items-center justify-center rounded-lg bg-base-200 p-1",
      className
    )}
    {...props}
  />
))
TabsList.displayName = TabsPrimitive.List.displayName

const TabsTrigger = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Trigger
    ref={ref}
    className={cn(
      "focus-visible:ring-ring inline-flex items-center justify-center whitespace-nowrap rounded-md px-4 py-1 text-sm font-medium ring-offset-accent transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-secondary/80 data-[state=active]:text-white data-[state=active]:shadow",
      className
    )}
    {...props}
  />
))
TabsTrigger.displayName = TabsPrimitive.Trigger.displayName

const TabsContent = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Content
    ref={ref}
    className={cn(
      "focus-visible:ring-ring mt-2 ring-offset-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
      className
    )}
    {...props}
  />
))
TabsContent.displayName = TabsPrimitive.Content.displayName

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
  onChange = function () {},
  renderChildren = true,
}: Props) {
  const searchParams = useSearchParams()
  const tabParam = searchParams.get("tab")

  const children = items.map((item) => (
    <TabsContent key={item.key} value={item.key}>
      {item.children}
    </TabsContent>
  ))
  return (
    <>
      <TabsPrimitive.Tabs
        className={wide ? "w-full" : "w-fit"}
        defaultValue={tabParam ? tabParam : items[0].key}
        onValueChange={(key) => onChange(items.find((i) => i.key === key)!)}
      >
        <TabsList className={`grid w-full ${getGridSize(items.length)}`}>
          {items.map((item) => (
            <TabsTrigger key={item.key} value={item.key}>
              {item.label}
            </TabsTrigger>
          ))}
        </TabsList>
        {renderChildren && children}
      </TabsPrimitive.Tabs>
    </>
  )
}

export { TabsList, TabsTrigger, TabsContent }

const getGridSize = (length: number) => {
  const map = {
    1: "grid-cols-1",
    2: "grid-cols-2",
    3: "grid-cols-3",
    4: "grid-cols-4",
    5: "grid-cols-5",
    6: "grid-cols-6",
  }
  return map[length]
}
