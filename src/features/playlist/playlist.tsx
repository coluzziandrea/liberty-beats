import { TrackList } from "./track-list/track-list";
import { Flatboard } from "./flatboard/flatboard";

export const Playlist = () => {
  return (
    <div className="flex flex-row justify-between">
      <div>
        <TrackList />
      </div>

      <div>
        <Flatboard />
      </div>
    </div>
  );
};
