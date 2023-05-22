import { BikeIcon } from 'lucide-react'

export const metaData = {
  title: 'Pepiti | Races',
  description: 'Recent Races hosted on Pepiti servers',
}

export default async function Page() {
  return (
    <div className="grid min-h-screen w-full place-items-center">
      <div className="card card-body grid place-items-center bg-base-200">
        <div>Choose a Race</div>
        <div>{<BikeIcon />}</div>
      </div>
    </div>
  )
}
