import { TrackUtils } from '../../../../../../model/track/track'
import { PianoRollKeyProps } from '../types'

export type PianoRollKeySkeletonProps = PianoRollKeyProps & {
  PianoRollKeyBody: React.FC<PianoRollKeyProps>
}

export const PianoRollKeySkeleton = ({
  PianoRollKeyBody,
  ...props
}: PianoRollKeySkeletonProps) => {
  const noteLeftOffsetPixel = props.note.startsAtRelativeTick * props.beatWidth
  const noteTopOffsetPixel =
    props.showedKeys.indexOf(props.note.key) * props.keyHeight
  const noteColor = TrackUtils.isTrackEffectivelyMuted(props.track)
    ? 'bg-gray-600 dark:bg-gray-400'
    : props.nonMutedColorTailwindClass
    ? props.nonMutedColorTailwindClass
    : `bg-${props.track.color}-500`
  return (
    <div
      className={`absolute ${noteColor} z-20 w-fit ${
        props.selected && 'border-[1px] border-white'
      }`}
      style={{
        height: `${props.keyHeight}px`,
        left: `${noteLeftOffsetPixel}px`,
        top: `${noteTopOffsetPixel}px`,
      }}
    >
      <PianoRollKeyBody {...props} />
    </div>
  )
}
