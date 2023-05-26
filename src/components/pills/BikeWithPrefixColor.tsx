import { handleBikeColor } from '~/utils/handleBikeColor'

export default function BikeWithPrefixColor({ bike }) {
  const bikeColor = handleBikeColor(bike)

  return (
    <div className="flex items-center">
      <div className={`mr-3 h-5 w-2 ${bikeColor}`} />
      {bike ? bike : '-'}
    </div>
  )
}
