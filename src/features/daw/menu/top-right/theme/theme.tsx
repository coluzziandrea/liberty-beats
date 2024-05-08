import { MdLightMode, MdDarkMode } from 'react-icons/md'
import { useDispatch, useSelector } from 'react-redux'
import { selectTheme } from '../../store/selectors/menu-selectors'
import { setTheme } from '../../store/menu-slice'

export const Theme = () => {
  const dispatch = useDispatch()
  const currentMode = useSelector(selectTheme)

  return (
    <div className="flex flex-row items-center justify-end h-full select-none">
      <div className="flex flex-row gap-1 rounded-full cursor-pointer border-2 border-zinc-700 dark:border-zinc-600">
        <div
          className={`p-1 rounded-full  ${
            currentMode === 'light' ? 'bg-zinc-700 text-white' : ''
          }`}
          onClick={() => dispatch(setTheme('light'))}
        >
          <MdLightMode />
        </div>

        <div
          className={`p-1 rounded-full  ${
            currentMode === 'dark' ? 'bg-zinc-400' : ''
          }`}
          onClick={() => dispatch(setTheme('dark'))}
        >
          <MdDarkMode />
        </div>
      </div>
    </div>
  )
}
