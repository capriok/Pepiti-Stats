import Link from "next/link"
import PageLayout from "~/components/PageLayout"
import Devlogs from "./Devlogs"

export const metadata = {
  title: "Pepiti | Development Updates",
  description: "Pepiti Web Development Updates",
}

export default function Page() {
  return (
    <PageLayout
      width="feed"
      header={{
        title: "Development Updates",
        extra: (
          <Link href="/dashboard" className="no-underline">
            Go back
          </Link>
        ),
      }}
    >
      <Devlogs />
    </PageLayout>
  )
}
