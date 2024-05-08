import { Dialog } from '../types/dialog'
import { ModalContent } from './content'
import { ModalOverlay } from './overlay'

export type ModalProps = {
  onClose: () => void
  dialog: Dialog
}

export const Modal = (props: ModalProps) => {
  return (
    <div className="absolute z-40 left-0 top-0 w-screen h-screen flex justify-center items-center">
      <ModalOverlay />

      <ModalContent {...props} />
    </div>
  )
}
