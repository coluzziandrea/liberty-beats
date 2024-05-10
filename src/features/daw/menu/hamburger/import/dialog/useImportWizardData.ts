import { useEffect, useMemo, useState } from 'react'
import { FileChooserDialogStepProps } from './step/file-dialog-step'
import { LoaderDialogStepProps } from './step/loader-dialog-step'
import { AlertDialogStepProps } from './step/alert-dialog-step'
import { ImportWizardProps } from './import-wizard'
import { useImport } from '../../../hooks/import-export/useImport'

export type ImportWizardData = {
  file: FileChooserDialogStepProps
  loader: LoaderDialogStepProps
  alert: AlertDialogStepProps
}

export const useImportWizardData = ({ hide }: ImportWizardProps) => {
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle')

  const [projectTitle, setProjectTitle] = useState<string>('')
  const [trackCount, setTrackCount] = useState<number>(0)

  const { executeImportProject, exportData, isLoading, isError, errorMessage } =
    useImport()

  useEffect(() => {
    if (isLoading) {
      return
    }

    if (isError) {
      setStatus('error')
      return
    }

    if (exportData) {
      setStatus('success')
      setProjectTitle(exportData.project_title)
      setTrackCount(exportData.tracks.length)
    }
  }, [exportData, isError, isLoading])

  const alert: AlertDialogStepProps = useMemo(() => {
    if (status === 'idle') {
      // should not be rendered
      return { status: 'info', title: '', message: '' }
    }

    if (status === 'error') {
      return {
        status: 'error',
        title: 'Error',
        message: 'Error importing file: ' + errorMessage,
        action: {
          label: 'OK',
          onClick: hide,
        },
      }
    }

    return {
      status: 'success',
      title: 'Success',
      message: `Project '${projectTitle}' imported successfully. It contains ${trackCount} tracks.`,
      action: {
        label: 'OK',
        onClick: hide,
      },
    }
  }, [errorMessage, hide, projectTitle, status, trackCount])

  return {
    file: {
      handleFileImport: executeImportProject,
    },

    loader: {
      isLoading,
    },

    alert,
  }
}
