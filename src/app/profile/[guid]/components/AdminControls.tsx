'use client'

import { Suspense, useRef } from 'react'
import { banRider, unbanRider } from '~/api/server-actions'

export default async function AdminControls({ user, rider }) {
  const reasonRef = useRef<HTMLInputElement>(null)

  async function banUser() {
    if (reasonRef.current) {
      banRider(rider._id, reasonRef.current.value)
      // await Api.BanRider(rider._id, reasonRef.current.value, user.token)
      //   .then((res) => console.log(res))
      //   .catch((err) => console.log(err))
    }
  }

  async function unbanUser() {
    unbanRider(rider._id)
    // await Api.UnBanRider(rider._id, user.token)
    //   .then((res) => console.log(res))
    //   .catch((err) => console.log(err))
  }

  return (
    user.isAdmin && (
      <div className="flex justify-end mb-2">
        {rider.banned ? (
          <button className="btn btn-error btn-sm" onClick={() => unbanUser()}>
            Unban User
          </button>
        ) : (
          <div className="dropdown dropdown-end">
            <label tabIndex={0} className="btn btn-sm btn-error">
              Ban User
            </label>
            <div
              tabIndex={0}
              className="dropdown-content bg-neutral-800/70 backdrop-blur-md card card-compact w-64 mx-auto p-2 shadow-xl border-[1px] border-error mt-2">
              <div className="card-body">
                <div>
                  <label className="label">
                    <span className="label-text">Reason</span>
                  </label>
                  <input
                    ref={reasonRef}
                    className="input input-bordered input-sm w-full"
                    placeholder="Reason for ban..."
                  />
                </div>
                <button className="btn btn-error btn-sm" onClick={() => banUser()}>
                  Ban
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    )
  )
}
