"use client"

import { ImageProps } from "next/image"
import cn from "~/utils/cn"
import ThemedImage from "./ThemedImage"
import { useOverlayContext } from "~/providers/OverlayProvider"

export default function OverlayableImage(props: ImageProps) {
  const { open } = useOverlayContext()
  const overlay = <ThemedImage src={props.src} alt={props.alt} width={1440} height={1440} />

  return (
    <ThemedImage
      {...props}
      src={props.src}
      alt={props.alt}
      title="Click to expand"
      className={cn("cursor-pointer", props.className)}
      onClick={() => open(overlay)}
    />
  )
}
