import { component$ } from "@builder.io/qwik";
import { TracksCommands } from "./tracks-commands/tracks-commands";
import type { Track } from "~/model/track/track";
import { TrackItem } from "./track-item/track-item";

export const TrackList = component$(() => {
  const tracks: Track[] = [
    {
      id: "1",
      title: "Piano 1",
      instrumentType: "PIANO",
    },
  ];

  return (
    <div class="flex flex-col justify-between gap-2">
      <div>
        <TracksCommands />
      </div>

      <div class="flex flex-row">
        {tracks.map((track) => (
          <TrackItem key={track.id} track={track} />
        ))}
      </div>
    </div>
  );
});
