import { useState } from 'react'
import { useWizardContext } from '../../../../../common/components/wizard/use-wizard-context'

export type FileChooserDialogStepProps = {
  handleFileImport: (file: File) => void
}

export const FileChooserDialogStep = ({
  handleFileImport,
}: FileChooserDialogStepProps) => {
  const [fileToImport, setFileToImport] = useState<File | null>(null)

  const { goToNextStep, setNextStepHandler } = useWizardContext()

  setNextStepHandler(() => {
    // Here we would execute the import action
    fileToImport && handleFileImport(fileToImport)
  })

  return (
    <div className="flex flex-col w-full h-full justify-start items-center mt-4 mx-2 gap-4">
      <h2>Select file to import</h2>

      <div className="flex flex-col gap-2 justify-center items-center">
        <input
          className="text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
          aria-describedby="file_input_help"
          id="file_input"
          accept=".json"
          type="file"
          onChange={(e) => {
            if (e?.target?.files && e.target.files.length > 0) {
              setFileToImport(e?.target?.files[0])
            }
          }}
        />
        <p
          className="text-sm text-gray-500 dark:text-gray-300"
          id="file_input_help"
        >
          JSON File previously exported.
        </p>
      </div>

      <div className="flex flex-row gap-4">
        <button
          className="bg-green-500 hover:bg-green-700 dark:bg-green-800 dark:hover:bg-green-600 dark:hover:border-slate-400 text-white rounded-lg px-4 py-2 disabled:opacity-50 disabled:cursor-not-allowed"
          onClick={goToNextStep}
          disabled={!fileToImport}
        >
          Import
        </button>
      </div>
    </div>
  )
}
