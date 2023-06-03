import PageHeader from "~/components/PageHeader"
import { NewspaperIcon } from "lucide-react"
import Link from "next/link"

export async function generateMetadata() {
  return {
    title: `Pepiti | Records`,
    description: "Records with an in depth view",
  }
}

export default async function Page() {
  return (
    <div className="mx-auto w-full max-w-[1000px]">
      <PageHeader
        title="Pepiti Records"
        extra={
          <Link href="/dashboard" className="no-underline">
            Go back
          </Link>
        }
      />
      <Records />
    </div>
  )
}

const Records = () => {
  return (
    <div className="md: mt-6 grid grid-cols-1 md:grid-cols-3 md:px-4">
      <div className="mr-4 flex flex-col">
        <div className="my-4 text-xl font-semibold">World Records</div>
        <Link
          href="/records/riders"
          className="card card-body mb-2 flex w-[300px] cursor-pointer bg-base-200 no-underline hover:bg-secondary"
        >
          <div className="flex">
            <NewspaperIcon />
            <div className="ml-4">Record Holders</div>
          </div>
        </Link>
      </div>

      <div className="mr-4 flex flex-col">
        <div className="my-4 text-xl font-semibold">MMR</div>
        <Link
          href="/records/mmr"
          className="card card-body mb-2 flex w-[300px] cursor-pointer bg-base-200 no-underline hover:bg-secondary"
        >
          <div className="flex">
            <NewspaperIcon />
            <div className="ml-4">Top MMR Rankings</div>
          </div>
        </Link>
      </div>

      <div className="mr-4 flex flex-col">
        <div className="my-4 text-xl font-semibold">SR</div>
        <Link
          href="/records/sr"
          className="card card-body mb-2 flex w-[300px] cursor-pointer bg-base-200 no-underline hover:bg-secondary"
        >
          <div className="flex">
            <NewspaperIcon />
            <div className="ml-4">Top MMR Rankings</div>
          </div>
        </Link>
      </div>

      <div className="mr-4 flex flex-col">
        <div className="my-4 text-xl font-semibold">Bikes</div>
        <Link
          href="/records/bikes"
          className="card card-body mb-2 flex w-[300px] cursor-pointer bg-base-200 no-underline hover:bg-secondary"
        >
          <div className="flex">
            <NewspaperIcon />
            <div className="ml-4">Bike Lap Totals</div>
          </div>
        </Link>
      </div>

      <div className="mr-4 flex flex-col">
        <div className="my-4 text-xl font-semibold">Contacts</div>
        <Link
          href="/records/contacts"
          className="card card-body mb-2 flex w-[300px] cursor-pointer bg-base-200 no-underline hover:bg-secondary"
        >
          <div className="flex">
            <NewspaperIcon />
            <div className="ml-4">Most Unaware Riders</div>
          </div>
        </Link>
      </div>
    </div>
  )
}
