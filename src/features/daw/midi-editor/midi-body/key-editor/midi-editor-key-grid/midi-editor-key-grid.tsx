import { useEffect, useRef } from 'react'
import { Key, isKeyBlack } from '../../../../../../model/note/note'
import { RULER_BAR_WIDTH } from '../../../../common/components/ruler/constants'

export type MidiEditorKeyGridProps = {
  showedKeys: Readonly<Key[]>
  maxBars: number
  whiteKeySize: number
}

export const MidiEditorKeyGrid = ({
  maxBars,
  showedKeys,
  whiteKeySize,
}: MidiEditorKeyGridProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  const keyRectangleHeight = whiteKeySize * 0.585
  const canvasWidth = maxBars * RULER_BAR_WIDTH
  const canvasHeight = keyRectangleHeight * showedKeys.length

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

    drawRulerGridLines(RULER_BAR_WIDTH / 4, subBarBorderColor)
    drawRulerGridLines(RULER_BAR_WIDTH, parentBarBorderColor)
  }, [keyRectangleHeight, canvasWidth, showedKeys, canvasHeight])

  return (
    <canvas
      style={{
        width: canvasWidth,
        height: canvasHeight,
      }}
      ref={canvasRef}
    />
  )
}
