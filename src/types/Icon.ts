export const ICON_NAMES = [
  'chevron-circle-left',
  'chevron-circle-right',
  'sorting-arrow-up',
  'checkbox-checked',
  'checkbox-unchecked',
  'star-filled',
  'star-outlined',
] as const

export type IconName = typeof ICON_NAMES[number]
