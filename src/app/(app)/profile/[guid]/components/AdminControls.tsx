"use client"

import BanRiderButton from "~/components/actions/BanRiderButton"
import UnbanRiderButton from "~/components/actions/UnbanRiderButton"

export default function AdminControls({ user, rider }) {
  return (
    <div className="mb-2 flex justify-end">
      {user.isAdmin && (
        <div className="mb-2 flex justify-end">
          {rider.banned ? (
            <UnbanRiderButton guid={rider._id} name={rider.name} />
          ) : (
            <BanRiderButton guid={rider._id} name={rider.name} />
          )}
        </div>
      )}
    </div>
  )
}
