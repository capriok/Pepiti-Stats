interface Props {
  title: string
  extra?: React.ReactNode
}

const PageHeader: React.FC<Props> = ({ title, extra }) => (
  <div className="max-w-[1500px] bg-base-200 px-2 md:px-0 mx-auto rounded-box">
    <div className="w-full flex flex-col md:flex-row justify-between items-center p-5 mt-7">
      <div className="text-3xl font-bold text-white mb-2 md:mb-0">{title}</div>
      {extra}
    </div>
  </div>
)

export default PageHeader
