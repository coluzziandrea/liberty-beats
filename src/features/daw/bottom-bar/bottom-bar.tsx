import { useDispatch, useSelector } from 'react-redux'
import { selectSelectedBottomUpPanel } from './store/selectors'
import { selectSelectedTrack } from '../playlist/store/selectors'
import { BottomUpPanel } from './types/bottom-up-panel'
import { BottomBarItem } from './bottom-bar-item/bottom-bar-item'
import { useEffect } from 'react'
import { selectBottomUpPanel } from './store/bottom-bar-slice'
import { Track } from '../../../model/track/track'

const bottomUpPanelItems: { label: string; bottomUpPanel: BottomUpPanel }[] = [
  {
    label: 'Instrument',
    bottomUpPanel: 'instrument',
  },
  {
    label: 'MIDI Editor',
    bottomUpPanel: 'midiEditor',
  },
  {
    label: 'Drum Machine',
    bottomUpPanel: 'drumMachine',
  },
]

const getAllowedBottomUpPanelForTrack = (selectedTrack?: Track) => {
  const selectedTrackType = selectedTrack?.instrumentPreset.instrument
  if (selectedTrackType && selectedTrackType !== 'DRUMS') {
    return ['instrument', 'midiEditor']
  }

  if (selectedTrackType && selectedTrackType === 'DRUMS') {
    return ['drumMachine']
  }

  return []
}

export const BottomBar = () => {
  const selectedBottomUpPanel = useSelector(selectSelectedBottomUpPanel)
  const dipatch = useDispatch()
  const selectedTrack = useSelector(selectSelectedTrack)
  const items = getAllowedBottomUpPanelForTrack(selectedTrack)
    .map((panel) => {
      return bottomUpPanelItems.find((item) => item.bottomUpPanel === panel)
    })
    .filter(Boolean) as { label: string; bottomUpPanel: BottomUpPanel }[]

  useEffect(() => {
    const allowedBottomUpPanels = getAllowedBottomUpPanelForTrack(selectedTrack)
    if (
      selectedBottomUpPanel &&
      !allowedBottomUpPanels.includes(selectedBottomUpPanel)
    ) {
      if (allowedBottomUpPanels.length === 0) {
        dipatch(selectBottomUpPanel(null))
      } else {
        dipatch(selectBottomUpPanel(allowedBottomUpPanels[0] as BottomUpPanel))
      }
    }
  }, [dipatch, selectedBottomUpPanel, selectedTrack])

  return (
    <div className="flex flex-row p-1">
      {items.map((item) => (
        <BottomBarItem
          key={item.label}
          label={item.label}
          bottomUpPanel={item.bottomUpPanel}
          selectedTrack={selectedTrack}
          selectedBottomUpPanel={selectedBottomUpPanel}
        />
      ))}
    </div>
  )
}
