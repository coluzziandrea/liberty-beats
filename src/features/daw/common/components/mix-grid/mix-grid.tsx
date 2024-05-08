import { useState } from 'react'
import { PopupMenu } from '../popup-menu/popup-menu'
import { RULER_SUB_BAR_WIDTH, SUB_BAR_NUM } from '../ruler/constants'
import { MixGridItem } from './mix-grid-item/mix-grid-item'
import { FaPaste } from 'react-icons/fa6'

export type MixGridProps = {
  maxBars: number

  evenColumnsColor: string
  oddColumnsColor: string

  onSelectTick: (tick: number) => void
  onCreateBar: (startTick: number) => void
  onPasteBar: (startTick: number) => void
}

export const MixGrid = (props: MixGridProps) => {
  const [menuIsOpen, setMenuIsOpen] = useState(false)
  const [menuTick, setMenuTick] = useState<number>(0)

  const getTrackColorClass = (barIndex: number) => {
    return barIndex % 2 == 0 ? props.evenColumnsColor : props.oddColumnsColor
  }
  return (
    <div className="flex flex-row relative">
      {Array.from({ length: props.maxBars }).map((_, barIndex) => (
        <div
          key={barIndex}
          className={`flex flex-col w-[80px] justify-end opacity-50 h-full border-l border-slate-400 ${
            barIndex == props.maxBars - 1 ? 'border-r' : ''
          }  ${getTrackColorClass(barIndex)}`}
        >
          <div className="flex flex-row h-full">
            {Array.from({ length: SUB_BAR_NUM }).map((_, subBarIndex) => (
              <MixGridItem
                key={subBarIndex}
                barIndex={barIndex}
                currentSubBar={subBarIndex}
                onSelectTick={props.onSelectTick}
                onCreateBar={props.onCreateBar}
                onContextMenu={(e, tick) => {
                  e.preventDefault()
                  props.onSelectTick(tick)
                  setMenuTick(tick)
                  setMenuIsOpen(true)
                }}
              />
            ))}
          </div>
        </div>
      ))}
      {menuIsOpen && (
        <div
          className="fixed mt-12 z-50 h-fit w-fit"
          style={{ marginLeft: (menuTick / 4) * RULER_SUB_BAR_WIDTH + 16 }} // calculating the offset of the menu based on the tick (plus some padding to the left)
        >
          <PopupMenu
            onClose={() => setMenuIsOpen(false)}
            items={[
              {
                label: 'Paste',
                icon: <FaPaste />,
                action: () => {
                  props.onPasteBar(menuTick)
                  setMenuIsOpen(false)
                },
              },
            ]}
          />
        </div>
      )}
    </div>
  )
}
