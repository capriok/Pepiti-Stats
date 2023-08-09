"use client"

import Image, { ImageProps } from "next/image"
import { useState } from "react"
import cn from "~/utils/cn"

export default function ThemedImage(props: ImageProps) {
  const [err, setErr] = useState(false)
  const darkSrc = props.src.toString().replace("-l.", "-d.")

  return (
    <>
      <Image
        {...props}
        priority={true}
        src={props.src}
        alt={props.alt}
        className={cn(props.className, "dark:hidden")}
      />
      <Image
        {...props}
        priority={true}
        src={err ? props.src : darkSrc}
        alt={props.alt}
        className={cn(props.className, "hidden dark:block")}
        onError={() => setErr(true)}
      />
    </>
  )
}
