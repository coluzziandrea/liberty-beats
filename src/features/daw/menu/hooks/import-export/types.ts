import { Track } from '../../../../../model/track/track'

export interface ExportData {
  tracks: Track[]
  project_title: string
  created_at: string
  version: string
}
