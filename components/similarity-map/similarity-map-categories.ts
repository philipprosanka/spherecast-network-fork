export type IngredientCategory =
  | 'vitamins'
  | 'minerals'
  | 'proteins'
  | 'oils'
  | 'excipients'
  | 'carbohydrates'
  | 'botanicals'

export const CATEGORY_ORDER: readonly IngredientCategory[] = [
  'vitamins',
  'minerals',
  'proteins',
  'oils',
  'excipients',
  'carbohydrates',
  'botanicals',
] as const

export const CATEGORY_LABEL: Record<IngredientCategory, string> = {
  vitamins: 'Vitamins',
  minerals: 'Minerals',
  proteins: 'Proteins',
  oils: 'Oils',
  excipients: 'Excipients',
  carbohydrates: 'Carbohydrates',
  botanicals: 'Botanicals',
}
