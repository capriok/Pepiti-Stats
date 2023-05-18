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
      <div className="mb-2 flex justify-end">
        {rider.banned ? (
          <button className="btn-error btn-sm btn" onClick={() => unbanUser()}>
            Unban User
          </button>
        ) : (
          <div className="dropdown-end dropdown">
            <label tabIndex={0} className="btn-error btn-sm btn">
              Ban User
            </label>
            <div
              tabIndex={0}
              className="card dropdown-content card-compact mx-auto mt-2 w-64 border-[1px] border-error bg-neutral-800/70 p-2 shadow-xl backdrop-blur-md">
              <div className="card-body">
                <div>
                  <label className="label">
                    <span className="label-text">Reason</span>
                  </label>
                  <input
                    ref={reasonRef}
                    className="input-bordered input input-sm w-full"
                    placeholder="Reason for ban..."
                  />
                </div>
                <button className="btn-error btn-sm btn" onClick={() => banUser()}>
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
