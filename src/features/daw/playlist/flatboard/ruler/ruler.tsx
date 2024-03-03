import { useSelector } from 'react-redux'
import { selectMaxBars } from '../../store/selectors'
import { SUB_BAR_NUM } from '../constants'

export const Ruler = () => {
  const maxBars = useSelector(selectMaxBars)
  return (
    <div className="h-full flex flex-row">
      {Array.from({ length: maxBars }).map((_, i) => (
        <div
          key={i + 1}
          className="flex flex-col w-16 border-l border-slate-300"
        >
          <span className="px-2 text-slate-300">{i + 1}</span>

          <div className="flex flex-row">
            {Array.from({ length: SUB_BAR_NUM }).map((_, i) => (
              <span key={i} className="w-16 border-l border-slate-300">
                c
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}
