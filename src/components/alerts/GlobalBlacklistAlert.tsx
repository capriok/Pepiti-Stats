import { Hammer } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "~/ui/Alert"

interface Props {}

export default function GlobalBlacklistAlert({}: Props) {
  return (
    <Alert className="mb-4 border-error">
      <Hammer size={20} />
      <AlertTitle>Global</AlertTitle>
      <AlertDescription>
        If youre on this list, you did something worthy of being banned from online racing for the
        foreseeable future
      </AlertDescription>
    </Alert>
  )
}
