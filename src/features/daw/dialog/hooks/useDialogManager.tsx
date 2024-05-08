import { useDispatch } from 'react-redux'
import { DialogOptions } from '../types/dialog'
import { popDialog, pushDialog } from '../store/dialog-slice'
import { useCallback } from 'react'

export const useDialogManager = (key: string) => {
  const dispatch = useDispatch()

  const show = useCallback(
    (component: React.ReactNode, options?: DialogOptions) => {
      dispatch(pushDialog({ key, component, options }))
    },
    [dispatch, key]
  )

  const hide = useCallback(() => {
    dispatch(popDialog(key))
  }, [dispatch, key])

  return {
    show,
    hide,
  }
}
