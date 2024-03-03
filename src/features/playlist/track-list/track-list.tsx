import { TracksCommands } from "./tracks-commands/tracks-commands";
import { TrackItem } from "./track-item/track-item";
import { Track } from "../../../model/track/track";

export const TrackList = () => {
  const tracks: Track[] = [
    {
      id: "1",
      title: "Piano 1",
      instrumentType: "PIANO",
    },
  ];

  return (
    <div className="flex flex-col justify-between gap-2">
      <div>
        <TracksCommands />
      </div>

      <div className="flex flex-row">
        {tracks.map((track) => (
          <TrackItem key={track.id} track={track} />
        ))}
      </div>
    </div>
  );
};
