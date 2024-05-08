import React from 'react'

export type DialogOptions = {
  size?: 'sm' | 'md' | 'lg' | 'xl'
  closeOnOverlayClick?: boolean
}

export type Dialog = {
  key: string
  component: React.ReactNode
  options?: DialogOptions
}
