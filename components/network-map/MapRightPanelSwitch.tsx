'use client'

import {
  useMapSidebar,
  type MapRightPanel,
} from '@/components/network-map/map-sidebar-context'

const OPTIONS: { value: MapRightPanel; label: string }[] = [
  { value: 'off', label: 'Off' },
  { value: 'network', label: 'Network' },
  { value: 'similarity', label: 'Similarity' },
]

/** Segmented control for the global right taskpane (sourcing pages only). */
export default function MapRightPanelSwitch() {
  const { active, panel, setPanel } = useMapSidebar()

  if (!active) {
    return null
  }

  return (
    <div
      className="map-right-panel-switch"
      role="radiogroup"
      aria-label="Right panel"
    >
      {OPTIONS.map(({ value, label }) => {
        const selected = panel === value
        return (
          <button
            key={value}
            type="button"
            role="radio"
            aria-checked={selected ? 'true' : 'false'}
            className={`map-right-panel-switch__btn${selected ? ' map-right-panel-switch__btn--selected' : ''}`}
            onClick={() => {
              setPanel(value)
            }}
          >
            {label}
          </button>
        )
      })}
    </div>
  )
}
