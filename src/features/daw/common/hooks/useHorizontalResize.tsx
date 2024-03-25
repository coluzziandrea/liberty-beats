import { useState } from 'react'

export const useHorizontalResize = (initialWidth: number) => {
  const [elementWidth, setElementWidth] = useState(initialWidth)

  const handleResizeMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()

    const xBeforeResize = e.clientX

    const mouseMoveHandler = (e: MouseEvent) => {
      const dx = e.clientX - xBeforeResize
      const newWidth = elementWidth + dx
      setElementWidth(newWidth)
    }

    const mouseUpHandler = () => {
      document.removeEventListener('mouseup', mouseUpHandler)
      document.removeEventListener('mousemove', mouseMoveHandler)
    }

    document.addEventListener('mousemove', mouseMoveHandler)
    document.addEventListener('mouseup', mouseUpHandler)
  }

  return {
    elementWidth,
    setElementWidth,
    handleResizeMouseDown,
  }
}
