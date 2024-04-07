import { Track } from '../../../../../model/track/track'
import React, { useRef } from 'react'
import { useDispatch } from 'react-redux'
import {
  addPlayingKey,
  removePlayingKey,
} from '../../../instrument/store/instrument-slice'
import { KeyItem } from './key/key-item'
import { Key } from '../../../../../model/note/key/key'

export type KeyboardProps = {
  selectedTrack: Track
  paddingTop?: number
  showedKeys: Readonly<Key[]>
  highlightedKeys?: Readonly<Key[]>
  playingKeys: Readonly<Key[]>
  whiteKeySize: number
  minWhiteKeySize?: number
  onResize?: (keyboardSize: number) => void
  orientation?: 'horizontal' | 'vertical'
}

export const Keyboard = (props: KeyboardProps) => {
  const [isMouseDown, setIsMouseDown] = React.useState(false)
  const keyboardRef = useRef<HTMLDivElement>(null)
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

  const handleOnKeyItemMouseDown = (key: Key) => {
    setIsMouseDown(true)
    dispatch(
      addPlayingKey({
        trackId: props.selectedTrack.id,
        key,
      })
    )
  }

  const handleOnKeyItemMouseUp = (key: Key) => {
    setIsMouseDown(false)
    if (props.playingKeys.includes(key)) {
      dispatch(
        removePlayingKey({
          trackId: props.selectedTrack.id,
          key,
        })
      )
    }
  }

  const handleOnMouseEnter = (key: Key) => {
    if (isMouseDown) {
      dispatch(
        addPlayingKey({
          trackId: props.selectedTrack.id,
          key,
        })
      )
    }
  }

  const handleOnMouseLeave = (key: Key) => {
    if (props.playingKeys.includes(key)) {
      dispatch(
        removePlayingKey({
          trackId: props.selectedTrack.id,
          key,
        })
      )
    }
  }

  return (
    <div
      className="relative w-full"
      ref={keyboardRef}
      style={{ paddingTop: props.paddingTop }}
      onMouseDown={() => setIsMouseDown(true)}
      onMouseUp={() => setIsMouseDown(false)}
    >
      {props.showedKeys.map((keyToRender) => (
        <KeyItem
          selectedTrack={props.selectedTrack}
          key={keyToRender}
          keyToRender={keyToRender}
          startingKey={props.showedKeys[0]}
          whiteKeySize={props.whiteKeySize}
          minWhiteKeySize={props.minWhiteKeySize}
          onMouseDown={handleOnKeyItemMouseDown}
          onMouseUp={handleOnKeyItemMouseUp}
          onMouseEnter={handleOnMouseEnter}
          onMouseLeave={handleOnMouseLeave}
          isSelected={props.playingKeys.includes(keyToRender)}
          orientation={props.orientation || 'horizontal'}
          isHighlighted={props.highlightedKeys?.includes(keyToRender) || false}
        />
      ))}
    </div>
  )
}
