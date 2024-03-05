import { useRef } from 'react'
import { KEYS } from '../../../../model/note/note'
import { Track } from '../../../../model/track/track'
import { KeyItem } from './key/key-item'
import React from 'react'

export type InstrumentKeyboardProps = {
  selectedTrack: Track
}

const SHOWED_KEYS = 32
const SHOWED_WHITE_KEYS = 19

export const InstrumentKeyboard = () => {
  const keyboardRef = useRef<HTMLDivElement>(null)
  const [keySize, setKeySize] = React.useState(0)
  const showedKeys = KEYS.slice(0, SHOWED_KEYS)

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

  const generateIsSelected = (key: string) => {
    return key === 'C#2'
  }

  const handleAttackTriggered = (key: string) => {
    console.log('attack triggered', key)
  }

  const handleReleaseTriggered = (key: string) => {
    console.log('release triggered', key)
  }

  return (
    <div className="relative h-64 w-full" ref={keyboardRef}>
      {showedKeys.map((keyToRender) => (
        <KeyItem
          key={keyToRender}
          keyToRender={keyToRender}
          startingKey={showedKeys[0]}
          keySize={keySize}
          onAttackTriggered={handleAttackTriggered}
          onReleaseTriggered={handleReleaseTriggered}
          isSelected={generateIsSelected(keyToRender)}
        />
      ))}
    </div>
  )
}
