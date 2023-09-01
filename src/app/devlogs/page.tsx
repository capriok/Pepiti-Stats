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
        backEnabled: true,
        title: "Development Updates",
      }}
    >
      <Devlogs />
    </PageLayout>
  )
}
