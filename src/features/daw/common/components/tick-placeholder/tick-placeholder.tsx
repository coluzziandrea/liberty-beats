import { TICK_WIDTH_PIXEL } from '../../../playlist/constants'
import { usePreviewLoopSafeTransportPosition } from '../../hooks/use-preview-loop-safe-transport-position'

export const TickPlaceholder = () => {
  const { tick } = usePreviewLoopSafeTransportPosition()

  const barOffsetPixel = tick * TICK_WIDTH_PIXEL
  const barOffsetStyle = `${barOffsetPixel}px`
  return (
    <div
      className="absolute top-0 h-[100%] w-[1px] z-40 bg-black dark:bg-white"
      style={{ left: barOffsetStyle }}
    >
      <div
        className={`flex flex-col h-full min-h-24 max-h-24 bg-black dark:bg-white`}
      ></div>
    </div>
  )
}
