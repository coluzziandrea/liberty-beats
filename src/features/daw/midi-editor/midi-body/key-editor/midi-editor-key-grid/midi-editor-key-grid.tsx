import { useEffect, useRef } from 'react'
import { Key, isKeyBlack } from '../../../../../../model/note/note'

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

  const rectangleWidth = maxBars * 80
  const rectangleHeight = whiteKeySize * 0.585

  const blackKeyRectangleColor = '#18181b'
  const whiteKeyRectangleColor = '#27272A'

  const parentBarBorderColor = '#94A3B8'
  const subBarBorderColor = '#64748B'

  useEffect(() => {
    if (!canvasRef.current) return

    const canvas = canvasRef.current
    canvas.width = canvas.clientWidth
    canvas.height = canvas.clientHeight
    const context = canvas.getContext('2d')

    if (!context) return

    // draw rectangle with background
    const drawFillRect = (info, color: string) => {
      const { x, y, w, h } = info
      const backgroundColor = color

      context.beginPath()
      context.fillStyle = backgroundColor
      context.fillRect(x, y, rectangleWidth, h)
    }

    const drawGrid = (
      x,
      y,
      width,
      height,
      gridCellSize,
      color,
      lineWidth = 1
    ) => {
      context.save()
      context.beginPath()
      context.lineWidth = lineWidth
      context.strokeStyle = color

      for (let lx = x; lx <= x + width; lx += gridCellSize) {
        context.moveTo(lx + 0.5, y)
        context.lineTo(lx + 0.5, y + height)
      }

      context.stroke()
      context.closePath()
      context.restore()
    }

    showedKeys.forEach((key, i) => {
      const rInfo = {
        x: 0,
        y: rectangleHeight * i,
        w: rectangleWidth,
        h: rectangleHeight,
      }
      drawFillRect(
        rInfo,
        isKeyBlack(key) ? blackKeyRectangleColor : whiteKeyRectangleColor
      )
    })

    drawGrid(
      0,
      0,
      rectangleWidth,
      rectangleHeight * showedKeys.length,
      20,
      subBarBorderColor
    )

    drawGrid(
      0,
      0,
      rectangleWidth,
      rectangleHeight * showedKeys.length,
      80,
      parentBarBorderColor
    )
  }, [rectangleHeight, rectangleWidth, showedKeys])

  return (
    <canvas
      style={{
        width: rectangleWidth,
        height: rectangleHeight * showedKeys.length,
      }}
      ref={canvasRef}
    />
  )
}
