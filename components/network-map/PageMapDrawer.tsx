'use client'

import { useLayoutEffect, type ReactNode } from 'react'
import { useMapSidebar } from '@/components/network-map/map-sidebar-context'

export interface PageMapDrawerProps {
  children: ReactNode
}

/**
 * Registers this route as a “map page”: enables the global right sidebar.
 * Panel switch lives in `PageHeader` via `actions={<MapRightPanelSwitch />}`.
 */
export default function PageMapDrawer({ children }: PageMapDrawerProps) {
  const { enable, disable } = useMapSidebar()

  useLayoutEffect(() => {
    enable()
    return () => {
      disable()
    }
  }, [enable, disable])

  return <>{children}</>
}
