import { NewspaperIcon } from 'lucide-react'
import Link from 'next/link'
import PageHeader from '~/components/PageHeader'

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
    <div className="md: mt-6 flex w-full flex-col px-0 text-white md:flex-row md:px-4">
      <div className="mr-4 flex flex-col">
        <div className="mb-4 text-2xl">Blacklists</div>
        <Link
          href="/admin/blacklist"
          className="card card-body mb-2 flex w-[300px] cursor-pointer bg-neutral-800/40 no-underline hover:bg-neutral-800">
          <div className="flex">
            <NewspaperIcon />
            <div className="ml-4">Blacklist</div>
          </div>
        </Link>
      </div>
      <div className="mr-4 flex flex-col">
        <div className="mb-4 text-2xl">Ban Reports</div>
        <Link
          href="/admin/rider-reports"
          className="card card-body mb-2 flex w-[300px] cursor-pointer bg-neutral-800/40 no-underline hover:bg-neutral-800">
          <div className="flex">
            <NewspaperIcon />
            <div className="ml-4">Rider Reports</div>
          </div>
        </Link>
      </div>
    </div>
  )
}
