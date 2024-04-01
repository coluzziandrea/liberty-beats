import { FaPlus } from 'react-icons/fa'
import { IoMdClose } from 'react-icons/io'
import { useState } from 'react'
import { AddTrackMenu } from './add-track-menu/add-track-menu'

export const PlaylistCommands = () => {
  const [showAddMenu, setShowAddMenu] = useState(false)

  return (
    <div className="flex flex-row">
      <div className="relative h-full w-full">
        <button
          onClick={() => {
            if (!showAddMenu) {
              setShowAddMenu(true)
            }
          }}
        >
          <div className="flex flex-row items-center justify-center gap-2">
            {showAddMenu ? (
              <IoMdClose className="animate-in spin-in" />
            ) : (
              <FaPlus className="animate-out spin-out" />
            )}
            <p>Add Track</p>
          </div>
        </button>

        {showAddMenu && (
          <div className="fixed mt-2 z-50 h-fit w-fit">
            <AddTrackMenu onClose={() => setShowAddMenu(false)} />
          </div>
        )}
      </div>
    </div>
  )
}
