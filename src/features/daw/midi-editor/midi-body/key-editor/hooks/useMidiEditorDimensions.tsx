import { useSelector } from 'react-redux'
import { selectWhiteKeySize } from '../../../store/selectors'
import { selectMaxBars } from '../../../../playlist-header/store/selectors'
import { RULER_BAR_WIDTH } from '../../../../common/components/ruler/constants'
import { PIANO_ROLL_BAR_HEADER_HEIGHT } from '../../../constants'

export const useMidiEditorDimensions = () => {
  const whiteKeySize = useSelector(selectWhiteKeySize)
  const maxBars = useSelector(selectMaxBars)

  const keyHeight = whiteKeySize * 0.599
  const beatWidth = RULER_BAR_WIDTH / 4
  const barWidth = RULER_BAR_WIDTH
  const barHeaderHeight = PIANO_ROLL_BAR_HEADER_HEIGHT

  return {
    whiteKeySize,
    keyHeight,
    maxBars,
    barWidth,
    beatWidth,
    barHeaderHeight,
  }
}
