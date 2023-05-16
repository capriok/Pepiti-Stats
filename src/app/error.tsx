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
    <main className="w-[400px] h-[80vh] grid place-items-center mx-auto">
      <div className="flex flex-col w-fit justify-center items-center">
        <p className="mb-2 text-lg text-center">Thats not right</p>
        <p className="mb-6 text-sm">The page was unable to load</p>
        <button className="w-fit" onClick={() => reset()}>
          Reload
        </button>
      </div>
    </main>
  )
}
