'use client'

import { useSearchParams } from 'next/navigation'
import { joinLeague } from '~/api/actions'
import { useToast, actions } from "~/components/toast"

interface Props {
  leagueId: string
}

export default function LeagueSignupForm({ leagueId }: Props) {
  const searchParams = useSearchParams()
  const guid = searchParams.get("guid") ?? ""
  const { pushToast } = useToast()

  // ? Get bikes in simple list like track_names
  // const {data, isLoading} = useSWR('/top/bikes')
  // if (isLoading) return <Spinner />
  // const bikes = data?.bikes.map(bike => ({_id: bike._id, name: bike.name}))

  return (
    <div className="w-full">
      <form
        action={(formData) =>
          joinLeague(formData)
            .then(() => pushToast(actions.joinLeague))
            .catch(pushToast)
        }
      >
        <input name="leagueId" value={leagueId} className="hidden" />
        <div className="flex flex-col">
          <label className="mb-2 mt-4 text-accent">GUID</label>
          <input
            name="guid"
            className="input-bordered input bg-base-200"
            required={true}
            value={guid}
            readOnly={guid ? true : false}
          />
        </div>
        <div className="flex flex-col">
          <label className="mb-2 mt-4 text-accent">Rider Name</label>
          <input
            required={true}
            name="riderName"
            type="text"
            className="input-bordered input bg-base-200"
          />
        </div>
        <div className="flex flex-col">
          <label className="mb-2 mt-4 text-accent">Team Name</label>
          <input
            required={true}
            name="teamName"
            type="text"
            className="input-bordered input bg-base-200"
          />
        </div>
        <div className="flex flex-col">
          <label className="mb-2 mt-4 text-accent">Race Number</label>
          <input
            required={true}
            name="raceNumber"
            type="number"
            className="input-bordered input bg-base-200"
          />
        </div>
        <div className="flex flex-col">
          <label className="mb-2 mt-4 text-accent">Bike Choice</label>
          <select
            name="bikePreference"
            defaultValue="Yamaha YZ450F 2023"
            className="select-bordered select w-full bg-base-200"
          >
            <option value="KTM 450 SX-F 2023">KTM 450 SX-F 2023</option>
            <option value="Husqvarna FC 450 2023">Husqvarna FC 450 2023</option>
            <option value="GASGAS MC 450F 2023">GASGAS MC 450F 2023</option>
            <option value="Yamaha YZ450F 2023">Yamaha YZ450F 2023</option>
            <option value="Honda CRF 450R 2023">Honda CRF 450R 2023</option>
            <option value="Kawasaki KX450 2023">Kawasaki KX450 2023</option>
            <option value="Suzuki RM-Z450 2023">Suzuki RM-Z450 2023</option>
            <option value="Fantic 450 2023">Fantic 450 2023</option>
            <option value="TM 450 2023">TM 450 2023</option>
            <option value="KTM 250 SX-F 2023">KTM 250 SX-F 2023</option>
            <option value="Husqvarna FC 250 2023">Husqvarna FC 250 2023</option>
            <option value="GASGAS MC 250F 2023">GASGAS MC 250F 2023</option>
            <option value="Yamaha YZ250F 2023">Yamaha YZ250F 2023</option>
            <option value="Honda CRF 250R 2023">Honda CRF 250R 2023</option>
            <option value="Kawasaki KX250 2023">Kawasaki KX250 2023</option>
            <option value="Suzuki RM-Z250 2023">Suzuki RM-Z250 2023</option>
            <option value="Fantic 250 2023">Fantic 250 2023</option>
            <option value="TM 250 2023">TM 250 2023</option>
          </select>
        </div>
        <div className="flex flex-col">
          <label className="mb-2 mt-4 text-accent">Server Preference</label>
          <select
            name="serverPreference"
            defaultValue="nuremberg-eu-central"
            className="select-bordered select w-full bg-base-200"
          >
            <option value="or-us-west">Oregon - US West</option>
            <option value="va-us-east">Virginia - US East</option>
            <option value="helsinki-eu-central">Helsinki - EU Central</option>
            <option value="nuremberg-eu-central">Nuremberg - EU Central</option>
            <option value="falkenstein-eu-central">Falkenstein - EU Central</option>
          </select>
        </div>
        <div className="mt-4 flex w-full justify-center">
          <button type="submit" className="btn-secondary btn-sm btn" disabled={false}>
            Submit
          </button>
        </div>
      </form>
    </div>
  )
}
