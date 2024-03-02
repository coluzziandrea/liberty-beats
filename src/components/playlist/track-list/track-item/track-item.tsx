import { component$ } from "@builder.io/qwik";
import type { Track } from "~/model/track/track";

export type TrackItemProps = {
  track: Track;
};

export const TrackItem = component$(({ track }: TrackItemProps) => {
  return (
    <div class="flex flex-row">
      <div>{track.title}</div>
      <div>{track.instrumentType}</div>
    </div>
  );
});
