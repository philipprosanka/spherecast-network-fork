'use client'

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import {
  clampMapSidebarWidthPx,
  readMapSidebarWidthPx,
  writeMapSidebarWidthPx,
  MAP_SIDEBAR_DEFAULT_PX,
} from '@/lib/map-sidebar-width'

export type MapRightPanel = 'off' | 'network' | 'similarity'

export type MapSidebarContextValue = {
  /** A sourcing page registered the map scope */
  active: boolean
  /** Which view occupies the right taskpane when not `off` */
  panel: MapRightPanel
  /** `true` when `panel` is `network` or `similarity` */
  isPanelOpen: boolean
  sidebarWidthPx: number
  /** When `persist` is false (e.g. while dragging), width updates only in memory. */
  setSidebarWidthPx: (width: number, persist?: boolean) => void
  enable: () => void
  disable: () => void
  setPanel: (panel: MapRightPanel) => void
}

const MapSidebarContext = createContext<MapSidebarContextValue | null>(null)

export function MapSidebarProvider({ children }: { children: ReactNode }) {
  const [active, setActive] = useState(false)
  const [panel, setPanelState] = useState<MapRightPanel>('off')
  const [sidebarWidthPx, setSidebarWidthPxState] = useState(
    MAP_SIDEBAR_DEFAULT_PX
  )

  useEffect(() => {
    const id = window.requestAnimationFrame(() => {
      setSidebarWidthPxState(readMapSidebarWidthPx())
    })
    return () => window.cancelAnimationFrame(id)
  }, [])

  const enable = useCallback(() => {
    setActive(true)
  }, [])

  const disable = useCallback(() => {
    setActive(false)
    setPanelState('off')
  }, [])

  const setPanel = useCallback((next: MapRightPanel) => {
    setPanelState(next)
  }, [])

  const setSidebarWidthPx = useCallback(
    (width: number, persist: boolean = true) => {
      const next = clampMapSidebarWidthPx(width)
      setSidebarWidthPxState(next)
      if (persist) {
        writeMapSidebarWidthPx(next)
      }
    },
    []
  )

  const isPanelOpen = panel !== 'off'

  const value = useMemo<MapSidebarContextValue>(
    () => ({
      active,
      panel,
      isPanelOpen,
      sidebarWidthPx,
      setSidebarWidthPx,
      enable,
      disable,
      setPanel,
    }),
    [
      active,
      panel,
      isPanelOpen,
      sidebarWidthPx,
      setSidebarWidthPx,
      enable,
      disable,
      setPanel,
    ]
  )

  return (
    <MapSidebarContext.Provider value={value}>
      {children}
    </MapSidebarContext.Provider>
  )
}

export function useMapSidebar(): MapSidebarContextValue {
  const ctx = useContext(MapSidebarContext)
  if (!ctx) {
    throw new Error('useMapSidebar must be used within MapSidebarProvider')
  }
  return ctx
}
