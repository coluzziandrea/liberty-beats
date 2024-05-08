import { useDispatch } from 'react-redux'
import { INSTRUMENT_PRESETS } from '../../../../../model/instrument/preset/preset'
import { Track } from '../../../../../model/track/track'
import { TrackColor } from '../../../../../model/track/track-color'
import { addTrack, selectTrack } from '../../../playlist/store/playlist-slice'
import { useRef } from 'react'
import { CgPiano } from 'react-icons/cg'
import { GiGuitarHead, GiGuitarBassHead } from 'react-icons/gi'
import { LiaDrumSolid } from 'react-icons/lia'
import { InstrumentType } from '../../../../../model/instrument/instrument'
import { useCallbackOnOutsideClick } from '../../../common/hooks/use-outside-click'

export type AddTrackMenuProps = {
  onClose: () => void
}

type MenuItem = {
  label: string
  icon: JSX.Element
  color: TrackColor
  type: InstrumentType
}

export const AddTrackMenu = ({ onClose }: AddTrackMenuProps) => {
  const dispatch = useDispatch()
  const popupMenuRef = useRef<HTMLDivElement>(null)
  useCallbackOnOutsideClick(popupMenuRef, onClose)

  const menuItems: MenuItem[] = [
    {
      label: 'Piano',
      icon: <CgPiano />,
      color: 'purple',
      type: 'KEYBOARDS',
    },
    {
      label: 'Drums',
      icon: <LiaDrumSolid />,
      color: 'red',
      type: 'DRUMS',
    },
    {
      label: 'Guitar',
      icon: <GiGuitarHead />,
      color: 'blue',
      type: 'GUITAR',
    },
    {
      label: 'Bass',
      icon: <GiGuitarBassHead />,
      color: 'green',
      type: 'BASS',
    },
  ]

  const handleAddTrack = (item: MenuItem) => {
    const instrumentPreset = INSTRUMENT_PRESETS.find(
      (preset) => preset.instrument === item.type
    )
    if (!instrumentPreset) return
    const newTrack: Track = {
      id: Date.now().toString(),
      title: instrumentPreset.name,
      color: item.color,
      instrumentPreset,
      bars: [],
      muted: false,
      soloed: false,
      areThereAnyOtherTrackSoloed: false,
      volume: 100,
    }
    dispatch(addTrack(newTrack))
    dispatch(selectTrack(newTrack))
  }

  return (
    <div
      className="w-52 flex flex-col bg-zinc-200 dark:bg-zinc-900 shadow-md shadow-zinc-600 rounded-xl overflow-hidden"
      ref={popupMenuRef}
    >
      {menuItems.map((item, index) => (
        <div
          key={index}
          className="p-2 hover:bg-zinc-300 dark:hover:bg-zinc-600 select-none cursor-pointer flex flex-row gap-2 items-center"
          onClick={() => {
            handleAddTrack(item)
            onClose()
          }}
        >
          <div
            className={`p-4 bg-${item.color}-500 rounded-lg text-3xl text-slate-200`}
          >
            {item.icon}
          </div>

          <p className="font-bold text-xl">{item.label}</p>
        </div>
      ))}
    </div>
  )
}
