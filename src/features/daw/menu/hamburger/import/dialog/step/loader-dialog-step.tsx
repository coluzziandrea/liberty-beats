import { Loader } from '../../../../../common/components/loader/loader'
import { useWizardContext } from '../../../../../common/components/wizard/use-wizard-context'
import { useEffect } from 'react'

export type LoaderDialogStepProps = {
  isLoading: boolean
}

export const LoaderDialogStep = ({ isLoading }: LoaderDialogStepProps) => {
  const { goToNextStep } = useWizardContext()

  useEffect(() => {
    if (!isLoading) {
      goToNextStep()
    }
  }, [goToNextStep, isLoading])

  return (
    <div className="flex flex-row w-full h-full p-8 justify-center">
      <Loader />
    </div>
  )
}
