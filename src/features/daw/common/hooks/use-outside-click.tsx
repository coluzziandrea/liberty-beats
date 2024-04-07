import { RefObject, useEffect } from 'react'

export const useCallbackOnOutsideClick = (
  ref: RefObject<HTMLElement>,
  callback: () => void
) => {
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        // setting a timeout to allow the click event to finish before closing the menu
        setTimeout(() => {
          callback()
        }, 100)
      }
    }

    document.addEventListener('mousedown', handleClick)
    return () => {
      document.removeEventListener('mousedown', handleClick)
    }
  }, [ref, callback])
}
