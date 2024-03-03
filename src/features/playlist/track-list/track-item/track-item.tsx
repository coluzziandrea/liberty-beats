import { Track } from "../../../../model/track/track";

export type TrackItemProps = {
  track: Track;
};

export const TrackItem = ({ track }: TrackItemProps) => {
  return (
    <div className="flex flex-row">
      <div>{track.title}</div>
      <div>{track.instrumentType}</div>
    </div>
  );
};
