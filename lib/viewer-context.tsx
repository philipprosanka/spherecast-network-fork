'use client'

import { createContext, useContext, type ReactNode } from 'react'

export type ViewerRole = 'customer' | 'spherecast'

export interface Viewer {
  role: ViewerRole
  orgName: string
  userName: string
  initials: string
}

/** Single app identity shown in the shell (no role switching in UI). */
const APP_VIEWER: Viewer = {
  role: 'spherecast',
  orgName: 'Spherecast',
  userName: 'Admin',
  initials: 'SP',
}

interface ViewerContextValue {
  viewer: Viewer
}

const ViewerContext = createContext<ViewerContextValue | null>(null)

export function ViewerProvider({ children }: { children: ReactNode }) {
  return (
    <ViewerContext.Provider value={{ viewer: APP_VIEWER }}>
      {children}
    </ViewerContext.Provider>
  )
}

export function useViewer() {
  const ctx = useContext(ViewerContext)
  if (!ctx) throw new Error('useViewer must be used within ViewerProvider')
  return ctx
}
