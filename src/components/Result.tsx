import Link from 'next/link'

interface Props {
  title?: string
  description?: any
  extra?: any
  goBackText?: string
}

const Result: React.FC<Props> = (props) => {
  const defaultTitle = 'Error.'
  const defaultDescription = 'Something went wrong.'
  const deafaultGoBackText = 'Get me out of here'

  return (
    <div className="flex h-screen items-center justify-center px-2">
      <div className="flex w-fit flex-col items-center justify-center bg-neutral-700/30 text-neutral-200 md:w-[75%] lg:w-[65%] xl:w-[55%]">
        <div className="w-4/5 py-40 md:w-[65%]">
          <div className="mb-5 text-2xl">{props.title || defaultTitle}</div>
          <div className="mb-5">{props.description || defaultDescription}</div>
          <div className="flex items-end">
            {props.extra}
            <Link
              href="/dashboard"
              className="flex-1 text-neutral-400 hover:text-green-500 hover:opacity-75">
              <div className="text-md hidden rounded-xl px-2 py-1 hover:bg-neutral-900 md:inline">
                {props.goBackText || deafaultGoBackText}
              </div>
              <div className="text-md rounded-xl px-2 py-1 hover:bg-neutral-900 md:hidden">
                Go back
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Result
