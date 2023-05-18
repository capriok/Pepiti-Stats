'use client'

import { useEffect } from 'react'

interface Props {
  error: Error
  reset: () => void
}

export default function Error({ error, reset }: Props) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <main className="mx-auto grid h-[80vh] w-[400px] place-items-center">
      <div className="flex w-fit flex-col items-center justify-center">
        <p className="mb-2 text-center text-lg">Thats not right</p>
        <p className="mb-6 text-sm">The page was unable to load</p>
        <button className="w-fit" onClick={() => reset()}>
          Reload
        </button>
      </div>
    </main>
  )
}
