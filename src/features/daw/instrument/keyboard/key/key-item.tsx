import { Key } from '../../../../../model/note/note'

export type KeyProps = {
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

const getCommonClasses = () => {
  return 'select-none absolute flex items-end justify-center'
}

const BlackKeyItem = (props: KeyProps) => {
  const finalOffset = getRelativeOffset(props.keyToRender, props.startingKey)
  return (
    <div
      className={`${getCommonClasses()} select-none absolute bg-black h-[60%] z-10`}
      style={{ left: `${finalOffset}px`, width: `${BLACK_KEY_WIDTH}px` }}
    >
      {props.keyToRender}
    </div>
  )
}

const WhiteKeyItem = (props: KeyProps) => {
  const finalOffset = getRelativeOffset(props.keyToRender, props.startingKey)
  return (
    <div
      className={`${getCommonClasses()} bg-white h-full text-black border-r border-black`}
      style={{ left: `${finalOffset}px`, width: `${WHITE_KEY_WIDTH}px` }}
    >
      {props.keyToRender}
    </div>
  )
}

export const KeyItem = (props: KeyProps) => {
  const isBlackKey = props.keyToRender.includes('#')
  return isBlackKey ? <BlackKeyItem {...props} /> : <WhiteKeyItem {...props} />
}
