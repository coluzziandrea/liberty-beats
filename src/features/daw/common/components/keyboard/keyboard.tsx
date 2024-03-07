import { Key } from '../../../../../model/note/note'
import { Track } from '../../../../../model/track/track'
import React, { useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectPlayingKeys } from '../../../instrument/store/selectors'
import {
  addPlayingKey,
  removePlayingKey,
} from '../../../instrument/store/instrument-slice'
import { KeyItem } from './key/key-item'

export type KeyboardProps = {
  selectedTrack: Track

  showedKeys: Readonly<Key[]>
  keySize: number
  onResize?: (keyboardSize: number) => void
  orientation?: 'horizontal' | 'vertical'
}

export const Keyboard = (props: KeyboardProps) => {
  const [isMouseDown, setIsMouseDown] = React.useState(false)
  const keyboardRef = useRef<HTMLDivElement>(null)
  const playingKeys = useSelector(selectPlayingKeys)
  const dispatch = useDispatch()

  const handleResize = React.useCallback(() => {
    const keyboard = keyboardRef.current
    if (props.onResize) {
      props.onResize(keyboard?.clientWidth || 0)
    }
  }, [props])

  React.useEffect(() => {
    handleResize()

    window.addEventListener('resize', handleResize)
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [handleResize])

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
      className="relative h-full w-full"
      ref={keyboardRef}
      onMouseDown={() => setIsMouseDown(true)}
      onMouseUp={() => setIsMouseDown(false)}
    >
      {props.showedKeys.map((keyToRender) => (
        <KeyItem
          selectedTrack={props.selectedTrack}
          key={keyToRender}
          keyToRender={keyToRender}
          startingKey={props.showedKeys[0]}
          keySize={props.keySize}
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
