import { NewspaperIcon } from "lucide-react"
import Link from "next/link"
import PageHeader from "~/components/PageHeader"

export const metadata = {
  title: "Pepiti | Admin Portal",
  description: "Admin Portal for managing Pepiti services",
}

export default function Page() {
  return (
    <div className="min-h-screen">
      <PageHeader title="Admin Portal" />
      <Managers />
    </div>
  )
}

const Managers = () => {
  return (
    <div className="md: mt-6 flex w-full flex-col px-0 md:flex-row md:px-4">
      <div className="mr-4 flex flex-col">
        <div className="my-4 text-xl font-semibold">Blacklists</div>
        <Link
          href="/admin/blacklists"
          className="card card-body mb-2 flex w-[300px] cursor-pointer bg-base-200 no-underline hover:bg-secondary"
        >
          <div className="flex">
            <NewspaperIcon />
            <div className="ml-4">Blacklist</div>
          </div>
        </Link>
      </div>
      <div className="mr-4 flex flex-col">
        <div className="my-4 text-xl font-semibold">Rider Reports</div>
        <Link
          href="/admin/reports"
          className="card card-body mb-2 flex w-[300px] cursor-pointer bg-base-200 no-underline hover:bg-secondary"
        >
          <div className="flex">
            <NewspaperIcon />
            <div className="ml-4">Rider Reports</div>
          </div>
        </Link>
      </div>
    </div>
  )
}
