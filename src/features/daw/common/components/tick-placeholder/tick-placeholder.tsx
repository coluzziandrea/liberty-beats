import { useSelector } from 'react-redux'
import { selectCurrentTick } from '../../../playlist-header/store/selectors'
import { TICK_WIDTH_PIXEL } from '../../../playlist/constants'

export const TickPlaceholder = () => {
  const currentTick = useSelector(selectCurrentTick)
  const barOffsetPixel = currentTick * TICK_WIDTH_PIXEL
  const barOffsetStyle = `${barOffsetPixel}px`
  return (
    <div
      className="absolute top-0 h-[100%] w-[1px] z-50 bg-white"
      style={{ left: barOffsetStyle }}
    >
      <div
        className={`flex flex-col h-full min-h-24 max-h-24 bg-white-500`}
      ></div>
    </div>
  )
}
