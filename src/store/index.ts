import { configureStore } from '@reduxjs/toolkit'
import playerBarReducer from '../features/daw/player-bar/store/playerBarSlice'
import playlistSlice from '../features/daw/playlist/store/playlist-slice'
import playlistHeaderSlice from '../features/daw/playlist-header/store/playlist-header-slice'
import bottomBarSlice from '../features/daw/bottom-bar/store/bottom-bar-slice'
import instrumentSlice from '../features/daw/instrument/store/instrument-slice'

export const store = configureStore({
  reducer: {
    playerBar: playerBarReducer,
    playlist: playlistSlice,
    playlistHeader: playlistHeaderSlice,
    bottomBar: bottomBarSlice,
    instrument: instrumentSlice,
  },
})

export type RootStore = typeof store
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
