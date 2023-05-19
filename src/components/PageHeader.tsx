interface Props {
  title: string
  extra?: React.ReactNode
  wide?: boolean
}

const PageHeader: React.FC<Props> = ({ title, extra, wide }) => (
  <div
    className={`${
      wide ? 'w-full' : 'max-w-[1500px]'
    } rounded-box mx-auto bg-base-200 px-2 md:px-0`}>
    <div className="mt-7 flex w-full flex-col items-center justify-between p-5 md:flex-row">
      <div className="mb-2 text-3xl font-bold text-white md:mb-0">{title}</div>
      {extra}
    </div>
  </div>
)

export default PageHeader
