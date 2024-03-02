import { component$, useContext } from "@builder.io/qwik";
import { UndoRedo } from "./undo-redo/undo-redo";
import { Player } from "./player/player";
import { Metronome } from "./metronome/metronome";
import { MasterVolume } from "./master-volume/master-volume";
import { SongContext } from "~/core/store/song-context";
import Sequencer from "~/core/sequencer/sequencer";

export const PlayerBar = component$(() => {
  const song = useContext(SongContext);

  return (
    <div class="flex flex-row justify-between">
      <div>
        <UndoRedo />
      </div>
      <div>
        <Metronome />
      </div>
      <div>
        <Player
          isPlaying={song.isPlaying}
          onTogglePlay$={() => Sequencer.togglePlay(song)}
        />
      </div>
      <div>
        <MasterVolume />
      </div>
    </div>
  );
});
