import React from 'react'
import WizardContext from './wizard-context'

export const useWizardContext = () => {
  const context = React.useContext(WizardContext)
  if (!context) {
    throw new Error('useWizard must be used within a WizardProvider')
  }
  return context
}
