import { BikeIcon } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "~/ui/Card"

export const metadata = {
  title: "Pepiti | Races",
  description: "Real-time statistics and analysis of recent races and events",
}

export default async function Page() {
  return (
    <div className="grid h-[40vh] place-items-center lg:h-[90vh]">
      <Card className="w-[250px]">
        <CardHeader>
          <CardTitle className="flex justify-center">Choose a Race</CardTitle>
        </CardHeader>
        <CardContent>
          <CardDescription className="flex justify-center">
            <BikeIcon />
          </CardDescription>
        </CardContent>
      </Card>
    </div>
  )
}
