export type WizardContextValues = {
  goToNextStep: () => void
  goToPrevStep: () => void
  setNextStepHandler: (handler: () => void) => void

  isLoading: boolean
  activeStep: number
}

export type WizardProps = {
  onStepChange?: (step: number) => void

  Wrapper?: React.ReactElement
}
