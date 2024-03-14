// import { UndoRedo } from './undo-redo/undo-redo'
import { Player } from './player/player'
import { Metronome } from './metronome/metronome'
import { MasterVolume } from './master-volume/master-volume'

export const PlayerBar = () => {
  return (
    <div className="flex flex-row items-center justify-between">
      {/* TODO - Add UndoRedo feature */}
      {/* <div>
        <UndoRedo />
      </div> */}
      <div className="flex-1">
        <Metronome />
      </div>
      <div className="flex-3 flex-grow">
        <Player />
      </div>
      <div className="flex-1">
        <MasterVolume />
      </div>
    </div>
  )
}
