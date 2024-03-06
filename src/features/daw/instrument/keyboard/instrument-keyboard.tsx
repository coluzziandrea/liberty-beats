import { useRef } from 'react'
import { KEYS, Key, Octave } from '../../../../model/note/note'
import { Track } from '../../../../model/track/track'
import { KeyItem } from './key/key-item'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectPlayingKeys } from '../store/selectors'
import { addPlayingKey, removePlayingKey } from '../store/instrument-slice'

export type InstrumentKeyboardProps = {
  selectedTrack: Track
  selectedOctave: Octave
}

const SHOWED_KEYS_NUMBER = 32
const SHOWED_WHITE_KEYS = 19

const getShowedKeys = (selectedOctave: Octave) => {
  const startingKey = KEYS.find((k) =>
    k.endsWith(Number(selectedOctave).toString())
  )
  if (!startingKey) return []
  const startingKeyIndex = KEYS.indexOf(startingKey)
  return KEYS.slice(startingKeyIndex, startingKeyIndex + SHOWED_KEYS_NUMBER)
}

export const InstrumentKeyboard = (props: InstrumentKeyboardProps) => {
  const keyboardRef = useRef<HTMLDivElement>(null)
  const [keySize, setKeySize] = React.useState(0)
  const [isMouseDown, setIsMouseDown] = React.useState(false)

  const showedKeys = getShowedKeys(props.selectedOctave)

  const playingKeys = useSelector(selectPlayingKeys)
  const dispatch = useDispatch()

  const handleResize = () => {
    const keyboard = keyboardRef.current
    setKeySize(
      keyboard?.clientWidth ? keyboard.clientWidth / SHOWED_WHITE_KEYS : 0
    )
  }

  React.useEffect(() => {
    handleResize()

    window.addEventListener('resize', handleResize)
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  const generateIsSelected = (key: Key) => {
    return playingKeys.includes(key)
  }

  const handleOnKeyItemMouseDown = (key: Key) => {
    setIsMouseDown(true)
    dispatch(addPlayingKey(key))
  }

  const handleOnKeyItemMouseUp = (key: Key) => {
    setIsMouseDown(false)
    if (playingKeys.includes(key)) {
      dispatch(removePlayingKey(key))
    }
  }

  const handleOnMouseEnter = (key: Key) => {
    if (isMouseDown) {
      dispatch(addPlayingKey(key))
    }
  }

  const handleOnMouseLeave = (key: Key) => {
    if (playingKeys.includes(key)) {
      dispatch(removePlayingKey(key))
    }
  }

  return (
    <div
      className="relative h-64 w-full"
      ref={keyboardRef}
      onMouseDown={() => setIsMouseDown(true)}
      onMouseUp={() => setIsMouseDown(false)}
    >
      {showedKeys.map((keyToRender) => (
        <KeyItem
          key={keyToRender}
          keyToRender={keyToRender}
          startingKey={showedKeys[0]}
          keySize={keySize}
          onMouseDown={handleOnKeyItemMouseDown}
          onMouseUp={handleOnKeyItemMouseUp}
          onMouseEnter={handleOnMouseEnter}
          onMouseLeave={handleOnMouseLeave}
          isSelected={generateIsSelected(keyToRender)}
        />
      ))}
    </div>
  )
}
