import { ModalProps } from './modal'
import { IoClose } from 'react-icons/io5'

export const ModalContent = ({ onClose, dialog }: ModalProps) => {
  const size = dialog.options?.size || 'md'

  const canClose = dialog.options?.canClose ?? true

  const sizesByType = {
    sm: {
      width: '350px',
      height: '250px',
    },
    md: {
      width: '250px',
      height: '250px',
    },
    lg: {
      width: '250px',
      height: '250px',
    },
    xl: {
      width: '250px',
      height: '250px',
    },
  }

  return (
    <div
      className="flex flex-col bg-slate-200 z-50 dark:bg-stone-800 text-black  dark:text-white rounded-2xl overflow-hidden drop-shadow-2xl py-2 px-4"
      style={{
        width: sizesByType[size].width,
        height: sizesByType[size].height,
      }}
    >
      <div className="flex flex-row h-12 justify-end">
        {canClose && (
          <div
            className="cursor-pointer hover:text-slate-600 dark:hover:text-slate-400"
            onClick={onClose}
          >
            <IoClose size={24} />
          </div>
        )}
      </div>

      {dialog.component}
    </div>
  )
}
