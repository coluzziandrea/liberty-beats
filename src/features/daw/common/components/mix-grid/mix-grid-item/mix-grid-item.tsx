import { SUB_BAR_NUM } from '../../ruler/constants'

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
    <div
      key={currentSubBar}
      className={`border-slate-500 w-[20px] ${
        currentSubBar == SUB_BAR_NUM - 1 ? '' : 'border-r'
      }`}
      onClick={() => onSelectTick(tick)}
      onDoubleClick={() => onCreateBar(tick)}
      onContextMenu={(e) => onContextMenu(e, tick)}
    />
  )
}
