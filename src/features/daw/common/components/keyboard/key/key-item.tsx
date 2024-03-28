import { Key } from '../../../../../../model/note/key/key'
import { Track } from '../../../../../../model/track/track'
import { useKeyItemData } from './use-key-item-data'

export type KeyItemProps = {
  selectedTrack: Track
  keyToRender: Key
  startingKey: Key
  whiteKeySize: number
  minWhiteKeySize?: number
  isSelected: boolean
  isHighlighted?: boolean
  orientation: 'horizontal' | 'vertical'
  onMouseDown: (key: Key) => void
  onMouseUp: (key: Key) => void
  onMouseEnter: (key: Key) => void
  onMouseLeave: (key: Key) => void
}

export const KeyItem = (props: KeyItemProps) => {
  const itemData = useKeyItemData(props)

  const selectedTrackBgColor = `bg-${props.selectedTrack.color}-400`

  const tailwindClasses = itemData.isBlackKey
    ? `z-10 ${props.isSelected ? selectedTrackBgColor : 'bg-black'}`
    : `${itemData.isHorizontal ? 'border-r' : 'border-b'}  border-black ${
        props.isSelected ? selectedTrackBgColor : 'bg-white'
      }`

  const verticalStyle = {
    bottom: `${itemData.bottomOffset}px`,
  }

  const horizontalStyle = {
    left: `${itemData.leftOffset}px`,
  }

  return (
    <div
      className={`h-full ${tailwindClasses} select-none absolute flex items-center justify-end gap-1 cursor-pointer ${
        itemData.isHorizontal ? 'flex-col rounded-b-md' : 'flex-row'
      }`}
      style={{
        ...{
          ...(props.orientation === 'horizontal'
            ? horizontalStyle
            : verticalStyle),
        },
        width: itemData.width,
        height: itemData.height,
      }}
      onMouseLeave={() => props.onMouseLeave(props.keyToRender)}
      onMouseEnter={() => props.onMouseEnter(props.keyToRender)}
      onMouseDown={() => props.onMouseDown(props.keyToRender)}
      onMouseUp={() => props.onMouseUp(props.keyToRender)}
    >
      {itemData.needsLabel && (
        <p
          className={`  ${
            props.isSelected ? 'border-white text-white' : 'text-slate-400'
          } ${
            itemData.isHorizontal
              ? 'text-sm border-slate-300 border-[1px] rounded-md px-1'
              : 'text-xs font-bold'
          }`}
        >
          {props.keyToRender}
        </p>
      )}

      <span
        className={`w-1 h-1 rounded-full ${
          props.isHighlighted ? selectedTrackBgColor : ''
        }`}
      />

      <div
        className={`place-self-stretch rounded-b-md ${
          props.isSelected
            ? ''
            : itemData.isBlackKey
            ? 'bg-slate-800'
            : 'bg-slate-200'
        }`}
        style={{
          height: itemData.shadowHeight,
          width: itemData.shadowWidth,
        }}
      />
    </div>
  )
}
