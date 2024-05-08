import { PayloadAction, createSlice } from '@reduxjs/toolkit'

export type Theme = 'light' | 'dark'

export interface MenuState {
  projectTitle: string
  theme: Theme
}

const initialState: MenuState = {
  projectTitle: 'New Project',
  theme: 'light',
}

export const menuSlice = createSlice({
  name: 'menu',
  initialState,
  reducers: {
    setProjectTitle: (state, action: PayloadAction<string>) => {
      state.projectTitle = action.payload
    },
    setTheme: (state, action: PayloadAction<Theme>) => {
      if (action.payload === 'dark') {
        document.documentElement.classList.add('dark')
        localStorage.theme = 'dark'
      } else {
        document.documentElement.classList.remove('dark')
        localStorage.theme = 'light'
      }

      state.theme = action.payload
    },
  },
})

export const { setProjectTitle, setTheme } = menuSlice.actions

export default menuSlice.reducer
