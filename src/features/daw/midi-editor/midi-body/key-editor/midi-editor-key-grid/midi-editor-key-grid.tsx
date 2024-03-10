import { useEffect, useRef } from 'react'
import { Key, isKeyBlack } from '../../../../../../model/note/note'
import { useMidiEditorDimensions } from '../hooks/useMidiEditorDimensions'

export type MidiEditorKeyGridProps = {
  showedKeys: Readonly<Key[]>

  onKeyDoubleClick: (key: Key, beat: number) => void
}

export const MidiEditorKeyGrid = ({
  showedKeys,
  onKeyDoubleClick,
}: MidiEditorKeyGridProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  const midiEditorDimensions = useMidiEditorDimensions()

  const canvasWidth =
    midiEditorDimensions.maxBars * midiEditorDimensions.barWidth
  const canvasHeight = midiEditorDimensions.keyHeight * showedKeys.length

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
      context.fillRect(0, y, canvasWidth, midiEditorDimensions.keyHeight)
    }

    const drawRulerGridLines = (gridCellSize: number, color: string) => {
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
        midiEditorDimensions.keyHeight * i,
        isKeyBlack(key) ? blackKeyRectangleColor : whiteKeyRectangleColor
      )
    })

    const onDoubleClick = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect()
      const gridDoubleClickX = e.clientX - rect.left
      const gridDoubleClickY =
        e.clientY - rect.top - midiEditorDimensions.barHeaderHeight

      const keyIndex = Math.floor(
        gridDoubleClickY / midiEditorDimensions.keyHeight
      )
      const bar = Math.floor(gridDoubleClickX / midiEditorDimensions.beatWidth)
      onKeyDoubleClick(showedKeys[keyIndex], bar)
    }

    canvas.addEventListener('dblclick', onDoubleClick)

    drawRulerGridLines(midiEditorDimensions.beatWidth, subBarBorderColor)
    drawRulerGridLines(midiEditorDimensions.barWidth, parentBarBorderColor)

    return () => {
      canvas.removeEventListener('dblclick', onDoubleClick)
    }
  }, [
    canvasWidth,
    showedKeys,
    canvasHeight,
    onKeyDoubleClick,
    midiEditorDimensions,
  ])

  return (
    <canvas
      style={{
        width: canvasWidth,
        height: canvasHeight,
        paddingTop: midiEditorDimensions.barHeaderHeight,
      }}
      ref={canvasRef}
    />
  )
}
