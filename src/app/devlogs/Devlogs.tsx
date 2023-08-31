"use client"

import { useEffect, useRef } from "react"
import { useSearchParams } from "next/navigation"
import Link from "next/link"
import { Card, CardContent, CardFooter, CardHeader } from "~/ui/Card"
import OverlayableImage from "~/components/OverlayableImage"

import { Eye } from "lucide-react"

import devUpdates from "@/data/development-updates.json"

export default function Devlogs() {
  const sp = useSearchParams()
  const logParam = parseInt(sp.get("log") ?? "")

  console.log("%cDevLogs", "color: steelblue", { entries: devUpdates.logs })

  const listRef = useRef<any>(null)

  useEffect(() => {
    if (listRef.current && logParam >= 0 && logParam < devUpdates.logs.length) {
      const itemElement = listRef.current.children[logParam]
      itemElement.scrollIntoView({ behavior: "smooth", block: "end" })
    }
  }, [logParam, devUpdates.logs])

  return (
    <div className="flex w-full flex-col justify-center gap-10" ref={listRef}>
      {devUpdates.logs.map((entry, i) => (
        <Card key={i} className="w-full">
          <CardHeader className="rounded-md bg-base-300 pb-4">
            <div className="flex w-full flex-col justify-between gap-2 md:flex-row">
              <div className="flex flex-col">
                <div className="mb-2 font-semibold text-accent">Scope</div>
                <code>{entry.meta.scope}</code>
              </div>
              <div className="flex flex-col">
                <div className="mb-2 font-semibold text-accent">Type</div>
                <code>{entry.meta.type}</code>
              </div>
              <div className="flex flex-col">
                <div className="mb-2 font-semibold text-accent">Location</div>
                <code>{entry.meta.page}</code>
              </div>
            </div>
          </CardHeader>

          <hr className="border-accent/40" />

          <CardContent className="mt-4 flex flex-col">
            <div className="mb-2 font-semibold text-accent">Description</div>
            <div>{entry.content.description}</div>
          </CardContent>

          {entry.content.deprecation && (
            <CardContent className="flex flex-col">
              <div className="mb-2 font-semibold italic text-accent">Deprecations</div>
              <div className="text-sm">{entry.content.deprecation}</div>
            </CardContent>
          )}

          {entry.content.link && (
            <CardContent className="mt-2 flex items-center gap-2">
              <div className="font-semibold italic text-accent">Link</div>
              <Link href={entry.content.link} className="text-sm">
                <Eye size={16} />
              </Link>
            </CardContent>
          )}

          <CardContent className="mt-2 flex flex-col items-start">
            {entry.content.attachments.length > 0 && (
              <div className="mb-2 font-semibold text-accent">Attachments</div>
            )}
            {entry.content.attachments.map((img, i) => (
              <div key={i}>
                <OverlayableImage
                  src={img}
                  alt={`attachment_${i + 1}`}
                  loading="eager"
                  priority={true}
                  width={1400}
                  height={1400}
                  className="mb-2 w-full"
                />
                {i < entry.content.attachments.length - 1 && <hr className="border-accent/40" />}
              </div>
            ))}
          </CardContent>

          <hr className="border-accent/40" />

          <CardFooter className="flex w-full flex-row justify-between rounded-md bg-base-300 px-4 py-4">
            <div className="flex flex-col">
              <div className="font-semibold text-accent">Author</div>
              <div className="text-sm">{entry.meta.author}</div>
            </div>
            <div className="flex flex-col">
              <div className="font-semibold text-accent">Date</div>
              <div className="text-sm">{entry.meta.date}</div>
            </div>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}
