interface PillProps {
  text: any
  color?: string
}

export const Pill = ({ text, color = 'neutral' }: PillProps) => {
  const bgColor = color ? `bg-${color}-500/30` : 'bg-neutral-500/30'
  const textColor = color ? `text-${color}-300` : 'text-neutral-300'

  return (
    <div
      className={`pill ${bgColor} ${textColor} w-fit rounded-[10px] px-2 py-1 text-center font-semibold`}>
      <div className="m-0 p-0 text-sm">{text}</div>
    </div>
  )
}
