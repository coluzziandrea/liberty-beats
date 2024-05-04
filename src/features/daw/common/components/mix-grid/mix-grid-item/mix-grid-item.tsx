import { RULER_SUB_BAR_WIDTH, SUB_BAR_NUM } from '../../ruler/constants'

export type MixGridItemProps = {
  barIndex: number
  currentSubBar: number
  onSelectTick: (tick: number) => void
  onCreateBar: (startTick: number) => void
  onContextMenu: (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
    tick: number
  ) => void
}

export const MixGridItem = ({
  barIndex,
  currentSubBar,
  onSelectTick,
  onCreateBar,
  onContextMenu,
}: MixGridItemProps) => {
  const tick = barIndex * SUB_BAR_NUM * 4 + currentSubBar * 4
  return (
    <p
      key={currentSubBar}
      className={`w-[${RULER_SUB_BAR_WIDTH}px] border-slate-500 ${
        currentSubBar == SUB_BAR_NUM - 1 ? '' : 'border-r'
      }`}
      onClick={() => onSelectTick(tick)}
      onDoubleClick={() => onCreateBar(tick)}
      onContextMenu={(e) => onContextMenu(e, tick)}
    ></p>
  )
}
