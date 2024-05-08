import { useEffect, useRef } from 'react'
import { Key, KeyUtils } from '../../../../../../../model/note/key/key'
import { useMidiEditorDimensions } from '../../hooks/useMidiEditorDimensions'
import { selectTheme } from '../../../../../menu/store/selectors/menu-selectors'
import { useSelector } from 'react-redux'
import { Theme } from '../../../../../menu/store/menu-slice'

export type GridCanvasProps = {
  showedKeys: Readonly<Key[]>

  midiEditorDimensions: ReturnType<typeof useMidiEditorDimensions>

  cursorStyle?: 'default' | 'add'

  onClick: (e: MouseEvent, boundigRect: DOMRect) => void
  onDoubleClick: (e: MouseEvent, boundigRect: DOMRect) => void
  onDrop: (e: React.DragEvent) => void
}

export const GridCanvas = ({
  showedKeys,
  midiEditorDimensions,
  cursorStyle = 'default',
  onClick,
  onDoubleClick,
  onDrop,
}: GridCanvasProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  const theme = useSelector(selectTheme)

  const getBlackKeyRectangleColor = (mode: Theme) =>
    mode === 'dark' ? '#18181b' : '#d4d4d8' // darkMode: zinc-900 / light mode: zinc-100
  const getWhiteKeyRectangleColor = (mode: Theme) =>
    mode === 'dark' ? '#27272A' : '#e4e4e7' // tailwind zinc-800

  const parentBarBorderColor = '#94A3B8' // tailwind slate-500
  const subBarBorderColor = '#64748B' // tailwind slate-400

  const canvasWidth =
    midiEditorDimensions.maxBars * midiEditorDimensions.barWidth
  const canvasHeight = midiEditorDimensions.keyHeight * showedKeys.length

  useEffect(() => {
    if (!canvasRef.current) return
    const canvas = canvasRef.current

    canvas.width = canvas.clientWidth
    canvas.height = canvas.clientHeight
    const context = canvas.getContext('2d')

    if (!context) return

    const draw = (myContext: CanvasRenderingContext2D, theme: Theme) => {
      const drawKeyRectangle = (
        context: CanvasRenderingContext2D,
        y: number,
        color: string
      ) => {
        context.beginPath()
        context.fillStyle = color
        context.fillRect(0, y, canvasWidth, midiEditorDimensions.keyHeight)
      }

      const drawRulerGridLines = (
        context: CanvasRenderingContext2D,
        gridCellSize: number,
        color: string
      ) => {
        context.save()
        context.beginPath()
        context.lineWidth = 1
        context.strokeStyle = color

        // +0.5 to align with ruler
        for (let lx = 0.5; lx <= canvasWidth; lx += gridCellSize) {
          context.moveTo(lx, 0)
          context.lineTo(lx, canvasHeight)
        }

        context.stroke()
        context.closePath()
        context.restore()
      }

      showedKeys.forEach((key, i) => {
        drawKeyRectangle(
          myContext,
          midiEditorDimensions.keyHeight * i,
          KeyUtils.isKeyBlack(key)
            ? getBlackKeyRectangleColor(theme)
            : getWhiteKeyRectangleColor(theme)
        )
      })

      // draw ruler grid lines for quarter notes and measures
      drawRulerGridLines(
        myContext,
        midiEditorDimensions.beatWidth * 4,
        subBarBorderColor
      )
      drawRulerGridLines(
        myContext,
        midiEditorDimensions.barWidth,
        parentBarBorderColor
      )
    }

    draw(context, theme)

    const handleOnClick = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect()
      onClick(e, rect)
    }

    const handleOnDoubleClick = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect()
      onDoubleClick(e, rect)
    }

    canvas.addEventListener('dblclick', handleOnDoubleClick)
    canvas.addEventListener('click', handleOnClick)

    return () => {
      canvas?.removeEventListener('dblclick', handleOnDoubleClick)
      canvas?.removeEventListener('click', handleOnClick)
    }
  }, [
    canvasHeight,
    canvasWidth,
    midiEditorDimensions.barWidth,
    midiEditorDimensions.beatWidth,
    midiEditorDimensions.keyHeight,
    onClick,
    onDoubleClick,
    showedKeys,
    theme,
  ])

  return (
    <canvas
      className={`${cursorStyle === 'add' ? 'cursor-cell' : 'cursor-default'}`}
      onDragOver={(e) => e.preventDefault()}
      onDrop={(e) => onDrop(e)}
      style={{
        width: canvasWidth,
        height: canvasHeight,
        paddingTop: midiEditorDimensions.barHeaderHeight,
      }}
      ref={canvasRef}
    />
  )
}
