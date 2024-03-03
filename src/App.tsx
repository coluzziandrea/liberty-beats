import { PlayerBar } from './features/player-bar/player-bar'
import { Playlist } from './features/playlist/playlist'

function App() {
  return (
    <div className="flex flex-col gap-4 px-4 pt-2">
      <PlayerBar />
      <Playlist />
    </div>
  )
}

export default App
