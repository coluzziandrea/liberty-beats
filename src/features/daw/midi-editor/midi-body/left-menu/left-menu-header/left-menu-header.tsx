import { BsFillCursorFill } from 'react-icons/bs'
import { FaHeadphones } from 'react-icons/fa'
import { RiPencilFill } from 'react-icons/ri'

export const LeftMenuHeader = () => {
  return (
    <div className="flex flex-row justify-between items-center">
      <div className="flex flex-row gap-1">
        <button className="w-[40px] h-[40px] text-xs bg-white text-black">
          <BsFillCursorFill />
        </button>

        <button className="w-[40px] h-[40px] text-xs bg-zinc-800 text-white">
          <RiPencilFill />
        </button>

        <button className="w-[40px] h-[40px] text-xs bg-zinc-800 text-white">
          V
        </button>
      </div>

      <div>
        <button className="rounded-full bg-orange-900 text-orange-400">
          <FaHeadphones />
        </button>
      </div>
    </div>
  )
}
