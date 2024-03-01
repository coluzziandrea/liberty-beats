import { component$ } from "@builder.io/qwik";
import { UndoRedo } from "./undo-redo/undo-redo";
import { Player } from "./player/player";
import { Metronome } from "./metronome/metronome";
import { MasterVolume } from "./master-volume/master-volume";

export const PlayerBar = component$(() => {
  return (
    <div class="flex flex-row justify-between">
      <div>
        <UndoRedo />
      </div>
      <div>
        <Metronome />
      </div>
      <div>
        <Player />
      </div>
      <div>
        <MasterVolume />
      </div>
    </div>
  );
});
