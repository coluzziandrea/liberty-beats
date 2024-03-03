import { PlayerBar } from './player-bar/player-bar'
import { PlaylistHeader } from './playlist-header/playlist-header'
import { Playlist } from './playlist/playlist'

export const DAW = () => {
  return (
    <main className="flex flex-col h-screen p-2">
      <div className="pb-2">
        <PlayerBar />
      </div>

      <div>
        <PlaylistHeader />
      </div>

      <div className="flex flex-grow overflow-y-auto">
        <Playlist />
      </div>
    </main>
  )
}