interface Props {
  title: string
  extra?: React.ReactNode
  wide?: boolean
  marginTop?: boolean
}

const PageHeader: React.FC<Props> = ({ title, extra, wide, marginTop = true }) => {
  const wideCn = wide ? "w-full" : "max-w-[1500px]"
  const marginTopCn = marginTop ? "my-4 md:my-8" : ""
  const headerCn = `rounded-box mx-auto bg-base-200 px-2 md:px-0 shadow-md ${wideCn} ${marginTopCn}`

  return (
    <div className={headerCn}>
      <div className=" flex w-full flex-col items-center justify-between p-5 md:flex-row">
        <div className="mb-2 text-2xl font-bold md:mb-0 md:text-3xl">{title}</div>
        {extra}
      </div>
    </div>
  )
}

export default PageHeader
