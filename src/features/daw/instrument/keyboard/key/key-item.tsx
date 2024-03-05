import { Key } from '../../../../../model/note/note'

export type KeyItemProps = {
  keyToRender: Key
  startingKey: Key
}

const WHITE_KEY_WIDTH = 50
const BLACK_KEY_OFFSET = 31.25
const BLACK_KEY_WIDTH = 37.5

const OFFSET_BY_KEY = {
  C: 0,
  'C#': BLACK_KEY_OFFSET,
  D: WHITE_KEY_WIDTH,
  'D#': WHITE_KEY_WIDTH + BLACK_KEY_OFFSET,
  E: WHITE_KEY_WIDTH * 2,
  F: WHITE_KEY_WIDTH * 3,
  'F#': WHITE_KEY_WIDTH * 3 + BLACK_KEY_OFFSET,
  G: WHITE_KEY_WIDTH * 4,
  'G#': WHITE_KEY_WIDTH * 4 + BLACK_KEY_OFFSET,
  A: WHITE_KEY_WIDTH * 5,
  'A#': WHITE_KEY_WIDTH * 5 + BLACK_KEY_OFFSET,
  B: WHITE_KEY_WIDTH * 6,
}

const OCTAVE_WIDTH = 7 * WHITE_KEY_WIDTH

const getOffsetByKey = (key: Key) => {
  const baseKey = key.slice(0, key.length - 1)
  const octave = Number(key.slice(-1))
  const offset = OFFSET_BY_KEY[baseKey as keyof typeof OFFSET_BY_KEY]
  return offset + octave * OCTAVE_WIDTH
}

const getRelativeOffset = (key: Key, startingKey: Key) => {
  const startingOffset = getOffsetByKey(startingKey)
  const keyOffset = getOffsetByKey(key)
  return keyOffset - startingOffset
}

export const KeyItem = (props: KeyItemProps) => {
  const isBlackKey = props.keyToRender.includes('#')
  const getKeyClasses = () =>
    isBlackKey
      ? 'bg-black h-[60%] z-10 text-slate-300'
      : 'bg-white h-full text-slate-700 border-r border-black'
  const getKeyWidth = () => (isBlackKey ? BLACK_KEY_WIDTH : WHITE_KEY_WIDTH)
  return (
    <div
      className={`${getKeyClasses()} select-none absolute flex flex-col items-center justify-end  gap-1 cursor-pointer rounded-b-md`}
      style={{
        left: `${getRelativeOffset(props.keyToRender, props.startingKey)}px`,
        width: `${getKeyWidth()}px`,
      }}
    >
      {!isBlackKey && (
        <p className="text-sm font-light border-slate-300 border-[1px] rounded-md px-1">
          {props.keyToRender}
        </p>
      )}
      <div
        className={`w-full rounded-b-md h-2 ${
          isBlackKey ? 'bg-slate-800' : 'bg-slate-200'
        }`}
      />
    </div>
  )
}
