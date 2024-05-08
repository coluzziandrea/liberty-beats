import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { Dialog } from '../types/dialog'

export type Theme = 'light' | 'dark'

export interface DialogState {
  queue: Dialog[]
}

const initialState: DialogState = {
  queue: [],
}

export const dialogSlice = createSlice({
  name: 'dialog',
  initialState,
  reducers: {
    pushDialog: (state, action: PayloadAction<Dialog>) => {
      state.queue.push(action.payload)
    },
    popDialog: (state, action: PayloadAction<string>) => {
      state.queue = state.queue.filter(
        (dialog) => dialog.key !== action.payload
      )
    },
  },
})

export const { pushDialog, popDialog } = dialogSlice.actions

export default dialogSlice.reducer
