import { useSelector } from 'react-redux'
import { selectMaxBars } from '../../../../playlist-header/store/selectors'

export const EditorGrid = () => {
  const maxBars = useSelector(selectMaxBars)

  return (
    <div>
      {Array.from({ length: maxBars }, (_, i) => (
        <div
          key={i}
          className="flex flex-col justify-end gap-4 w-[80px] border-l border-slate-400"
        >
          <div className="px-2 text-slate-400 select-none">{i + 1}</div>
          <div className="flex flex-row h-[40%]">
            {Array.from({ length: 4 }, (_, j) => (
              <div
                key={j}
                className={`w-full relative border-slate-400 ${
                  j === 3 ? '' : 'border-r'
                }`}
              ></div>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}
