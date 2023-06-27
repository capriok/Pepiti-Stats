"use client"

import { useRouter } from "next/navigation"
import { Button } from "~/ui/Button"

interface Props {
  title?: string
  description?: any
  extra?: any
  goBackText?: string
}

const Result: React.FC<Props> = (props) => {
  const router = useRouter()
  const defaultTitle = "Error"
  const defaultDescription = "Something went wrong"

  return (
    <div className="flex h-screen items-center justify-center">
      <div className="card card-body flex w-full max-w-[800px] flex-col items-center justify-center rounded-lg bg-base-200 p-10">
        <div className="mx-auto w-fit p-4 md:p-10">
          <div className="mb-5 text-2xl">{props.title || defaultTitle}</div>
          <div className="mb-5">{props.description || defaultDescription}</div>
          <div className="flex flex-col items-start gap-2">
            <div>{props.extra}</div>
            <Button variant="outline" onClick={() => router.back()}>
              <div className="hidden font-normal md:inline">{props.goBackText || "Go Back"}</div>
              <div className="font-normal md:hidden">Go back</div>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Result
