import { configureStore } from '@reduxjs/toolkit'
import playerBarReducer from '../features/player-bar/store/playerBarSlice'

export const store = configureStore({
  reducer: {
    playerBar: playerBarReducer,
  },
})

export type RootStore = typeof store
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch