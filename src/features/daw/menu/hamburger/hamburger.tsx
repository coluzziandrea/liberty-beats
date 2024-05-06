import { GiHamburgerMenu } from 'react-icons/gi'

import logo from '../../../../assets/image/logo.webp'
import { useHamburgerData } from './useHamburgerData'
import { PopupMenu } from '../../common/components/popup-menu/popup-menu'

export const Hamburger = () => {
  const { onHamburgerClick, menu } = useHamburgerData()

  return (
    <div className="relative h-full select-none">
      <div
        className="flex h-full items-center justify-center cursor-pointer gap-2"
        onClick={onHamburgerClick}
      >
        <GiHamburgerMenu size={28} />

        <img className="h-full" src={logo} alt="Logo" />

        <div className="flex items-center justify-center">
          <span className="absolute flex bg-gradient-to-r blur-lg from-blue-500 via-teal-500 to-pink-500 bg-clip-text text-3xl box-content font-extrabold text-transparent text-center">
            Liberty Beats
          </span>
          <h1 className="relative top-0 w-fit h-auto justify-center flex bg-gradient-to-r items-center from-blue-500 via-teal-500 to-pink-500 bg-clip-text text-3xl font-extrabold text-transparent text-center">
            Liberty Beats
          </h1>
        </div>
      </div>

      {menu.isOpen && (
        <div className="fixed z-50 h-fit w-fit">
          <PopupMenu {...menu} />
        </div>
      )}
    </div>
  )
}
