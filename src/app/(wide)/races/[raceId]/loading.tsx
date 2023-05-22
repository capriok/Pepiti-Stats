import Spinner from '~/components/Spinner'

export default function Loading() {
  return (
    <div className="grid h-full w-full place-items-center">
      <Spinner />
    </div>
  )
}
