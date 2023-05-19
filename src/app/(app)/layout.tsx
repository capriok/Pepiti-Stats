export const metadata = {
  title: 'Pepiti Stats',
  description: 'MX Bikes Stats',
  keywords: 'Pepiti, MX Bikes Stats, MX Bikes, Stats, MXBikes, MXBikes Stats, MXB Mods',
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  return <div className="mx-auto w-full max-w-[1400px] flex-1 px-2 md:px-0">{children}</div>
}
