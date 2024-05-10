import { useState } from 'react'
import { FaCircleInfo } from 'react-icons/fa6'
import { FiDownload, FiUpload } from 'react-icons/fi'
import { IoIosHelpBuoy } from 'react-icons/io'
import { VscJson } from 'react-icons/vsc'

import { useExport } from '../hooks/import-export/useExport'
import { useImportWizard } from './import/useImport'
import { MdDarkMode, MdLightMode, MdOutlineColorLens } from 'react-icons/md'
import { useDispatch } from 'react-redux'
import { setTheme } from '../store/menu-slice'

export const useHamburgerData = () => {
  const [isOpen, setIsOpen] = useState(false)

  const dispatch = useDispatch()

  const { exportTracksToJSON } = useExport()
  const { showImportDialog } = useImportWizard()

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
                showImportDialog()
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
          label: 'Theme',
          icon: <MdOutlineColorLens />,
          children: [
            {
              label: 'Light',
              icon: <MdLightMode />,
              action: () => {
                setIsOpen(false)
                dispatch(setTheme('light'))
              },
            },
            {
              label: 'Dark',
              icon: <MdDarkMode />,
              action: () => {
                setIsOpen(false)
                dispatch(setTheme('dark'))
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
