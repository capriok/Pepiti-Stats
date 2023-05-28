"use client"

import { useRouter } from "next/navigation"
import { useEffect } from "react"

interface Props {
  error: Error
  reset: () => void
}

export default function Error({ error, reset }: Props) {
  const router = useRouter()

  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <main className="mx-auto grid h-[80vh] w-[400px] place-items-center">
      <div className="flex w-fit flex-col items-center justify-center">
        <p className="mb-2 text-center text-xl">Thats not right</p>
        <p className="text-md mb-6">The page was unable to load</p>
        <div className="flex justify-center gap-4">
          <button className="btn-ghost btn-sm btn" onClick={() => router.back()}>
            Go back
          </button>
          <button className="btn-ghost btn-sm btn" onClick={() => reset()}>
            Retry
          </button>
        </div>
      </div>
    </main>
  )
}
