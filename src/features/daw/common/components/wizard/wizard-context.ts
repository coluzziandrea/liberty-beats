import React from 'react'
import { WizardContextValues } from './types'

const WizardContext = React.createContext<WizardContextValues | null>(null)

export default WizardContext
