import { useDispatch, useSelector } from 'react-redux'
import { selectProjectTitle } from '../store/selectors/menu-selectors'
import { BsPencilFill } from 'react-icons/bs'
import { useEffect, useState } from 'react'
import { useDebounce } from '../../common/hooks/useDebounce'
import { setProjectTitle } from '../store/menu-slice'

export const Title = () => {
  const projectTitle = useSelector(selectProjectTitle)
  const dispatch = useDispatch()

  const [localProjectTitle, setLocalProjectTitle] =
    useState<string>(projectTitle)

  const debouncedLocalProjectTitle = useDebounce(localProjectTitle, 500)

  useEffect(() => {
    if (localProjectTitle !== projectTitle) {
      dispatch(setProjectTitle(localProjectTitle))
    }
  }, [debouncedLocalProjectTitle, dispatch, localProjectTitle, projectTitle])

  return (
    <div className="flex flex-row h-12 max-h-12 px-2 py-2 gap-4">
      <div className="relative flex items-center gap-2 w-80 justify-center rounded-3xl overflow-hidden ">
        <input
          type="text"
          className="w-full z-10 h-full peer bg-transparent font-semibold text-center border-none focus:outline-none "
          value={localProjectTitle}
          onChange={(e) => setLocalProjectTitle(e.target.value)}
        />

        <div className="z-10 mr-2 transition-all opacity-0 peer-hover:opacity-100 peer-focus:opacity-0">
          <BsPencilFill />
        </div>

        <div className="absolute opacity-60 w-full h-full transition-colors peer-focus:bg-slate-300 peer-hover:bg-slate-300 dark:peer-focus:bg-slate-700 dark:peer-hover:bg-slate-700"></div>
      </div>
    </div>
  )
}
