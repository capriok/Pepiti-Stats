'use client'

import { useRef } from 'react'
import { banRider } from '~/api/server-actions'

export default function BanRider({ guid }: { guid: string }) {
  const reasonRef = useRef<HTMLInputElement>(null)

  return (
    <>
      {/* <div>
        <label className="label">
          <span className="label-text">Reason</span>
        </label>
        <input
          ref={reasonRef}
          className="input-bordered input input-sm w-full"
          placeholder="Reason for ban..."
        />
      </div>
      <button
        className="btn-error btn-sm btn"
        onClick={() => banRider(guid, reasonRef.current!.value)}>
        Ban
      </button> */}
    </>
  )
}
