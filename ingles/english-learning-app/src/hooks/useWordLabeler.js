import { useCallback, useEffect, useMemo, useRef, useState } from 'react'

export default function useWordLabeler(labels) {
  const [draggedId, setDraggedId] = useState(null)
  const [placements, setPlacements] = useState({})
  const [wrongFlash, setWrongFlash] = useState(null)
  const [overZone, setOverZone] = useState(null)
  const wrongFlashTimeoutRef = useRef(null)

  const totalPlaced = Object.keys(placements).length
  const isComplete = totalPlaced === labels.length

  const unplacedLabels = useMemo(
    () => labels.filter((label) => !placements[label.id]),
    [labels, placements],
  )

  const handleDragStart = useCallback((id) => {
    setDraggedId(id)
  }, [])

  const handleDragEnd = useCallback(() => {
    setDraggedId(null)
    setOverZone(null)
  }, [])

  const handleDrop = useCallback((zoneId) => {
    setOverZone(null)
    if (!draggedId) return

    if (draggedId === zoneId) {
      setPlacements((prev) => ({ ...prev, [zoneId]: true }))
    } else {
      setWrongFlash(zoneId)
      if (wrongFlashTimeoutRef.current) {
        clearTimeout(wrongFlashTimeoutRef.current)
      }
      wrongFlashTimeoutRef.current = setTimeout(() => setWrongFlash(null), 600)
    }

    setDraggedId(null)
  }, [draggedId])

  const handleReset = useCallback(() => {
    if (wrongFlashTimeoutRef.current) {
      clearTimeout(wrongFlashTimeoutRef.current)
      wrongFlashTimeoutRef.current = null
    }
    setPlacements({})
    setDraggedId(null)
    setWrongFlash(null)
    setOverZone(null)
  }, [])

  useEffect(() => () => {
    if (wrongFlashTimeoutRef.current) {
      clearTimeout(wrongFlashTimeoutRef.current)
    }
  }, [])

  return {
    draggedId,
    placements,
    wrongFlash,
    overZone,
    totalPlaced,
    isComplete,
    unplacedLabels,
    setOverZone,
    handleDragStart,
    handleDragEnd,
    handleDrop,
    handleReset,
  }
}
