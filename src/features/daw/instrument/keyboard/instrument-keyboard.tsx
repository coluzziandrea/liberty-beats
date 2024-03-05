import { KEYS } from '../../../../model/note/note'
import { Track } from '../../../../model/track/track'
import { KeyItem } from './key/key-item'

export type InstrumentKeyboardProps = {
  selectedTrack: Track
}

export const InstrumentKeyboard = () => {
  const showedKeys = KEYS.slice(0, 32)

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
    <div className="relative h-64">
      {showedKeys.map((keyToRender) => (
        <KeyItem
          key={keyToRender}
          keyToRender={keyToRender}
          startingKey={showedKeys[0]}
          onAttackTriggered={handleAttackTriggered}
          onReleaseTriggered={handleReleaseTriggered}
          isSelected={generateIsSelected(keyToRender)}
        />
      ))}
    </div>
  )
}
