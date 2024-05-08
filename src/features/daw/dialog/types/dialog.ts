import React from 'react'

export type DialogOptions = {
  size?: 'sm' | 'md' | 'lg' | 'xl'
  closeOnOverlayClick?: boolean
  canClose?: boolean
}

export type Dialog = {
  key: string
  component: React.ReactNode
  options?: DialogOptions
}
