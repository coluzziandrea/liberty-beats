import { ModalProps } from './modal'

export const ModalContent = ({ onClose, dialog }: ModalProps) => {
  return (
    <div className="bg-slate-200 z-50 dark:bg-slate-600 text-black  dark:text-white w-[500px] h-[500px]">
      <div>I'm a modal dialog</div>
      <button onClick={onClose}>Close</button>

      {dialog.component}
    </div>
  )
}
