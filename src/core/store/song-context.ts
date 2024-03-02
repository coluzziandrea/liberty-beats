import { createContextId } from "@builder.io/qwik";
import type { Song } from "../model/song/song";

export const SongContext = createContextId<Song>("lb.SongContext");

export const initialSong: Song = {
  title: "Untitled",
  tracksById: new Map(),
  isPlaying: false,
};
