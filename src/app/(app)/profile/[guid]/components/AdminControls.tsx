'use client'

import { useRef } from 'react'
import { banRider, unbanRider } from '~/api/actions'

export default function AdminControls({ user, rider }) {
  const reasonRef = useRef<HTMLInputElement>(null)

  return (
    <div className="mb-2 flex justify-end">
      {user.isAdmin && (
        <div className="mb-2 flex justify-end">
          {rider.banned ? (
            <form action={unbanRider}>
              <button type="submit" name="guid" value={rider._id} className="btn-error btn-sm btn">
                Unban Rider
              </button>
            </form>
          ) : (
            <div className="dropdown-end dropdown">
              <label tabIndex={0} className="btn-error btn-sm btn">
                Ban Rider
              </label>
              <div
                tabIndex={0}
                className="card dropdown-content card-compact mx-auto mt-2 w-[250px] border-[1px] border-error bg-base-200/80 p-2 shadow-xl backdrop-blur-md">
                <form action={banRider} className="card-body flex justify-center">
                  <input
                    ref={reasonRef}
                    name="reason"
                    autoComplete="off"
                    placeholder="Reason for ban..."
                    className="input-bordered input input-sm mb-2 w-full"
                  />
                  <button
                    type="submit"
                    name="guid"
                    value={rider._id}
                    className="btn-error btn-sm btn">
                    Ban Rider
                  </button>
                </form>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
