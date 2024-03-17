import { LeftMenuHeader } from './left-menu-header/left-menu-header'
import { LeftMenuNotes } from './left-menu-notes/left-menu-notes'
import { LeftMenuScaleView } from './left-menu-scale-view/left-menu-scale-view'
import { LeftMenuTranspose } from './left-menu-transpose/left-menu-transpose'

export const LeftMenu = () => {
  return (
    <div className="flex flex-col w-full p-2 gap-4 select-none">
      <LeftMenuHeader />

      <LeftMenuNotes />

      <LeftMenuTranspose />

      <LeftMenuScaleView />
    </div>
  )
}
