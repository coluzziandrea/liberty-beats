import { useEffect, useRef } from 'react'
import { Key, isKeyBlack } from '../../../../../../model/note/note'
import { RULER_BAR_WIDTH } from '../../../../common/components/ruler/constants'
import { PIANO_ROLL_BAR_HEADER_HEIGHT } from '../../../constants'

export type MidiEditorKeyGridProps = {
  showedKeys: Readonly<Key[]>
  maxBars: number
  whiteKeySize: number

  onKeyDoubleClick: (key: Key, beat: number) => void
}

export const MidiEditorKeyGrid = ({
  maxBars,
  showedKeys,
  whiteKeySize,
  onKeyDoubleClick,
}: MidiEditorKeyGridProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  const keyRectangleHeight = whiteKeySize * 0.585
  const canvasWidth = maxBars * RULER_BAR_WIDTH
  const canvasHeight = keyRectangleHeight * showedKeys.length
  const beatWidth = RULER_BAR_WIDTH / 4

  const blackKeyRectangleColor = '#18181b' // tailwind zinc-900
  const whiteKeyRectangleColor = '#27272A' // tailwind zinc-800

  const parentBarBorderColor = '#94A3B8' // tailwind slate-500
  const subBarBorderColor = '#64748B' // tailwind slate-400

  useEffect(() => {
    if (!canvasRef.current) return

    const canvas = canvasRef.current
    canvas.width = canvas.clientWidth
    canvas.height = canvas.clientHeight
    const context = canvas.getContext('2d')

    if (!context) return

    const drawKeyRectangle = (y: number, color: string) => {
      context.beginPath()
      context.fillStyle = color
      context.fillRect(0, y, canvasWidth, keyRectangleHeight)
    }

    const drawRulerGridLines = (gridCellSize: number, color: string) => {
      context.save()
      context.beginPath()
      context.lineWidth = 1
      context.strokeStyle = color

      for (let lx = 0; lx <= canvasWidth; lx += gridCellSize) {
        context.moveTo(lx + 0.5, 0) // +0.5 to align with ruler
        context.lineTo(lx + 0.5, canvasHeight)
      }

      context.stroke()
      context.closePath()
      context.restore()
    }

    showedKeys.forEach((key, i) => {
      drawKeyRectangle(
        keyRectangleHeight * i,
        isKeyBlack(key) ? blackKeyRectangleColor : whiteKeyRectangleColor
      )
    })

    const onDoubleClick = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect()
      const gridDoubleClickX = e.clientX - rect.left
      const gridDoubleClickY = e.clientY - rect.top

      const keyIndex = Math.floor(gridDoubleClickY / keyRectangleHeight)
      const bar = Math.floor(gridDoubleClickX / beatWidth)
      onKeyDoubleClick(showedKeys[keyIndex], bar)
    }

    canvas.addEventListener('dblclick', onDoubleClick)

    drawRulerGridLines(beatWidth, subBarBorderColor)
    drawRulerGridLines(RULER_BAR_WIDTH, parentBarBorderColor)

    return () => {
      canvas.removeEventListener('dblclick', onDoubleClick)
    }
  }, [
    keyRectangleHeight,
    canvasWidth,
    showedKeys,
    canvasHeight,
    onKeyDoubleClick,
    beatWidth,
  ])

  return (
    <canvas
      style={{
        width: canvasWidth,
        height: canvasHeight,
        paddingTop: PIANO_ROLL_BAR_HEADER_HEIGHT,
      }}
      ref={canvasRef}
    />
  )
}
