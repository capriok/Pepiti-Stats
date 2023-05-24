export const metadata = {
  keywords:
    'Pepiti, Pepiti Races, Pepiti Leagues, MX Bikes Stats, MX Bikes, Stats, MXB Mods, MX Bikes Mods',
}
interface Props {
  children: React.ReactNode
  modal: React.ReactNode
}

export default async function AppLayout(props: Props) {
  return (
    <div className="mx-auto w-full max-w-[1400px] px-4 xl:px-0">
      {props.children}
      {props.modal}
    </div>
  )
}
