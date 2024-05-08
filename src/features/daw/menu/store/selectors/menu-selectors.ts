import { RootState } from '../../../../../store'

export const selectProjectTitle = (state: RootState) => state.menu.projectTitle

export const selectTheme = (state: RootState) => state.menu.theme
