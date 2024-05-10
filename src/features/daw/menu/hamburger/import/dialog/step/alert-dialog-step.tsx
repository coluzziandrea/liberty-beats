import { Alert, AlertProps } from '../../../../../common/components/alert/alert'

export type AlertDialogStepProps = {
  status: AlertProps['status']
  message: AlertProps['message']
  title: AlertProps['title']
  action?: AlertProps['action']
}

export const AlertDialogStep = (props: AlertDialogStepProps) => {
  return (
    <div className="flex flex-row w-full h-full p-8 justify-center">
      <Alert {...props} />
    </div>
  )
}
