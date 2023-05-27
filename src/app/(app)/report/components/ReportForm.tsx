'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'
import useSWR from 'swr'
import { postRiderReport } from '~/api/actions'
import { fetcher } from '~/api/fetcher'
import Spinner from '~/components/Spinner'
import { useToast } from '~/hooks/toast'
import { ToastMessages, handleActionWithToast } from '~/utils/handleActionWithToast'

interface Props {
  user: any
  events: Array<RecentRace>
}

export default function RiderReportForm({ user, events }: Props) {
  const router = useRouter()
  const [eventId, setEventId] = useState(null)
  const { toast } = useToast()
  const postReportToastMessages: ToastMessages = {
    title: "Rider Report",
    msg: "You have successfully sent a rider report for admins to review."
  }

  const handleEventSelect = (e) => {
    setEventId(e.target.value)
  }

  if (!user.guid) return router.push('/signin')
  console.log(user.guid)

  return (
    <div className="card card-body mx-auto mt-10 w-fit bg-base-200">
      <div className="flex flex-col justify-center align-middle">
        <form action={(formData) => handleActionWithToast(postRiderReport(formData), postReportToastMessages, toast)} className="form-control w-full max-w-xs">
          {/* User Guid */}
          <div className="mb-2 text-lg font-semibold">GUID</div>
          <input
            readOnly
            name="userGuid"
            value={user.guid}
            className="input-bordered input bg-base-200"
          />
          <br />

          {/* Event */}
          <div className="mb-2 text-lg font-semibold">Event</div>
          <label className="label">
            <span className="label-text">
              <span className="text-red-500">* </span> Choose Event
            </span>
          </label>
          <select
            name="eventId"
            defaultValue=""
            className="input-bordered select w-[400px] max-w-xs bg-base-200"
            onChange={handleEventSelect}
          >
            <option disabled />
            {events.map((event) => (
              <option key={event._id} value={event._id}>
                {event.track}
              </option>
            ))}
          </select>
          <br />

          {/* Rider */}
          {eventId && <RiderFormPart2 eventId={eventId} />}
        </form>
      </div>
    </div>
  )
}

export function RiderFormPart2({ eventId }) {
  const [riderForm, setRiderForm] = useState({
    rider: '',
    reason: '',
  })

  const { data, isLoading } = useSWR(`/races/${eventId}`, fetcher)

  if (isLoading) {
    return <Spinner />
  }

  const riders = Object.values(data.riders).map((r: any) => ({
    ...r,
    id: r.guid,
  }))

  const handleRiderSelect = (e) => {
    setRiderForm({ ...riderForm, rider: e.target.value })
  }

  const handleReasonChange = (e) => {
    setRiderForm({ ...riderForm, reason: e.target.value })
  }

  const charactersCn = riderForm.reason.length > 50 ? 'text-green-500' : 'text-red-500'

  return (
    <>
      <div className="mb-2 text-lg font-semibold">Rider</div>
      <label className="label">
        <span className="label-text">
          <span className="text-red-500">* </span> Rider Name
        </span>
      </label>
      <select
        name="riderGuid"
        defaultValue=""
        onChange={handleRiderSelect}
        className="input-bordered select w-full max-w-xs bg-base-200"
      >
        <option disabled />
        {riders.map((rider) => (
          <option key={rider.id + rider.name + rider.bike_name} value={rider.id}>
            {rider.name}
          </option>
        ))}
      </select>
      <label className="label mt-2 flex justify-between">
        <span className="label-text">
          <span className="text-red-500">* </span> Reason for Report
        </span>
        <span className={`text-xs ${charactersCn}`}>Required: {riderForm.reason.length} / 50</span>
      </label>
      <textarea
        name="reason"
        className="textarea-bordered textarea h-24 bg-base-200"
        onChange={handleReasonChange}
      />
      <br />

      {riderForm.rider && riderForm.reason.length > 50 && (
        <ProofFormPart3 eventId={eventId} riderForm={riderForm} />
      )}
    </>
  )
}

export function ProofFormPart3({ eventId, riderForm }) {
  const [proofsCount, setProofsCount] = useState(0)

  const handleProofChange = (value) => {
    setProofsCount((c) => (value ? c + 1 : c - 1))
  }

  const disabled = !eventId || !riderForm.rider || riderForm.reason.length < 50 || proofsCount < 1
  const buttonCn = disabled ? '' : 'bg-secondary rounded-lg py-2 font-semibold text-white'

  const requiredCn = proofsCount < 1 ? 'text-red-500' : 'text-green-500'

  return (
    <>
      <div className="mb-2 text-xl font-semibold">Proof</div>
      <label className="label flex justify-between">
        <span className="label-text">
          <span className="text-red-500">* </span> Photo/Video Links
        </span>
        <span className={`text-xs ${requiredCn}`}>Required: {proofsCount} / 1</span>
      </label>
      <input
        name="proof1"
        type="text"
        required={true}
        onChange={(e) => handleProofChange(e.target.value)}
        className="input input-sm mb-2 bg-base-200"
        placeholder="Proof link..."
      />
      <input
        name="proof2"
        type="text"
        onChange={(e) => handleProofChange(e.target.value)}
        className="input input-sm mb-2 bg-base-200"
        placeholder="Proof link..."
      />
      <input
        name="proof3"
        type="text"
        onChange={(e) => handleProofChange(e.target.value)}
        className="input input-sm mb-2 bg-base-200"
        placeholder="Proof link..."
      />

      <br />
      <button className={buttonCn} disabled={disabled} type="submit">
        Submit
      </button>
    </>
  )
}
