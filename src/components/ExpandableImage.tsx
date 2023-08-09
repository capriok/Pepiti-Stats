"use client"

import { X } from "lucide-react"
import Image from "next/image"
import { useState } from "react"
import { Button } from "~/ui/Button"
import { Card } from "~/ui/Card"
import cn from "~/utils/cn"

interface Props {
  src: string
  alt: string
  width: number
  height: number
  className?: string
  [key: string]: any
}

export default function ExpandableImage(props: Props) {
  const [overlay, setOverlay] = useState(false)

  const ImageOverlay = () => {
    if (!overlay) return <></>

    return (
      <div className="z-100 fixed left-0 top-0 hidden lg:flex">
        <div className="bg-black/60" onClick={() => setOverlay(false)}>
          <div className="grid h-[100vh] w-[100vw] place-items-center">
            <Card>
              <div className="my-2 flex justify-end">
                <Button onClick={() => setOverlay(false)}>
                  <X />
                </Button>
              </div>
              <Image src={props.src} alt={props.alt} width={1440} height={1440} />
            </Card>
          </div>
        </div>
      </div>
    )
  }

  return (
    <>
      <Image
        {...props}
        src={props.src}
        alt={props.alt}
        onClick={() => setOverlay(true)}
        className={cn("cursor-pointer", props.className)}
        title="Click to expand"
      />
      <ImageOverlay />
    </>
  )
}
