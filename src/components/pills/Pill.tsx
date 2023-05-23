interface PillProps {
  text: any
  color?: string
}

export const Pill = ({ text, color = 'neutral' }: PillProps) => {
  const bgColor = color !== 'neutral' ? `bg-${color}-600/80` : 'bg-neutral-600/80'
  const textColor = color !== 'neutral' ? `text-${color}-400` : 'text-neutral-200'

  return (
    <div
      className={`pill ${bgColor} ${textColor} w-fit rounded-[10px] px-2 py-1 text-center font-semibold`}>
      <div className="m-0 p-0 text-sm">{text}</div>
    </div>
  )
}
