'use client'

import { useState } from 'react'
import useSWR from 'swr'
import { fetcher } from '~/api'
import Spinner from '~/components/Spinner'

interface Props {
  user: any
  events: Array<RecentRace>
}

export function RiderReportForm({ user, events }: Props) {
  const [eventId, setEventId] = useState(null)

  const handleEventSelect = (e) => {
    console.log(e.target.value)
    setEventId(e.target.value)
  }

  return (
    <div className="card card-body mx-auto mt-10 w-fit bg-base-200">
      <div className="flex flex-col justify-center align-middle">
        <div className="form-control w-full max-w-xs">
          {/* Event */}
          <div className="mb-2 text-xl font-semibold">Event</div>
          <label className="label">
            <span className="label-text">
              <span className="text-red-500">* </span> Choose Event
            </span>
          </label>
          <select
            className="input-bordered select w-[400px] max-w-xs"
            onChange={handleEventSelect}
            defaultValue="">
            <option disabled />
            {events.map((event) => (
              <option key={event._id} value={event._id}>
                {event.track}
              </option>
            ))}
          </select>
          <br />

          {/* Rider */}
          {eventId && <RiderFormPart2 user={user} eventId={eventId} />}
        </div>
      </div>
    </div>
  )
}

export function RiderFormPart2({ user, eventId }) {
  const [riderForm, setRiderForm] = useState({
    rider: '',
    claim: '',
  })

  const { data, isLoading } = useSWR(`/races/${eventId}`, fetcher)

  if (isLoading) {
    return <Spinner />
  }

  const event = data
  console.log(event)

  const riders = Object.values(event.riders).map((r: any) => ({
    ...r,
    id: r.guid,
  }))

  const handleRiderSelect = (e) => {
    console.log(e.target.value)
    setRiderForm({ ...riderForm, rider: e.target.value })
  }

  const handleClaimChange = (e) => {
    console.log(e.target.value)
    setRiderForm({ ...riderForm, claim: e.target.value })
  }

  const charactersCn =
    riderForm.claim.length > 50 ? 'text-xs text-green-500' : 'text-xs text-red-500'

  return (
    <>
      <div className="mb-2 text-xl font-semibold">Rider</div>
      <label className="label">
        <span className="label-text">
          <span className="text-red-500">* </span> Rider Name
        </span>
      </label>
      <select
        className="input-bordered select w-full max-w-xs"
        onChange={handleRiderSelect}
        defaultValue="">
        <option disabled />
        {riders.map((rider) => (
          <option key={rider.id + rider.name + rider.bike_name} value={rider.id}>
            {rider.name}
          </option>
        ))}
      </select>
      <label className="label mt-2 flex justify-between">
        <span className="label-text">
          <span className="text-red-500">* </span> Claim/Reason
        </span>
        <span className={charactersCn}>Required: {riderForm.claim.length} / 50</span>
      </label>
      <textarea className="textarea-bordered textarea h-24" onChange={handleClaimChange} />
      <br />

      {riderForm.rider && riderForm.claim.length > 50 && (
        <ProofFormPart3 user={user} eventId={eventId} riderForm={riderForm} />
      )}
    </>
  )
}

export function ProofFormPart3({ user, eventId, riderForm }) {
  const [files, setFiles] = useState([])

  const handleFileChange = (e) => {
    console.log(e.target.files)
    setFiles(e.target.files)
  }

  const disabled = !eventId || !riderForm.rider || riderForm.claim.length < 50 || !files.length
  const buttonCn = disabled ? '' : 'bg-secondary rounded-lg py-2 font-semibold text-white'

  const handleSumbit = () => {
    console.log('Report Form', {
      plaintiffId: user._id,
      eventId: eventId,
      defendantId: riderForm.rider,
      claim: riderForm.claim,
      proofs: files,
    })
  }

  return (
    <>
      <div className="mb-2 text-xl font-semibold">Proof</div>
      <label className="label">
        <span className="label-text">
          <div className="text-sm">Photo/Video</div>
        </span>
      </label>
      <input
        type="file"
        multiple={true}
        className="file-input-bordered file-input w-full max-w-xs"
        onChange={handleFileChange}
      />

      <br />
      <button className={buttonCn} disabled={disabled} onClick={handleSumbit}>
        Submit
      </button>
    </>
  )
}
