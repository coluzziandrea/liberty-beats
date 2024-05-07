import { PayloadAction, createSlice } from '@reduxjs/toolkit'

export interface MenuState {
  projectTitle: string
}

const initialState: MenuState = {
  projectTitle: 'New Project',
}

export const menuSlice = createSlice({
  name: 'menu',
  initialState,
  reducers: {
    setProjectTitle: (state, action: PayloadAction<string>) => {
      state.projectTitle = action.payload
    },
  },
})

export const { setProjectTitle } = menuSlice.actions

export default menuSlice.reducer
