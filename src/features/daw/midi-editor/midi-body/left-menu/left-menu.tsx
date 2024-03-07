import { BsFillCursorFill } from 'react-icons/bs'
import { RiPencilFill } from 'react-icons/ri'
import { FaHeadphones } from 'react-icons/fa'

export const LeftMenu = () => {
  return (
    <div className="flex flex-col w-full p-2">
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
    </div>
  )
}
