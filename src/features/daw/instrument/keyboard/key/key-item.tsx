import { Key } from '../../../../../model/note/note'

export type KeyItemProps = {
  keyToRender: Key
  startingKey: Key
  keySize: number
  isSelected: boolean
  onAttackTriggered: (key: Key) => void
  onReleaseTriggered: (key: Key) => void
}

const MIN_WHITE_KEY_WIDTH = 50

const getWhiteKeyWidth = (sizeFromParent: number) =>
  Math.max(sizeFromParent, MIN_WHITE_KEY_WIDTH)
const getBlackKeyWidth = (whiteKeyWidth: number) => whiteKeyWidth * 0.75

const getBlackKeyOffset = (whiteKeyWidth: number) =>
  (whiteKeyWidth * 2 - getBlackKeyWidth(whiteKeyWidth)) / 2

const getOffsetByKeyMap = (whiteKeyWidth: number) => {
  const blackKeyOffset = getBlackKeyOffset(whiteKeyWidth)

  return {
    C: 0,
    'C#': blackKeyOffset,
    D: whiteKeyWidth,
    'D#': whiteKeyWidth + blackKeyOffset,
    E: whiteKeyWidth * 2,
    F: whiteKeyWidth * 3,
    'F#': whiteKeyWidth * 3 + blackKeyOffset,
    G: whiteKeyWidth * 4,
    'G#': whiteKeyWidth * 4 + blackKeyOffset,
    A: whiteKeyWidth * 5,
    'A#': whiteKeyWidth * 5 + blackKeyOffset,
    B: whiteKeyWidth * 6,
  }
}

const getOctaveWidth = (whiteKeyWidth: number) => whiteKeyWidth * 7

const getOffsetByKey = (key: Key, whiteKeyWidth: number) => {
  const baseKey = key.slice(0, key.length - 1)
  const octave = Number(key.slice(-1))
  const offsetByKeyMap = getOffsetByKeyMap(whiteKeyWidth)
  const offset = offsetByKeyMap[baseKey as keyof typeof offsetByKeyMap]
  return offset + octave * getOctaveWidth(whiteKeyWidth)
}

const getRelativeOffset = (
  key: Key,
  startingKey: Key,
  whiteKeyWidth: number
) => {
  const startingOffset = getOffsetByKey(startingKey, whiteKeyWidth)
  const keyOffset = getOffsetByKey(key, whiteKeyWidth)
  return keyOffset - startingOffset
}

export const KeyItem = (props: KeyItemProps) => {
  const whiteKeyWidth = getWhiteKeyWidth(props.keySize)
  const isBlackKey = props.keyToRender.includes('#')
  const getKeyClasses = () =>
    isBlackKey
      ? `bg-black h-[60%] z-10 text-slate-300`
      : `bg-white h-full text-slate-700 border-r border-black`
  const getKeyWidth = () =>
    isBlackKey ? getBlackKeyWidth(whiteKeyWidth) : whiteKeyWidth
  return (
    <div
      className={`${getKeyClasses()} select-none absolute flex flex-col items-center justify-end  gap-1 cursor-pointer rounded-b-md ${
        props.isSelected && 'bg-orange-400'
      }`}
      style={{
        left: `${getRelativeOffset(
          props.keyToRender,
          props.startingKey,
          whiteKeyWidth
        )}px`,
        width: `${getKeyWidth()}px`,
      }}
      onMouseDown={() => props.onAttackTriggered(props.keyToRender)}
      onMouseUp={() => props.onReleaseTriggered(props.keyToRender)}
    >
      {!isBlackKey && (
        <p
          className={`text-sm font-light border-slate-300 border-[1px] rounded-md px-1 ${
            props.isSelected && 'border-white text-white'
          }`}
        >
          {props.keyToRender}
        </p>
      )}

      <div
        className={`w-full rounded-b-md h-2 ${
          props.isSelected ? '' : isBlackKey ? 'bg-slate-800' : 'bg-slate-200'
        }`}
      />
    </div>
  )
}
