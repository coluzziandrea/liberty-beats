import { useState } from 'react'
import { VscJson } from 'react-icons/vsc'
import { useExport } from '../../hooks/useExport'

export const useExportData = () => {
  const [isOpen, setIsOpen] = useState(false)

  const { exportTracksToJSON } = useExport()

  return {
    onExportClick: () => setIsOpen(!isOpen),
    menu: {
      isOpen: isOpen,
      onClose: () => setIsOpen(false),

      items: [
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
  }
}
