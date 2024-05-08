import { useState } from 'react'
import { FaCircleInfo } from 'react-icons/fa6'
import { FiDownload, FiUpload } from 'react-icons/fi'
import { IoIosHelpBuoy } from 'react-icons/io'
import { VscJson } from 'react-icons/vsc'

import { useExport } from '../hooks/useExport'

export const useHamburgerData = () => {
  const [isOpen, setIsOpen] = useState(false)

  const { exportTracksToJSON } = useExport()

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
