import { Modal } from './modal/modal'
import { createPortal } from 'react-dom'
import { useRootDialogManager } from './hooks/useRootDialogManager'

export const Dialog = () => {
  const { firstInQueue, onClose } = useRootDialogManager()

  return (
    <div className="relative">
      {firstInQueue &&
        createPortal(
          <Modal onClose={onClose} dialog={firstInQueue} />,
          document.body
        )}
    </div>
  )
}
