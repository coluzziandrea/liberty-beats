import { component$, useContextProvider, useStore } from "@builder.io/qwik";

import { PlayerBar } from "../../components/player-bar/player-bar";
import { Playlist } from "~/components/playlist/playlist";
import type { Song } from "~/core/model/song/song";
import { SongContext, initialSong } from "~/core/store/song-context";

export default component$(() => {
  const song = useStore<Song>(initialSong);
  useContextProvider(SongContext, song);

  return (
    <div class="flex flex-col gap-2 px-4 pt-2">
      <PlayerBar />
      <Playlist />
    </div>
  );
});
