import { useState } from 'react'
import { FaCircleInfo } from 'react-icons/fa6'
import { FiDownload, FiUpload } from 'react-icons/fi'
import { IoIosHelpBuoy } from 'react-icons/io'
import { VscJson } from 'react-icons/vsc'
import { useSelector } from 'react-redux'
import { saveAs } from 'file-saver'

import { selectTracks } from '../../playlist/store/selectors'
import { selectProjectTitle } from '../store/selectors/menu-selectors'

export const useHamburgerData = () => {
  const [isOpen, setIsOpen] = useState(false)

  const projectTitle = useSelector(selectProjectTitle)
  const tracks = useSelector(selectTracks)

  function exportTracksToJSON() {
    const fileContent = {
      project_title: projectTitle,
      tracks,
      created_at: new Date().toISOString(),
      version: '1.0.0', // Add version to the exported JSON file, to be able to handle future changes
    }
    const fileToSave = new Blob([JSON.stringify(fileContent)], {
      type: 'application/json',
    })
    saveAs(fileToSave, `${projectTitle}-${new Date().toDateString()}`)
  }

  return {
    onHamburgerClick: () => setIsOpen(!isOpen),
    menu: {
      isOpen: isOpen,
      onClose: () => setIsOpen(false),

      items: [
        {
          label: 'Import',
          icon: <FiUpload />,
          children: [
            {
              label: 'From JSON',
              icon: <VscJson />,
              action: () => {
                setIsOpen(false)
              },
            },
          ],
        },

        {
          label: 'Export',
          icon: <FiDownload />,
          children: [
            {
              label: 'To JSON',
              icon: <VscJson />,
              action: () => {
                setIsOpen(false)
                exportTracksToJSON()
              },
            },
          ],
        },

        {
          label: 'Help',
          icon: <IoIosHelpBuoy />,
          children: [
            {
              label: 'About',
              icon: <FaCircleInfo />,
              action: () => {
                setIsOpen(false)
              },
            },
          ],
        },
      ],
    },
  }
}
