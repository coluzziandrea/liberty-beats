import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { selectTrackIdInPlayingPreviewloop } from '../../instrument/store/selectors'
import { selectTime } from '../../player-bar/store/selectors'
import { selectCurrentTick } from '../../playlist-header/store/selectors'

/**
 * This will return the time and tick from the store ONLY IF a preview loop is not running. if the loop is playing, we don't want to update the time from the store, because the preview loop of an active pattern will be played at the start of the track
 * @returns {Object} time and tick
 */
export const usePreviewLoopSafeTransportPosition = () => {
  const [time, setTime] = useState(0)
  const [tick, setTick] = useState(0)

  const timeFromStore = useSelector(selectTime)
  const tickFromStore = useSelector(selectCurrentTick)
  const previewLoopPlayingTrackId = useSelector(
    selectTrackIdInPlayingPreviewloop
  )

  useEffect(() => {
    if (!previewLoopPlayingTrackId) {
      setTime(timeFromStore)
      setTick(tickFromStore)
    }
  }, [previewLoopPlayingTrackId, tickFromStore, timeFromStore])

  return {
    time,
    tick,
  }
}
