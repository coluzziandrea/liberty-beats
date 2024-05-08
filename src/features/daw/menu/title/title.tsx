import { useSelector } from 'react-redux'
import { selectProjectTitle } from '../store/selectors/menu-selectors'

export const Title = () => {
  const projectTitle = useSelector(selectProjectTitle)
  return (
    <div className="flex flex-row h-12 max-h-12 px-2 gap-4">
      <div className="flex items-center">
        <div className="text-lg font-bold">{projectTitle}</div>
      </div>
    </div>
  )
}
