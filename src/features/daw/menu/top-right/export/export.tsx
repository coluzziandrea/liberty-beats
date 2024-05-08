import { FaCaretDown } from 'react-icons/fa'
import { FiDownload } from 'react-icons/fi'
import { useExportData } from './useExportData'
import { PopupMenu } from '../../../common/components/popup-menu/popup-menu'

export const Export = () => {
  const { onExportClick, menu } = useExportData()

  return (
    <div className="relative h-full select-none">
      <div
        className="flex flex-row gap-2 items-center justify-center p-2 rounded-xl cursor-pointer border-[1px] border-zinc-700 hover:border-zinc-400 dark:border-zinc-600 dark:hover:border-white"
        onClick={onExportClick}
      >
        <FiDownload />
        <span className="text-md font-bold">Export</span>
        <FaCaretDown />
      </div>

      {menu.isOpen && (
        <div className="fixed -ml-20 z-50 h-fit w-fit">
          <PopupMenu {...menu} />
        </div>
      )}
    </div>
  )
}
