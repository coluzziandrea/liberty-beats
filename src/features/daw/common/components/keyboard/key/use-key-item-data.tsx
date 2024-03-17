import { Key } from '../../../../../../model/note/key/key'
import { KeyItemProps } from './key-item'

export const useKeyItemData = (props: KeyItemProps) => {
  const MIN_WHITE_KEY_SIZE = 8

  const whiteKeySize = Math.max(
    props.whiteKeySize,
    props.minWhiteKeySize || MIN_WHITE_KEY_SIZE
  )
  const isBlackKey = props.keyToRender.includes('#')

  const getWhiteKeySize = () => whiteKeySize
  const getBlackKeySize = () => whiteKeySize * 0.75
  const getBlackKeyOffset = () => (whiteKeySize * 2 - getBlackKeySize()) / 2
  const getOffsetByKeyMap = () => {
    const blackKeyOffset = getBlackKeyOffset()

    return {
      C: 0,
      'C#': blackKeyOffset,
      D: whiteKeySize,
      'D#': whiteKeySize + blackKeyOffset,
      E: whiteKeySize * 2,
      F: whiteKeySize * 3,
      'F#': whiteKeySize * 3 + blackKeyOffset,
      G: whiteKeySize * 4,
      'G#': whiteKeySize * 4 + blackKeyOffset,
      A: whiteKeySize * 5,
      'A#': whiteKeySize * 5 + blackKeyOffset,
      B: whiteKeySize * 6,
    }
  }

  const getOctaveWidth = () => whiteKeySize * 7

  const getOffsetByKey = (key: Key) => {
    const baseKey = key.slice(0, key.length - 1)
    const octave = Number(key.slice(-1))
    const offsetByKeyMap = getOffsetByKeyMap()
    const offset = offsetByKeyMap[baseKey as keyof typeof offsetByKeyMap]
    return offset + octave * getOctaveWidth()
  }

  const getRelativeOffset = (key: Key, startingKey: Key) => {
    const startingOffset = getOffsetByKey(startingKey)
    const keyOffset = getOffsetByKey(key)
    return keyOffset - startingOffset
  }

  const keySize = isBlackKey ? getBlackKeySize() : getWhiteKeySize()
  const relativeOffset = getRelativeOffset(props.keyToRender, props.startingKey)
  const keyInvertedSize = isBlackKey ? '60%' : '100%'

  const leftOffset = props.orientation === 'horizontal' ? relativeOffset : 0
  const bottomOffset = props.orientation === 'vertical' ? relativeOffset : 0
  const width =
    props.orientation === 'horizontal' ? `${keySize}px` : keyInvertedSize
  const height =
    props.orientation === 'vertical' ? `${keySize}px` : keyInvertedSize

  const shadowWidth = props.orientation === 'horizontal' ? '100%' : '5%'
  const shadowHeight = props.orientation === 'vertical' ? '100%' : '5%'

  return {
    isBlackKey,
    leftOffset,
    bottomOffset,
    width,
    height,
    shadowWidth,
    shadowHeight,
    needsLabel: !isBlackKey,
    isHorizontal: props.orientation === 'horizontal',
  }
}
