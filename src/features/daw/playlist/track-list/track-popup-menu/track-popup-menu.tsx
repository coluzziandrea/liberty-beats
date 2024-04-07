import { BiRename } from 'react-icons/bi'
import { MdDelete } from 'react-icons/md'
import { FaArrowUp, FaArrowDown, FaRegCopy } from 'react-icons/fa'
import { TrackSetColorMenu } from './track-set-color-menu/track-set-color-menu'
import { Track } from '../../../../../model/track/track'
import { useDispatch } from 'react-redux'
import {
  deleteTrack,
  duplicateTrack,
  moveTrackDown,
  moveTrackUp,
  setTrackColor,
} from '../../store/playlist-slice'
import { useRef } from 'react'
import { useCallbackOnOutsideClick } from '../../../common/hooks/use-outside-click'

export type TrackPopupMenuProps = {
  track: Track
  onClose: () => void
  onRename: () => void
}

export const TrackPopupMenu = ({
  track,
  onClose,
  onRename,
}: TrackPopupMenuProps) => {
  const dispatch = useDispatch()
  const popupMenuRef = useRef<HTMLDivElement>(null)

  useCallbackOnOutsideClick(popupMenuRef, onClose)

  const menuItems = [
    {
      label: 'Rename',
      icon: <BiRename />,
      action: () => {
        onRename()
      },
    },
    {
      label: 'Move Up',
      icon: <FaArrowUp />,
      action: () => {
        dispatch(moveTrackUp(track.id))
      },
    },
    {
      label: 'Move Down',
      icon: <FaArrowDown />,
      action: () => {
        dispatch(moveTrackDown(track.id))
      },
    },
    {
      label: 'Duplicate',
      icon: <FaRegCopy />,
      action: () => {
        dispatch(duplicateTrack(track.id))
      },
    },
    {
      label: 'Delete',
      icon: <MdDelete />,
      action: () => {
        dispatch(deleteTrack(track.id))
      },
    },
  ]
  return (
    <div
      className="w-52 flex flex-col bg-zinc-900 shadow-md shadow-zinc-600 rounded-xl overflow-hidden"
      ref={popupMenuRef}
    >
      <TrackSetColorMenu
        currentColor={track.color}
        onSetColor={(color) =>
          dispatch(setTrackColor({ trackId: track.id, color }))
        }
      />

      {menuItems.map((item, index) => (
        <div
          key={index}
          className="p-2 hover:bg-zinc-600 select-none cursor-pointer flex flex-row gap-2 items-center"
          onClick={item.action}
        >
          {item.icon}
          <p className="font-bold text-sm">{item.label}</p>
        </div>
      ))}
    </div>
  )
}
