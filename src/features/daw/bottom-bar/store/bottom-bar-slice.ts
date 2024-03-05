import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { BottomUpPanel } from '../types/bottom-up-panel'

export interface BottomBarState {
  selectedBottomUpPanel: BottomUpPanel | null
}

const initialState: BottomBarState = {
  selectedBottomUpPanel: 'instrument',
}

export const bottomBarSlice = createSlice({
  name: 'bottomBar',
  initialState,
  reducers: {
    selectBottomUpPanel: (state, action: PayloadAction<BottomUpPanel>) => {
      state.selectedBottomUpPanel = action.payload
    },
    closeAllBottomUpPanels: (state) => {
      state.selectedBottomUpPanel = null
    },
  },
})

export const { selectBottomUpPanel, closeAllBottomUpPanels } =
  bottomBarSlice.actions

export default bottomBarSlice.reducer
