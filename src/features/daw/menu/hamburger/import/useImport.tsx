import { useCallback } from 'react'
import { useDialogManager } from '../../../dialog/hooks/useDialogManager'
import { FileDialog } from './dialog/file-dialog'
import { LoaderDialog } from './dialog/loader-dialog'
import { readJSONFile } from './utils/read-json-file'

export const useImportWizard = () => {
  const { show, hide } = useDialogManager('import')

  const executeImport = useCallback(
    async (file: File) => {
      hide()
      show(<LoaderDialog />, { size: 'sm', canClose: false })

      try {
        const jsonContent = await readJSONFile(file)
        console.log(jsonContent)

        // TODO trigger import action in store
      } catch (error) {
        console.error(error)
      }
    },
    [hide, show]
  )

  const showFileDialog = () => {
    show(<FileDialog execute={executeImport} />, { size: 'sm' })
  }

  return {
    showFileDialog,
  }
}
