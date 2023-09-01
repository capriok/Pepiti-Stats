import { Hammer } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "~/ui/Alert"

interface Props {}

export default function SafetyBlacklistAlert({}: Props) {
  return (
    <Alert className="mb-4 border-warning">
      <Hammer size={20} />
      <AlertTitle>Safety Rating</AlertTitle>
      <AlertDescription className="flex h-[35px] items-center">
        If youre on this list, you have a Safety Rating below 950, race in a banned/no-contact
        server to build your SR back up
      </AlertDescription>
    </Alert>
  )
}
