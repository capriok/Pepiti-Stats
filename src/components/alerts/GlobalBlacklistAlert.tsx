import Link from "next/link"
import { Alert, AlertDescription, AlertTitle } from "~/ui/Alert"
import { Button } from "~/ui/Button"
import { Hammer } from "lucide-react"

interface Props {}

export default function GlobalBlacklistAlert({}: Props) {
  return (
    <Alert className="mb-4 border-error">
      <Hammer size={20} />
      <AlertTitle>Global</AlertTitle>
      <AlertDescription className="flex h-[35px] flex-wrap items-center justify-between">
        <div>
          If youre on this list, you did something worthy of being banned from online racing for the
          foreseeable future
        </div>
        <Link target="_blank" rel="noopener noreferrer" href="https://discord.com/invite/mx-bikes">
          <Button variant="outline" className="bg-base-300" size="sm">
            Discord Appeal
          </Button>
        </Link>
      </AlertDescription>
    </Alert>
  )
}
