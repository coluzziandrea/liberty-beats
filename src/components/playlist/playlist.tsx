import { component$ } from "@builder.io/qwik";
import { TrackList } from "./track-list/track-list";
import { Flatboard } from "./flatboard/flatboard";

export const Playlist = component$(() => {
  return (
    <div class="flex flex-row justify-between">
      <div>
        <TrackList />
      </div>

      <div>
        <Flatboard />
      </div>
    </div>
  );
});
