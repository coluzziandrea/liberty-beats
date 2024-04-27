import { useRef } from 'react'
import { Track } from '../../../../../../../model/track/track'
import { Bar } from '../../../../../../../model/bar/bar'
import { useCallbackOnOutsideClick } from '../../../../../common/hooks/use-outside-click'
import { BiRename } from 'react-icons/bi'
import { FaRegCopy } from 'react-icons/fa'
import { MdDelete } from 'react-icons/md'
import { useDispatch } from 'react-redux'
import { removeBar } from '../../../../store/playlist-slice'

export type TrackBarPopupMenuProps = {
  track: Track
  bar: Bar
  onClose: () => void
  onRename: () => void
}

export const TrackBarPopupMenu = ({
  track,
  bar,
  onClose,
  onRename,
}: TrackBarPopupMenuProps) => {
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
      label: 'Copy',
      icon: <FaRegCopy />,
      action: () => {},
    },
    {
      label: 'Delete',
      icon: <MdDelete />,
      action: () => {
        dispatch(removeBar({ trackId: track.id, barId: bar.id }))
      },
    },
  ]

  return (
    <div
      className="w-52 flex flex-col bg-zinc-900 shadow-md shadow-zinc-600 rounded-xl overflow-hidden"
      ref={popupMenuRef}
    >
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
