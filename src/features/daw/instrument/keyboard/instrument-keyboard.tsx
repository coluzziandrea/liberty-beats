import { KEYS } from '../../../../model/note/note'
import { Track } from '../../../../model/track/track'
import { KeyItem } from './key/key-item'

export type InstrumentKeyboardProps = {
  selectedTrack: Track
}

export const InstrumentKeyboard = () => {
  const showedKeys = KEYS.slice(0, 32)
  return (
    <div className="relative h-64">
      {showedKeys.map((keyToRender) => (
        <KeyItem
          key={keyToRender}
          keyToRender={keyToRender}
          startingKey={showedKeys[0]}
        />
      ))}
    </div>
  )
}
