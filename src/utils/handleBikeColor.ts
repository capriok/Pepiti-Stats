const brandMap: any = {
  Honda: 'bg-red-700/60',
  Kawasaki: 'bg-green-500/60',
  Yamaha: 'bg-blue-600/60',
  KTM: 'bg-orange-500/60',
  GASGAS: 'bg-red-600/60',
  Husqvarna: 'bg-accent/60',
  Suzuki: 'bg-yellow-300/60',
  Fantic: 'bg-neutral-700/60',
  Alta: 'bg-neutral-800/60',
  TM: 'bg-sky-400/60',
  Beta: 'bg-red-700/60',
  '': 'bg-black',
}

export const handleBikeColor = (bike: string) => {
  const brands = Object.keys(brandMap)
  const brand = brands.find((brand) => bike.includes(brand))

  return brandMap[brand || ''] + ' text-center'
}
