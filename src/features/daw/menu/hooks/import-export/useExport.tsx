import { useSelector } from 'react-redux'
import { selectProjectTitle } from '../../store/selectors/menu-selectors'
import { selectTracks } from '../../../playlist/store/selectors'
import { saveAs } from 'file-saver'
import { ExportData } from './types'

export const useExport = () => {
  const projectTitle = useSelector(selectProjectTitle)
  const tracks = useSelector(selectTracks)

  function exportTracksToJSON() {
    const fileContent: ExportData = {
      project_title: projectTitle,
      tracks,
      created_at: new Date().toISOString(),
      version: 'liberty_beats/1.0.0', // Add version to the exported JSON file, to be able to handle future changes
    }
    const fileToSave = new Blob([JSON.stringify(fileContent)], {
      type: 'application/json',
    })
    saveAs(fileToSave, `${projectTitle}-${new Date().toDateString()}`)
  }

  return {
    exportTracksToJSON,
  }
}
