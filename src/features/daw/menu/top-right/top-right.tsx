import { Export } from './export/export'
import { Theme } from './theme/theme'

export const TopRight = () => {
  return (
    <div className="flex flex-row items-center justify-end h-full select-none gap-4">
      <Export />
      <Theme />
    </div>
  )
}
