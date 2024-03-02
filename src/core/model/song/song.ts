import type { Track } from "../track/track";

export interface Song {
  title: string;
  tracksById: Map<string, Track>;
  isPlaying: boolean;
}
