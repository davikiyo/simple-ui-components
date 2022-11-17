export const ICON_NAMES = [
  'arrow-left',
  'checkbox-checked',
  'checkbox-unchecked',
  'chevron-circle-left',
  'chevron-circle-right',
  'close',
  'plus-circle',
  'sorting-arrow-up',
  'star-filled',
  'star-outlined',
  'trash-can',
] as const

export type IconName = typeof ICON_NAMES[number]
