import { BikeIcon } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "~/ui/Card"

export const metadata = {
  title: "Pepiti | Races",
  description: "Real-time statistics and analysis of recent races and events",
}

export default async function Page() {
  return (
    <div className="grid min-h-screen w-full place-items-center">
      <Card>
        <CardHeader>
          <CardTitle>Choose a Race</CardTitle>
        </CardHeader>
        <CardContent>
          <CardDescription>
            <BikeIcon />
          </CardDescription>
        </CardContent>
      </Card>
    </div>
  )
}
