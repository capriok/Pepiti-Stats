import { Hammer, ScrollText, Shield } from "lucide-react"
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
    <div className="grid place-items-center gap-2 md:mt-6 md:px-4">
      <div>
        <div className="my-4 text-xl font-semibold">Blacklists</div>
        <Link href="/admin/blacklists">
          <div className="group btn flex min-h-[75px] w-[300px] items-center justify-between border-none bg-base-200 text-accent shadow-md hover:border-secondary hover:bg-base-200">
            <div className="dark:text-white">Blacklists</div>
            <ScrollText className="group-hover:text-secondary" />
          </div>
        </Link>
      </div>

      <div>
        <div className="my-4 text-xl font-semibold">Reports</div>
        <Link href="/admin/reports">
          <div className="group btn flex min-h-[75px] w-[300px] items-center justify-between border-none bg-base-200 text-accent shadow-md hover:border-secondary hover:bg-base-200">
            <div className="dark:text-white">Rider Reports</div>
            <Shield className="group-hover:text-secondary" />
          </div>
        </Link>
      </div>

      <div>
        <div className="my-4 text-xl font-semibold">Bans</div>
        <Link href="/admin/appeals">
          <div className="group btn flex min-h-[75px] w-[300px] items-center justify-between border-none bg-base-200 text-accent shadow-md hover:border-secondary hover:bg-base-200">
            <div className="dark:text-white">Ban Appeals</div>
            <Hammer className="group-hover:text-secondary" />
          </div>
        </Link>
      </div>
    </div>
  )
}
