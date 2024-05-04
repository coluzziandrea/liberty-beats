import { useRef } from 'react'
import { useCallbackOnOutsideClick } from '../../hooks/use-outside-click'

export type PopupMenuItem = {
  label: string
  icon: JSX.Element
  action: () => void
}

export type PopupMenuProps = {
  items: PopupMenuItem[]
  onClose: () => void
}

export const PopupMenu = ({ items, onClose }: PopupMenuProps) => {
  const popupMenuRef = useRef<HTMLDivElement>(null)
  useCallbackOnOutsideClick(popupMenuRef, onClose)

  return (
    <div
      className="w-52 flex flex-col bg-zinc-900 shadow-md shadow-zinc-600 rounded-xl overflow-hidden"
      ref={popupMenuRef}
    >
      {items.map((item, index) => (
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
