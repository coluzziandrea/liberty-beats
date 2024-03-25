import { LeftMenuHeader } from './left-menu-header/left-menu-header'
import { LeftMenuVelocity } from './left-menu-velocity/left-menu-velocity'
import { LeftMenuScaleView } from './left-menu-scale-view/left-menu-scale-view'
import { LeftMenuTranspose } from './left-menu-transpose/left-menu-transpose'

export const LeftMenu = () => {
  return (
    <div className="flex flex-col w-full p-2 gap-4 select-none">
      <LeftMenuHeader />

      <LeftMenuVelocity />

      <LeftMenuTranspose />

      <LeftMenuScaleView />
    </div>
  )
}
