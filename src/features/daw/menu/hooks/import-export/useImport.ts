import { useCallback, useState } from 'react'
import { ExportData } from './types'
import { useDispatch, useSelector } from 'react-redux'
import { setProjectTitle } from '../../store/menu-slice'
import { selectTracks } from '../../../playlist/store/selectors'
import { addTrack, deleteTrack } from '../../../playlist/store/playlist-slice'
import { readJSONFile } from '../../hamburger/import/utils/read-json-file'

const importVersion1 = (data: ExportData) => {
  return data
}

const importByVersion = {
  'liberty_beats/1.0.0': importVersion1,
}

const parseData = (json: unknown) => {
  if (!json) {
    throw new Error('Invalid project file')
  }

  const data = json as ExportData
  const allowedVersions = Object.keys(importByVersion)
  if (!allowedVersions.includes(data.version)) {
    throw new Error(
      `Invalid version of the project file, it should be one of ${allowedVersions
        .map((v) => `"${v}"`)
        .join(',')}`
    )
  }

  const dataVersion = data.version as keyof typeof importByVersion

  return importByVersion[dataVersion](data)
}

export const useImport = () => {
  const dispatch = useDispatch()

  const tracks = useSelector(selectTracks)
  const [isLoading, setIsLoading] = useState(false)
  const [isError, setIsError] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string>('')
  const [exportData, setExportData] = useState<ExportData | null>(null)

  const executeImportProject = useCallback(
    async (file: File) => {
      setIsLoading(true)

      try {
        const fileContent = await readJSONFile(file)
        const data = parseData(fileContent)
        setExportData(data)

        dispatch(setProjectTitle(data.project_title))

        tracks.forEach((track) => {
          // remove all tracks
          dispatch(deleteTrack(track.id))
        })

        data.tracks.forEach((track) => {
          // add imported tracks
          dispatch(addTrack(track))
        })
      } catch (error) {
        setIsError(true)
        if (error instanceof Error) {
          setErrorMessage(error.message)
        }
      } finally {
        setIsLoading(false)
      }
    },
    [dispatch, tracks]
  )

  return {
    isLoading,
    executeImportProject,
    exportData,
    isError,
    errorMessage,
  }
}
