import { component$ } from "@builder.io/qwik";

import { PlayerBar } from "../../components/player-bar/player-bar";
import { Playlist } from "~/components/playlist/playlist";

export default component$(() => {
  return (
    <div class="flex flex-col gap-2 px-4 pt-2">
      <PlayerBar />
      <Playlist />
    </div>
  );
});
