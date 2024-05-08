import { useDispatch, useSelector } from 'react-redux'
import { selectCurrentDialog } from '../store/selectors/selectors'
import { popDialog } from '../store/dialog-slice'

export const useRootDialogManager = () => {
  const dispatch = useDispatch()
  const firstInQueue = useSelector(selectCurrentDialog)
  return {
    firstInQueue,
    onClose: () => {
      if (firstInQueue) {
        dispatch(popDialog(firstInQueue.key))
      }
    },
  }
}
