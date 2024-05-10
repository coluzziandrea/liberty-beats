import React from 'react'
import WizardContext from './wizard-context'
import { WizardProps } from './types'

export const Wizard: React.FC<React.PropsWithChildren<WizardProps>> = ({
  children,
  onStepChange,
  Wrapper,
}) => {
  const [activeStep, setActiveStep] = React.useState(0)
  const [isLoading, setIsLoading] = React.useState(false)

  const hasNextStep = React.useRef(true)
  const hasPrevStep = React.useRef(false)
  const nextStepHandler = React.useRef<(() => void) | null>(() => {})
  const stepCount = React.Children.count(children)

  hasPrevStep.current = activeStep > 0
  hasNextStep.current = activeStep < stepCount - 1

  const goToNextStep = React.useCallback(() => {
    if (hasNextStep.current) {
      if (nextStepHandler.current) {
        setIsLoading(true)
        nextStepHandler.current()
        setIsLoading(false)

        nextStepHandler.current = null
      }

      const nextStep = activeStep + 1
      setActiveStep(nextStep)
      onStepChange?.(nextStep)
    }
  }, [activeStep, onStepChange])

  const goToPrevStep = React.useCallback(() => {
    if (hasPrevStep.current) {
      const prevStep = activeStep - 1
      setActiveStep(prevStep)
      onStepChange?.(prevStep)
    }
  }, [activeStep, onStepChange])

  const setNextStepHandler = React.useCallback((handler: () => void) => {
    nextStepHandler.current = handler
  }, [])

  const value = React.useMemo(
    () => ({
      goToNextStep,
      goToPrevStep,
      setNextStepHandler,

      isLoading,
      activeStep,
    }),
    [activeStep, goToNextStep, goToPrevStep, isLoading, setNextStepHandler]
  )

  const activeStepContent = React.useMemo(() => {
    const reactChildren = React.Children.toArray(children)
    return reactChildren[activeStep]
  }, [activeStep, children])

  const wrappedActiveStepContent = React.useMemo(
    () =>
      Wrapper
        ? React.cloneElement(Wrapper, { children: activeStepContent })
        : activeStepContent,
    [Wrapper, activeStepContent]
  )

  return (
    <WizardContext.Provider value={value}>
      {wrappedActiveStepContent}
    </WizardContext.Provider>
  )
}
