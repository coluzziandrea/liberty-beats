import { useSelector } from 'react-redux'
import { selectMaxBars } from '../../store/selectors'

export const Ruler = () => {
  const maxBars = useSelector(selectMaxBars)
  return (
    <div className="flex flex-row">
      {Array.from({ length: maxBars }).map((_, i) => (
        <div key={i} className="w-16 h-4 border border-gray-300">
          {i}
        </div>
      ))}
    </div>
  )
}
