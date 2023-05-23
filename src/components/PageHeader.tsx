interface Props {
  title: string
  extra?: React.ReactNode
  wide?: boolean
  marginTop?: boolean
}

const PageHeader: React.FC<Props> = ({ title, extra, wide, marginTop = true }) => (
  <div
    className={`${
      wide ? 'w-full' : 'max-w-[1500px]'
    } rounded-box mx-auto bg-base-200 px-2 md:px-0 ${marginTop ? 'my-4 md:my-6' : ''}`}>
    <div className=" flex w-full flex-col items-center justify-between p-5  md:flex-row">
      <div className="mb-2 text-3xl font-bold md:mb-0">{title}</div>
      {extra}
    </div>
  </div>
)

export default PageHeader
