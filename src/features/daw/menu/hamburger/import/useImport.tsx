import { useDialogManager } from '../../../dialog/hooks/useDialogManager'
import { ImportWizard } from './dialog/import-wizard'

export const useImportWizard = () => {
  const { show, hide } = useDialogManager('import')

  const showImportDialog = () => {
    show(<ImportWizard hide={hide} />, { size: 'sm' })
  }

  return {
    showImportDialog,
  }
}
