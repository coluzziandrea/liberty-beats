import { Key } from '../../../../../../model/note/note'
import { Track } from '../../../../../../model/track/track'
import { useKeyItemData } from './use-key-item-data'

export type KeyItemProps = {
  selectedTrack: Track
  keyToRender: Key
  startingKey: Key
  whiteKeySize: number
  minWhiteKeySize?: number
  isSelected: boolean
  orientation: 'horizontal' | 'vertical'
  onMouseDown: (key: Key) => void
  onMouseUp: (key: Key) => void
  onMouseEnter: (key: Key) => void
  onMouseLeave: (key: Key) => void
}

export const KeyItem = (props: KeyItemProps) => {
  const itemData = useKeyItemData(props)

  const tailwindClasses = itemData.isBlackKey
    ? `z-10 ${
        props.isSelected ? `bg-${props.selectedTrack.color}-400` : 'bg-black'
      }`
    : `${itemData.isHorizontal ? 'border-r' : 'border-b'}  border-black ${
        props.isSelected ? `bg-${props.selectedTrack.color}-400` : 'bg-white'
      }`

  return (
    <div
      className={`${tailwindClasses} select-none absolute flex items-center justify-end  gap-1 cursor-pointer ${
        itemData.isHorizontal ? 'flex-col rounded-b-md' : 'flex-row'
      }`}
      style={{
        top: `${itemData.topOffset}px`,
        left: `${itemData.leftOffset}px`,
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
