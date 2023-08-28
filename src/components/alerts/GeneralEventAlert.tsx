"use client"

import Link from "next/link"
import { Button } from "~/ui/Button"
import { Alert, AlertDescription, AlertTitle } from "~/ui/Alert"
import { Hammer, Timer } from "lucide-react"

type Link = {
  url: string
  label: string
}
interface Props {
  alert: {
    meta: {
      expires: string
    }
    content: {
      title: string
      body: string[]
      buttons: Link[]
      links: Link[]
      externalLinks: Link[]
    }
  }
}

export default function GeneralEventAlert({ alert }: Props) {
  if (alert.meta.expires < new Date().toISOString()) return <></>

  return (
    <Alert className="mb-4 border-primary/80">
      <Timer size={20} />

      <AlertTitle className="font-semibold">{alert.content.title}</AlertTitle>

      <AlertDescription className="mt-6 flex flex-col gap-1">
        {alert.content.body.map((line, i) => (
          <div key={i}>{line}</div>
        ))}
      </AlertDescription>

      <AlertDescription className="mt-6 flex gap-2">
        <div className="flex flex-row flex-wrap gap-2">
          {alert.content.buttons.map((link, i) => (
            <Button
              key={i}
              variant="outline"
              className="flex items-center gap-2 text-sm hover:text-primary-content"
            >
              <Link href={link.url}>{link.label}</Link>
            </Button>
          ))}
          {alert.content.links.map((link, i) => (
            <Button
              key={i}
              variant="ghost"
              className="flex items-center gap-2 text-sm hover:text-primary-content"
            >
              <Link href={link.url}>{link.label}</Link>
            </Button>
          ))}
          {alert.content.externalLinks.map((link, i) => (
            <Button
              key={i}
              variant="ghost"
              className="flex items-center gap-2 text-sm hover:text-primary-content"
            >
              <Link href={link.url} rel="noopener noreferrer" target="_blank">
                {link.label}
              </Link>
            </Button>
          ))}
        </div>
      </AlertDescription>
    </Alert>
  )
}
