export const metadata = {
  keywords:
    'Pepiti, Pepiti Races, Pepiti Leagues, MX Bikes Stats, MX Bikes, Stats, MXB Mods, MX Bikes Mods',
}

export default async function AppLayout({ children }: { children: React.ReactNode }) {
  return <div className="mx-auto w-full max-w-[1400px] flex-1 px-4 xl:px-0">{children}</div>
}
