import { Wizard } from '../../../../common/components/wizard/wizard'
import { FileChooserDialogStep } from './step/file-dialog-step'
import { LoaderDialogStep } from './step/loader-dialog-step'
import { AlertDialogStep } from './step/alert-dialog-step'
import { useImportWizardData } from './useImportWizardData'

export type ImportWizardProps = {
  hide: () => void
}

export const ImportWizard = (props: ImportWizardProps) => {
  const { file, alert, loader } = useImportWizardData(props)

  return (
    <Wizard>
      {/* Step 1: Choose file */}
      <FileChooserDialogStep {...file} />

      {/* Step 2: Loader - executing action */}
      <LoaderDialogStep {...loader} />

      {/* Step 3: Success alert */}
      <AlertDialogStep {...alert} />
    </Wizard>
  )
}
