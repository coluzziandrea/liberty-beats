import { useRef, useState } from 'react'
import { useCallbackOnOutsideClick } from '../../hooks/use-outside-click'
import { IoIosArrowForward } from 'react-icons/io'

export type PopupMenuItem = {
  label: string
  icon: JSX.Element
  action?: () => void
  children?: PopupMenuItem[]
}

export type PopupMenuProps = {
  items: PopupMenuItem[]
  onClose: () => void
}

export const PopupMenu = ({ items, onClose }: PopupMenuProps) => {
  const [showChildrenMenu, setShowChildrenMenu] = useState(false)
  const [childMenuIndex, setChildMenuIndex] = useState(0)

  const popupMenuRef = useRef<HTMLDivElement>(null)
  useCallbackOnOutsideClick(popupMenuRef, onClose)

  return (
    <div
      className={`w-52 flex flex-col bg-zinc-200 dark:bg-zinc-900 shadow-md shadow-zinc-600 rounded-tl-xl rounded-bl-xl ${
        showChildrenMenu ? '' : 'rounded-tr-xl rounded-br-xl'
      } overflow-hidden`}
      ref={popupMenuRef}
    >
      {items.map((item, index) => (
        <div
          key={index}
          className="p-2 h-10 hover:bg-zinc-300 dark:hover:bg-zinc-600 select-none cursor-pointer flex flex-row gap-2 items-center"
          onClick={item.action ? item.action : () => {}}
          onMouseEnter={() => {
            if (!item.children) {
              return
            }
            setShowChildrenMenu(true)
            setChildMenuIndex(index)
          }}
          onMouseLeave={() => {
            if (!item.children) {
              return
            }
            setShowChildrenMenu(false)
          }}
        >
          {item.icon}
          <p className="font-bold text-sm">{item.label}</p>

          {item.children && (
            <div className="flex-grow flex justify-end">
              <div className="h-full relative">
                <IoIosArrowForward />
                <div
                  hidden={!(showChildrenMenu && childMenuIndex === index)}
                  className="fixed -mt-7 ml-6 z-50 h-fit w-fit"
                >
                  <div className="w-52 flex flex-col bg-zinc-200 dark:bg-zinc-900 shadow-md shadow-zinc-600 rounded-tr-xl rounded-br-xl overflow-hidden">
                    {item.children.map((item, index) => (
                      <div
                        key={index}
                        className="p-2 h-10 hover:bg-zinc-300 dark:hover:bg-zinc-600 select-none cursor-pointer flex flex-row gap-2 items-center "
                        onClick={item.action}
                      >
                        {item.icon}
                        <p className="font-bold text-sm">{item.label}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  )
}
