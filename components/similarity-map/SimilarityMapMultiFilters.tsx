'use client'

import { useMemo } from 'react'
import { Check, ChevronDown } from 'lucide-react'
import { DropdownMenu } from 'radix-ui'
import type { SimilarityPoint } from '@/app/api/similarity-map/route'
import {
  CATEGORY_LABEL,
  CATEGORY_ORDER,
  type IngredientCategory,
} from '@/components/similarity-map/similarity-map-categories'

function summaryList(
  labels: string[],
  emptyLabel: string,
  maxLen = 28
): string {
  if (labels.length === 0) return emptyLabel
  const joined = labels.join(', ')
  if (joined.length <= maxLen) return joined
  return `${joined.slice(0, maxLen - 1)}…`
}

function MultiDropdown({
  label,
  summary,
  children,
}: {
  label: string
  summary: string
  children: React.ReactNode
}) {
  return (
    <div className="similarity-map-multi-filter">
      <span className="similarity-map-multi-filter-label">{label}</span>
      <DropdownMenu.Root modal={false}>
        <DropdownMenu.Trigger
          type="button"
          className="app-top-nav-select-trigger similarity-map-multi-filter-trigger"
          aria-label={label}
        >
          <span className="similarity-map-multi-filter-trigger-text">
            {summary}
          </span>
          <ChevronDown
            size={14}
            className="app-top-nav-select-chevron"
            aria-hidden
          />
        </DropdownMenu.Trigger>
        <DropdownMenu.Portal>
          <DropdownMenu.Content
            className="app-top-nav-select-content similarity-map-multi-filter-content"
            sideOffset={4}
            align="end"
          >
            {children}
          </DropdownMenu.Content>
        </DropdownMenu.Portal>
      </DropdownMenu.Root>
    </div>
  )
}

type Props = {
  points: readonly SimilarityPoint[]
  selectedCategories: readonly IngredientCategory[]
  selectedSuppliers: readonly string[]
  onCategoriesChange: (next: readonly IngredientCategory[]) => void
  onSuppliersChange: (next: readonly string[]) => void
}

export default function SimilarityMapMultiFilters({
  points,
  selectedCategories,
  selectedSuppliers,
  onCategoriesChange,
  onSuppliersChange,
}: Props) {
  const supplierNames = useMemo(() => {
    const s = new Set<string>()
    for (const p of points) {
      if (p.supplierName.trim() !== '') s.add(p.supplierName)
    }
    return Array.from(s).sort((a, b) => a.localeCompare(b))
  }, [points])

  const categorySummary = useMemo(() => {
    const labels = selectedCategories.map((c) => CATEGORY_LABEL[c])
    return summaryList(labels, 'All categories')
  }, [selectedCategories])

  const supplierSummary = useMemo(() => {
    return summaryList([...selectedSuppliers], 'All suppliers')
  }, [selectedSuppliers])

  const toggleCategory = (cat: IngredientCategory, checked: boolean) => {
    const set = new Set(selectedCategories)
    if (checked) set.add(cat)
    else set.delete(cat)
    onCategoriesChange(Array.from(set))
  }

  const toggleSupplier = (name: string, checked: boolean) => {
    const set = new Set(selectedSuppliers)
    if (checked) set.add(name)
    else set.delete(name)
    onSuppliersChange(Array.from(set))
  }

  return (
    <div
      className="similarity-map-multi-filters"
      role="toolbar"
      aria-label="Map filters"
    >
      <MultiDropdown label="Category" summary={categorySummary}>
        <DropdownMenu.Label className="similarity-map-multi-filter-menu-label">
          Categories
        </DropdownMenu.Label>
        {CATEGORY_ORDER.map((cat) => (
          <DropdownMenu.CheckboxItem
            key={cat}
            className="app-top-nav-select-item similarity-map-multi-filter-item"
            checked={selectedCategories.includes(cat)}
            onCheckedChange={(c) => toggleCategory(cat, c === true)}
            onSelect={(e) => e.preventDefault()}
          >
            <span className="similarity-map-multi-filter-item-text">
              {CATEGORY_LABEL[cat]}
            </span>
            <DropdownMenu.ItemIndicator className="app-top-nav-select-check">
              <Check size={14} aria-hidden />
            </DropdownMenu.ItemIndicator>
          </DropdownMenu.CheckboxItem>
        ))}
        <DropdownMenu.Separator className="similarity-map-multi-filter-sep" />
        <DropdownMenu.Item
          className="app-top-nav-select-item similarity-map-multi-filter-clear"
          onSelect={(e) => {
            e.preventDefault()
            onCategoriesChange([])
          }}
        >
          Clear category filter
        </DropdownMenu.Item>
      </MultiDropdown>

      <MultiDropdown label="Supplier" summary={supplierSummary}>
        <DropdownMenu.Label className="similarity-map-multi-filter-menu-label">
          Suppliers
        </DropdownMenu.Label>
        <div className="similarity-map-multi-filter-scroll">
          {supplierNames.map((name) => (
            <DropdownMenu.CheckboxItem
              key={name}
              className="app-top-nav-select-item similarity-map-multi-filter-item"
              checked={selectedSuppliers.includes(name)}
              onCheckedChange={(c) => toggleSupplier(name, c === true)}
              onSelect={(e) => e.preventDefault()}
            >
              <span className="similarity-map-multi-filter-item-text">
                {name}
              </span>
              <DropdownMenu.ItemIndicator className="app-top-nav-select-check">
                <Check size={14} aria-hidden />
              </DropdownMenu.ItemIndicator>
            </DropdownMenu.CheckboxItem>
          ))}
        </div>
        <DropdownMenu.Separator className="similarity-map-multi-filter-sep" />
        <DropdownMenu.Item
          className="app-top-nav-select-item similarity-map-multi-filter-clear"
          onSelect={(e) => {
            e.preventDefault()
            onSuppliersChange([])
          }}
        >
          Clear supplier filter
        </DropdownMenu.Item>
      </MultiDropdown>
    </div>
  )
}
