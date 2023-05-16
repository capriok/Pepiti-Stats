const brandMap: any = {
   Honda: 'bg-red-700/40',
   Kawasaki: 'bg-green-500/40',
   Yamaha: 'bg-blue-600/40',
   KTM: 'bg-orange-500/40',
   GASGAS: 'bg-red-600/40',
   Husqvarna: 'bg-neutral-100/60',
   Suzuki: 'bg-yellow-300/30',
   Fantic: 'bg-neutral-700/50',
   Alta: 'bg-neutral-800/40/50',
   TM: 'bg-sky-400/30',
   Beta: 'bg-red-700/20',
   '': 'bg-black',
}

export const handleBikeColor = (bike: string) => {
   const brands = Object.keys(brandMap)
   const brand = brands.find((brand) => bike.includes(brand))

   return brandMap[brand || ''] + ' text-center'
}
