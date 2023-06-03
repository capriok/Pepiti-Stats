"use client"

import { useTheme } from "next-themes"
import Image, { ImageProps } from "next/image"
import { useEffect, useMemo, useState } from "react"

export function ThemedImage(props: ImageProps & { alt: string }) {
  const { theme, systemTheme } = useTheme()
  const [imageSrc, setImageSrc] = useState(props.src)

  const isLight = theme === "light" || systemTheme === "light"
  const dotIdx = props.src.toString().indexOf(".")
  const baseUrl = props.src.toString().slice(0, dotIdx - 2)
  const urlExtension = props.src.toString().slice(dotIdx)
  const themedImgUrl = baseUrl + (isLight ? "-l" : "-d") + urlExtension

  useEffect(() => {
    setImageSrc(themedImgUrl)
  }, [themedImgUrl])

  // fail safe if we accidentally use an img that isn't theme ready
  function handleError() {
    setImageSrc(props.src)
  }

  return <Image {...props} src={imageSrc} onError={handleError} alt={props.alt} />
}
