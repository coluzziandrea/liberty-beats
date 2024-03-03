import { PlayerBar } from './player-bar/player-bar'
import { Playlist } from './playlist/playlist'

export const DAW = () => {
  return (
    <main className="flex flex-col gap-2 h-screen p-2">
      <div>
        <PlayerBar />
      </div>

      <div className="flex flex-grow overflow-y-auto">
        <Playlist />
      </div>
    </main>
  )
}
