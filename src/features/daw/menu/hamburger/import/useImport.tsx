import { useDialogManager } from '../../../dialog/hooks/useDialogManager'
import { ImportDialog } from './dialog/import-dialog'

export const useImport = () => {
  const { show, hide } = useDialogManager('import')

  const showImportDialog = () => {
    show(<ImportDialog hide={hide} />)
  }

  return {
    showImportDialog,
  }
}
